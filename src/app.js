import { invoke } from '@tauri-apps/api/tauri';
import { SVG } from '@svgdotjs/svg.js';

// Initialize 2D SVG map
const draw = SVG().addTo('#map-2d').size('100%', '100%');
const tooltip = document.getElementById('tooltip');
async function renderWarehouse() {
    try {
        const warehouse = await invoke('get_warehouse');
        draw.clear();
        warehouse.aisles.forEach((aisle, i) => {
            const y = 50 + i * 150;
            draw.text(`Aisle ${aisle.id}`).move(20, y - 20).fill('#fff');
            aisle.bins.forEach((bin, j) => {
                const x = 50 + j * 60;
                const rect = draw.rect(50, 50).fill(bin.item ? '#00aaff' : '#444').move(x, y);
                rect.mouseover((e) => {
                    rect.fill(bin.item ? '#00ccff' : '#666');
                    tooltip.innerHTML = bin.item
                        ? `${bin.item.name}: ${bin.item.quantity}`
                        : `Aisle ${aisle.id}, Bin ${bin.id}: Empty`;
                    tooltip.style.left = `${e.clientX + 10}px`;
                    tooltip.style.top = `${e.clientY + 10}px`;
                    tooltip.classList.remove('hidden');
                }).mouseout(() => {
                    rect.fill(bin.item ? '#00aaff' : '#444');
                    tooltip.classList.add('hidden');
                });
                rect.click(() => {
                    const msg = bin.item
                        ? `Aisle ${aisle.id}, Bin ${bin.id}: ${bin.item.quantity} ${bin.item.name}`
                        : `Aisle ${aisle.id}, Bin ${bin.id}: Empty`;
                    alert(msg);
                }).attr({ 'data-location': `Aisle ${aisle.id}, Bin ${bin.id}` });
            });
        });
    } catch (error) {
        console.error('Failed to load warehouse:', error);
    }
}

// Initialize 3D warehouse stub
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ canvas: document.createElement('canvas') });
document.getElementById('map-3d').appendChild(renderer.domElement);
renderer.setSize(400, 400);

// Add aisles as boxes
const aisleGeometry = new THREE.BoxGeometry(2, 0.5, 0.5);
const aisleMaterial = new THREE.MeshBasicMaterial({ color: 0xaaaaaa });
const aisles = [
    new THREE.Mesh(aisleGeometry, aisleMaterial),
    new THREE.Mesh(aisleGeometry, aisleMaterial),
    new THREE.Mesh(aisleGeometry, aisleMaterial),
];
aisles.forEach((aisle, i) => {
    aisle.position.set(0, i * 1.5 - 1.5, 0);
    scene.add(aisle);
});

camera.position.z = 5;
function animate() {
    requestAnimationFrame(animate);
    aisles.forEach(aisle => {
        aisle.rotation.y += 0.01;
    });
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

// Populate inventory table
async function loadInventory() {
    try {
        const items = await invoke('get_inventory');
        const tbody = document.querySelector('#inventory-table tbody');
        tbody.innerHTML = '';
        items.forEach(item => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${item.name}</td>
                <td>${item.barcode}</td>
                <td>${item.quantity}</td>
                <td>-</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Failed to load inventory:', error);
    }
}

// Navigation stubs for user tiers
document.getElementById('dashboard').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Dashboard: View KPIs (Manager/Executive only)');
});
document.getElementById('inventory').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Inventory: Manage items (Associate+)');
});
document.getElementById('reports').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Reports: Generate analytics (Manager+)');
});
document.getElementById('settings').addEventListener('click', (e) => {
    e.preventDefault();
    alert('Settings: Configure warehouse (Executive only)');
});

renderWarehouse();
loadInventory();
