#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use serde::{Deserialize, Serialize};
use tauri::State;
use std::sync::Mutex;

#[derive(Serialize, Deserialize, Clone)]
struct Item {
    id: u32,
    name: String,
    barcode: String,
    quantity: u32,
    location: String,
}

struct AppState {
    inventory: Mutex<Vec<Item>>,
}

#[tauri::command]
fn get_inventory(state: State<AppState>) -> Vec<Item> {
    state.inventory.lock().unwrap().clone()
}

fn main() {
    let initial_inventory = vec![
        Item {
            id: 1,
            name: "Widget A".to_string(),
            barcode: "123456".to_string(),
            quantity: 50,
            location: "Aisle 1, Bin 3".to_string(),
        },
        Item {
            id: 2,
            name: "Widget B".to_string(),
            barcode: "789012".to_string(),
            quantity: 20,
            location: "Aisle 2, Bin 5".to_string(),
        },
        Item {
            id: 3,
            name: "Widget C".to_string(),
            barcode: "345678".to_string(),
            quantity: 30,
            location: "Aisle 3, Bin 1".to_string(),
        },
    ];

    tauri::Builder::default()
        .manage(AppState {
            inventory: Mutex::new(initial_inventory),
        })
        .invoke_handler(tauri::generate_handler![get_inventory])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
