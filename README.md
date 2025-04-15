InventoryManager
================

InventoryManager is a robust, modular, and highly customizable inventory management software designed to streamline warehouse and storage operations for businesses of all sizes---from small-scale resale operations in storage units to large-scale, multi-location enterprises. Built with flexibility, security, and scalability in mind, InventoryManager addresses the chaos of traditional inventory tracking by combining intuitive interfaces, real-time data visualization, and advanced AI-driven analytics. It supports both desktop and mobile applications, ensuring secure access to inventory data without relying on web-based portals to mitigate security risks.

Table of Contents
-----------------

1.  Project Vision

2.  Features

    -   Core Inventory Management

    -   Visualization and Mapping

    -   User Access Tiers

    -   Analytics and Reporting

    -   Pallet and Location Management

    -   Small-Scale Business Support

    -   AI-Powered Optimization

    -   Security and Modularity

3.  Architecture

    -   Technology Stack

    -   Modularity and Scalability

4.  Installation

    -   Prerequisites

    -   Building from Source

    -   Running the Application

5.  Usage

    -   Desktop Application

    -   Mobile Application

    -   Creating a Warehouse Layout

    -   Managing Inventory

6.  Development

    -   Contributing

    -   Code Structure

    -   Testing

7.  Roadmap

8.  License

9.  Contact

Project Vision
--------------

InventoryManager was inspired by real-world challenges faced in warehouse inventory management, where disorganization, inaccurate counts, and lack of transparency led to inefficiencies. Drawing from hands-on experience in a warehouse environment and a passion for solving complex problems, the goal is to create the ultimate inventory management solution that:

-   Eliminates manual errors through automated tracking and logging.

-   Adapts to any storage setup, from a single storage unit to multi-building enterprises.

-   Empowers users with actionable insights via charts, graphs, and AI-driven recommendations.

-   Prioritizes security by avoiding web-based exposure of sensitive data like warehouse layouts.

-   Scales effortlessly with business growth, relocations, or expansions.

-   Supports small-scale entrepreneurs, such as those running resale businesses, with tailored features for bulk purchasing and online sales.

The software is designed to be minimal yet feature-rich, with a clean, sexy UI that balances simplicity and power. It aims to replace chaotic inventory systems with a transparent, efficient, and visually intuitive solution.

Features
--------

### Core Inventory Management

-   **Barcode Integration**: Leverages existing barcode systems for unique item tracking, supporting both in-house and outsourced inventory.

-   **Inventory Logging**: Tracks all changes (additions, removals, updates) with detailed logs for transparency, including timestamps, user IDs, and change reasons.

-   **Quantity and Location Tracking**: Records item quantities, precise locations (e.g., aisle, shelf, bin), and condition (sellable, damaged, reparable, non-reparable).

-   **Low Inventory Alerts**: Configurable thresholds trigger notifications for depleting stock.

-   **Merge Suggestions**: Identifies opportunities to consolidate inventory for space efficiency.

-   **Damaged Inventory Management**: Logs damaged items, categorizes them (reparable vs. non-reparable), and tracks resolution steps.

### Visualization and Mapping

-   **Interactive 2D SVG Warehouse Layout**:

    -   Customizable 2D vector maps generated from user-provided sketches or blueprints.

    -   Clickable sections display detailed information:

        -   Current products and quantities.

        -   Items stored behind or adjacent.

        -   Historical location data and quantities.

        -   Suggested inventory merges or relocations.

    -   Color-coded updates for new, modified, or vacated spaces.

    -   Exportable for printing or sharing with warehouse associates.

-   **Interactive 3D Warehouse Model**:

    -   Generates a 3D mockup of the warehouse based on the 2D sketch or manual input.

    -   Supports navigation via mouse/keyboard (desktop) or touch (mobile).

    -   Displays item locations, quantities, and conditions in 3D space.

    -   Highlights paths for picking or restocking with AI-optimized routes.

    -   Toggles between 2D and 3D views for flexibility.

    -   Exportable as OBJ or GLTF for external use (e.g., VR/AR integrations).

-   **Charting and Graphing**:

    -   Visualizes metrics like most-sold items, depleting stock, and inventory turnover.

    -   Supports bar charts, line graphs, pie charts, and heatmaps for data-driven decisions.

    -   Customizable dashboards for different user roles.

