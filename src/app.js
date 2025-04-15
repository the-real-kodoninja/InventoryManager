import { invoke } from '@tauri-apps/api/tauri';
import { SVG } from '@svgdotjs/svg.js';

// Mock warehouse layout (3 aisles, 5 bins each)
const warehouse = [
    { aisle: 1, bins: Array(5).fill(null).map((_, i) => ({ bin: i + 1, item: i === 2 ? { id: 1, name: "Widget A", barcode: "123456", quantity: 50, location: "Aisle 1, Bin 3" } : null })) },
    { aisle: 2, bins: Array(5).fill(null).map((_, i) => ({ bin: i + 1, item: i === 4 ? { id: 2, name: "Widget B", barcode: "789012", quantity: 20, location: "Aisle 2, Bin 5" } : null })) },
    { aisle: 3, bins: Array(5).fill(null).map((_, i) => ({ bin: i + 1, item: i === 0 ? { id: 3, name: "Widget C", barcode: "345678", quantity: 30, location: "Aisle 3, Bin 1" } : null })) },
];

// Initialize 2D SVG map
const draw = SVG().addTo('#map-2d').size('100%', '100%');
warehouse.forEach((aisle, i) => {
    const y = 50 + i * 150;
    draw.text(`Aisle ${aisle.aisle}`).move(20, y - 20).fill('#fff');
    aisle.bins.forEach((bin, j) => {
        const x = 50 + j * 60;
        const rect = draw.rect(50, 50).fill(bin.item ? '#00aaff' : '#444').move(x, y);
        rect.click(() => {
            const msg = bin.item
                ? `${bin.item.location}: ${bin.item.quantity} ${bin.item.name}`
                : `Aisle ${aisle.aisle}, Bin ${bin.bin}: Empty`;
            alert(msg);
        }).attr({ 'data-location': `Aisle ${aisle.aisle}, Bin ${bin.bin}` });
    });
});

// Initialize 3D placeholder
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.createElement('canvas') });
document.getElementById('map-3d').appendChild(renderer.domElement);
renderer.setSize(400, 400);
const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);
camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scene, camera);
}
animate();

// Toggle 2D/3D view
document.getElementById('toggle-view').addEventListener('click', () => {
    const map2d = document.getElementById('map-2d');
    const map3d = document.getElementById('map-3d');
    map2d.classList.toggle('hidden');
    map3d.classList.toggle('hidden');
});

// Fetch inventory from Rust
async function loadInventory() {
    try {
        const inventory = await invoke('get_inventory');
        const tbody = document.querySelector('#inventory-table tbody');
        tbody.innerHTML = '';
        inventory.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.barcode}</td>
                <td>${item.quantity}</td>
                <td>${item.location}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load inventory:', error);
    }
}

loadInventory();
