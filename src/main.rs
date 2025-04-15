#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::State;
use std::sync::Mutex;
use std::fs;
use yaml_rust2::{Yaml, YamlLoader};
use rusqlite::{params, Connection, Result};

#[derive(Serialize, Deserialize, Clone)]
struct Item {
    id: u32,
    name: String,
    barcode: String,
    quantity: u32,
}

#[derive(Serialize, Deserialize, Clone)]
struct Bin {
    id: u32,
    item: Option<Item>,
}

#[derive(Serialize, Deserialize, Clone)]
struct Aisle {
    id: u32,
    bins: Vec<Bin>,
}

#[derive(Serialize, Deserialize, Clone)]
struct Warehouse {
    aisles: Vec<Aisle>,
}

struct AppState {
    warehouse: Mutex<Warehouse>,
    db: Mutex<Connection>,
}

#[tauri::command]
fn get_warehouse(state: State<AppState>) -> Warehouse {
    state.warehouse.lock().unwrap().clone()
}

#[tauri::command]
fn get_inventory(state: State<AppState>) -> Vec<Item> {
    let db = state.db.lock().unwrap();
    let mut stmt = db.prepare("SELECT id, name, barcode, quantity FROM items").unwrap();
    let items = stmt.query_map([], |row| {
        Ok(Item {
            id: row.get(0)?,
            name: row.get(1)?,
            barcode: row.get(2)?,
            quantity: row.get(3)?,
        })
    }).unwrap().collect::<Result<Vec<Item>>>();
    items.unwrap()
}

fn init_db() -> Connection {
    let conn = Connection::open("inventory.db").expect("Failed to open SQLite database");
    conn.execute(
        "CREATE TABLE IF NOT EXISTS items (
            id INTEGER PRIMARY KEY,
            name TEXT NOT NULL,
            barcode TEXT NOT NULL,
            quantity INTEGER NOT NULL
        )",
        [],
    ).expect("Failed to create items table");

    // Seed initial data if empty
    let count: i64 = conn.query_row("SELECT COUNT(*) FROM items", [], |row| row.get(0)).unwrap();
    if count == 0 {
        conn.execute(
            "INSERT INTO items (id, name, barcode, quantity) VALUES (?1, ?2, ?3, ?4)",
            params![1, "Widget A", "123456", 50],
        ).unwrap();
        conn.execute(
            "INSERT INTO items (id, name, barcode, quantity) VALUES (?1, ?2, ?3, ?4)",
            params![2, "Widget B", "789012", 20],
        ).unwrap();
        conn.execute(
            "INSERT INTO items (id, name, barcode, quantity) VALUES (?1, ?2, ?3, ?4)",
            params![3, "Widget C", "345678", 30],
        ).unwrap();
    }

    conn
}

fn load_warehouse() -> Warehouse {
    let yaml_str = fs::read_to_string("src-tauri/configs/warehouse.yaml")
        .expect("Failed to read warehouse.yaml");
    let docs = YamlLoader::load_from_str(&yaml_str).expect("Failed to parse YAML");
    let yaml = &docs[0];

    let mut aisles = Vec::new();
    if let Yaml::Hash(warehouse) = yaml {
        if let Some(Yaml::Array(aisle_array)) = warehouse.get(&Yaml::String("aisles".to_string())) {
            for aisle_yaml in aisle_array {
                let mut bins = Vec::new();
                let aisle_id = aisle_yaml["id"].as_i64().unwrap() as u32;
                if let Some(Yaml::Array(bin_array)) = aisle_yaml.get(&Yaml::String("bins".to_string())) {
                    for bin_yaml in bin_array {
                        let bin_id = bin_yaml["id"].as_i64().unwrap() as u32;
                        let item = match &bin_yaml["item"] {
                            Yaml::Hash(item_hash) => Some(Item {
                                id: item_hash["id"].as_i64().unwrap() as u32,
                                name: item_hash["name"].as_str().unwrap().to_string(),
                                barcode: item_hash["barcode"].as_str().unwrap().to_string(),
                                quantity: item_hash["quantity"].as_i64().unwrap() as u32,
                            }),
                            Yaml::Null => None,
                            _ => panic!("Invalid item format"),
                        };
                        bins.push(Bin { id: bin_id, item });
                    }
                }
                aisles.push(Aisle { id: aisle_id, bins });
            }
        }
    }

    Warehouse { aisles }
}

fn main() {
    let warehouse = load_warehouse();
    let db = init_db();

    tauri::Builder::default()
        .manage(AppState {
            warehouse: Mutex::new(warehouse),
            db: Mutex::new(db),
        })
        .invoke_handler(tauri::generate_handler![get_warehouse, get_inventory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