### User Access Tiers

InventoryManager implements a three-tier access system to ensure security and appropriate data visibility:

1.  **Associate**:

    -   View inventory details to locate products.

    -   Submit inventory logging suggestions (e.g., count discrepancies).

    -   Scan pallets to confirm locations after manager approval.

    -   Receive count discrepancy alerts.

2.  **Inventory Manager**:

    -   All Associate permissions.

    -   Perform inventory lookups with additional details (e.g., availability at other locations).

    -   Log inventory changes and approve associate suggestions.

    -   Generate and analyze reports.

3.  **Executive Manager**:

    -   Full control over all metrics, data, and configurations.

    -   Manage multiple locations and oversee cross-location inventory.

    -   Access advanced analytics and AI-driven insights.

    -   Configure user roles and permissions.

### Analytics and Reporting

-   **Real-Time Metrics**: Tracks inventory turnover, stock levels, and usage patterns.

-   **Historical Analysis**: Provides insights into past inventory movements and trends.

-   **Custom Reports**: Generate reports on demand (e.g., damaged items, low stock, top performers).

-   **Predictive Analytics**: Forecasts inventory needs based on historical data and sales patterns, powered by AI.

-   **Export Options**: Supports CSV, PDF, and Excel formats for reports and data sharing.

### Pallet and Location Management

-   **Physical Location Displays**:

    -   Rectangular displays for each pallet location with:

        -   Center: Pallet location name (e.g., Aisle 3, Bin 5).

        -   Top Right: Company logo (customizable).

        -   Bottom Left: QR code linking to location details in the mobile app (requires authentication).

        -   Bottom Right: Barcode for scanning.

    -   Printable templates for easy deployment.

-   **Staging and Relocation**:

    -   Tracks pallets in staging areas before final storage.

    -   Suggests optimal storage locations based on item type, size, and access frequency.

    -   Logs relocation history for auditing.

### Small-Scale Business Support

Tailored features for entrepreneurs running resale businesses (e.g., storage unit operations):

-   **Bulk Purchase Tracking**: Logs bulk item purchases, categorizes them, and assigns barcodes.

-   **Online Sales Integration**:

    -   Tracks items listed on platforms like eBay, Amazon, or Shopify.

    -   Updates inventory automatically when sales occur.

    -   Flags discrepancies between physical stock and online listings.

-   **Profitability Analysis**:

    -   Calculates profit margins per item or batch.

    -   Suggests pricing strategies based on market trends.

-   **Compact Layouts**:

    -   Generates 2D SVG and 3D models for small spaces like storage units.

    -   Optimizes storage for high-turnover items.

-   **Minimalist Mode**:

    -   Simplified UI for users managing smaller inventories.

    -   Focuses on essential features like stock tracking and sales logging.

### AI-Powered Optimization

-   **Nimbus.ai Integration**:

    -   Analyzes inventory data to recommend optimal storage configurations.

    -   Suggests moving high-demand items to easily accessible areas.

    -   Optimizes space usage based on item dimensions, turnover rates, and warehouse layout.

-   **Predictive Restocking**:

    -   Forecasts when to reorder based on sales velocity and lead times.

    -   Alerts users to avoid stockouts or overstocking.

-   **Anomaly Detection**:

    -   Identifies discrepancies (e.g., missing items, unexpected counts) and flags them for review.

    -   Suggests root causes based on log patterns.

-   **AI Implementation**:

    -   Powered by Python for advanced machine learning models (e.g., clustering, time-series forecasting).

    -   Seamlessly integrated with the Rust core via PyO3 for high performance.

### Security and Modularity

-   **Offline-First Design**:

    -   Runs locally on desktop and mobile devices to avoid exposing sensitive data online.

    -   Syncs data securely when connected to a central server (optional).

-   **End-to-End Encryption**:

    -   Protects inventory data, user credentials, and logs.

    -   Uses AES-256 for data at rest and TLS for data in transit.

-   **Modular Architecture**:

    -   Supports adding new warehouses, locations, or features without rebuilding.

    -   Adapts to expansions, relocations, or remodels via configuration updates.

    -   Extensible for third-party integrations (e.g., ERP systems, accounting software).

-   **Role-Based Authentication**:

    -   Ensures users only access data relevant to their role.

    -   Supports multi-factor authentication (MFA) for managers and executives.

Architecture
------------

### Technology Stack

-   **Backend**: Rust

    -   Chosen for performance, memory safety, and cross-platform compatibility.

    -   Handles inventory logic, barcode processing, and core operations.

-   **AI Module**: Python

    -   Powers AI-driven features like optimization, predictive analytics, and anomaly detection.

    -   Uses libraries like TensorFlow, scikit-learn, and Pandas for data processing.

    -   Integrated with Rust via PyO3 for seamless, high-performance execution.

-   **Frontend**:

    -   Desktop: Tauri (Rust + WebView) for lightweight, native-like apps.

    -   Mobile: Flutter for cross-platform iOS and Android support.

    -   2D SVG Rendering: Custom Rust library with WebView for interactive maps.

    -   3D Rendering: Rust with WebGL (via Tauri) and Flutter ThreeDart for mobile.

-   **Database**: SQLite (default) with PostgreSQL option

    -   SQLite for single-location setups and small businesses.

    -   PostgreSQL for multi-location enterprises with high data volumes.

-   **Barcode/QR Code Handling**: ZBar and QrCodeGen libraries

    -   Supports scanning via mobile cameras and external scanners.

-   **Charting**: Plotters (Rust) for server-side rendering, Chart.js for frontend

    -   Generates static charts for reports and dynamic dashboards.

### Modularity and Scalability

-   **Plugin System**:

    -   Allows adding new features (e.g., integrations, analytics modules) as plugins.

    -   Plugins can be enabled/disabled via configuration.

-   **Location-Agnostic Design**:

    -   Supports single storage units, warehouses, or multi-site enterprises.

    -   Dynamically adjusts UI and logic based on location count and complexity.

-   **Configuration Files**:

    -   YAML-based configs for warehouse layouts (2D and 3D), user roles, and settings.

    -   Enables rapid customization without code changes.

-   **Event-Driven Architecture**:

    -   Uses a message queue (e.g., Redis or in-memory) for logging and syncing.

    -   Ensures real-time updates across devices and locations.

-   **AI Modularity**:

    -   Python AI components can be updated or swapped without affecting the Rust core.

    -   Supports custom models or third-party AI services via configuration.

Installation
------------

### Prerequisites

-   **Rust**: Stable channel (v1.65+).

-   **Python**: v3.8+ (for AI module).

-   **Node.js**: v16+ (for Tauri frontend dependencies).

-   **Flutter**: v3+ (for mobile app).

-   **SQLite**: v3.35+ (default database).

-   **Optional**:

    -   PostgreSQL v14+ (for enterprise setups).

    -   Redis v6+ (for multi-location sync).

-   **Python Dependencies**:

    -   Install via requirements.txt (e.g., TensorFlow, scikit-learn, Pandas).

-   **OS Support**:

    -   Linux (Ubuntu 20.04+, Fedora 35+).

    -   Windows 10+.

    -   macOS 11+ (Big Sur or later).

### Building from Source

1.  Clone the repository:

    ```
    git clone https://github.com/the-real-kodoninja/InventoryManager.git
    cd InventoryManager
    ```

2.  Install Rust dependencies:

    ```
    cargo build --release
    ```

3.  Install Python dependencies:

    ```
    pip install -r backend/ai/requirements.txt
    ```

4.  Install frontend dependencies:

    ```
    cd frontend/tauri
    npm install
    ```

5.  Build the desktop app:

    ```
    cargo tauri build
    ```

6.  Build the mobile app:

    ```
    cd frontend/flutter
    flutter pub get
    flutter build apk  # Android
    flutter build ios  # iOS (requires macOS)
    ```

### Running the Application

-   **Desktop**:

    ```
    ./target/release/inventory-manager
    ```

-   **Mobile**:

    -   Install the APK (Android) or IPA (iOS) on your device.

    -   Ensure the device is on the same network as the server (if syncing is enabled).

Usage
-----

### Desktop Application

-   **Login**: Authenticate with your credentials (Associate, Manager, or Executive).

-   **Dashboard**:

    -   View the 2D SVG or 3D warehouse model (clickable/navigable for details).

    -   Access AI-driven charts and metrics (e.g., stock levels, sales trends, optimization suggestions).

    -   Manage inventory via list-style data tables.

-   **Inventory Management**:

    -   Add, update, or remove items.

    -   Scan barcodes to log counts or relocations.

    -   Review and approve associate suggestions.

-   **Reports**:

    -   Generate custom reports (e.g., low stock, damaged items).

    -   Export to CSV, PDF, or Excel.

### Mobile Application

-   **QR/Barcode Scanning**:

    -   Scan pallet QR codes to view location details.

    -   Scan item barcodes to update counts or log issues.

-   **Inventory Lookup**:

    -   Search for items by name, barcode, or location.

    -   View basic details (Associates) or advanced metrics (Managers).

-   **3D Navigation**:

    -   Explore a simplified 3D warehouse model with touch controls.

    -   Tap items for details or suggested actions.

-   **Notifications**:

    -   Receive alerts for low stock, discrepancies, or AI-driven tasks.

-   **Minimal Mode**:

    -   Toggle for small-scale users (e.g., storage unit resale).

### Creating a Warehouse Layout

1.  Sketch your warehouse/storage unit (hand-drawn or digital).

2.  Upload the sketch to InventoryManager (PNG, JPEG, or PDF).

3.  Use the built-in editor to:

    -   Trace the sketch into a 2D SVG map and generate a 3D model.

    -   Define clickable/navigable areas (e.g., aisles, shelves).

    -   Assign location names and metadata.

4.  Customize colors, labels, and interactivity for both 2D and 3D views.

5.  Save and deploy the layouts to all users.

### Managing Inventory

-   **Add Items**:

    -   Scan barcodes or manually enter details.

    -   Specify quantity, location, and condition.

-   **Update Counts**:

    -   Perform cycle counts via mobile app.

    -   Log discrepancies with notes and photos.

-   **Relocate Items**:

    -   Scan pallets to new locations.

    -   Update the 2D/3D layouts and logs automatically.

-   **Monitor Health**:

    -   Check dashboards for low stock, merges, or damage alerts.

    -   Review AI suggestions for optimization (e.g., move high-demand items).

Development
-----------

### Contributing

We welcome contributions! Please follow these steps:

1.  Fork the repository.

2.  Create a feature branch (git checkout -b feature/your-feature).

3.  Commit changes (git commit -m "Add your feature").

4.  Push to your branch (git push origin feature/your-feature).

5.  Open a pull request with detailed descriptions.

### Code Structure

```
InventoryManager/
├── backend/                # Core logic
│   ├── inventory/          # Inventory tracking and logging (Rust)
│   ├── analytics/          # Charting and metrics (Rust)
│   ├── ai/                 # AI-driven features (Python)
│   ├── viz/                # 2D/3D visualization (Rust)
│   └── db/                 # SQLite/PostgreSQL handlers (Rust)
├── frontend/               # UI components
│   ├── tauri/              # Desktop app (Rust + WebView)
│   └── flutter/            # Mobile app (Dart)
├── assets/                 # SVGs, 3D models, logos, templates
├── configs/                # YAML configs for layouts, roles
└── tests/                  # Unit and integration tests
```

### Testing

-   Run Rust unit tests:

    ```
    cargo test
    ```

-   Run Python AI tests:

    ```
    cd backend/ai
    pytest
    ```

-   Run integration tests:

    ```
    cargo test --features integration
    ```

-   Test mobile app:

    ```
    flutter test
    ```

Roadmap
-------

-   **Q2 2025**: Beta release with core features (inventory tracking, 2D SVG maps, user tiers).

-   **Q3 2025**: Add AI optimization (Python-powered), 3D models, and small-scale business mode.

-   **Q4 2025**: Support multi-location sync and advanced analytics.

-   **2026**: Integrate with third-party platforms (e.g., Shopify, QuickBooks).

-   **Long-Term**: Open-source select modules, explore cloud-hybrid mode and VR/AR support.

License
-------

InventoryManager is licensed under the MIT License. See LICENSE for details.

Contact
-------

-   **Author**: Kodoninja

-   **GitHub**: https://github.com/the-real-kodoninja

-   **Email**: contact@kodoverse.com

-   **Issues**: https://github.com/the-real-kodoninja/InventoryManager/issues

* * * * *

*InventoryManager: Transforming chaos into clarity, one barcode at a time.*
