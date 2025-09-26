# Navigate College - Interactive Campus Map

Navigate College is a modern, interactive web application designed to help students and visitors navigate a college campus with ease. This particular implementation is tailored for the PSG College of Arts and Science, but it can be adapted for other campuses.

## ✨ Features

*   **Interactive Campus Map**: A smooth and responsive map of the PSG CAS campus, powered by Leaflet and OpenStreetMap.
*   **Real-time Routing**: Find the shortest path between two locations on campus.
*   **Your Location**: Use your current location as the starting point for navigation.
*   **Location Search**: Easily search for and select from a list of predefined locations within PSG CAS.
*   **Fly to Location**: Instantly move the map view to your current location.
*   **Modern UI**: A clean and intuitive user interface built with React, Tailwind CSS, and Material-UI.

## 🚀 Technologies Used

*   **Frontend**:
    *   [React](https://reactjs.org/)
    *   [Vite](https://vitejs.dev/)
    *   [Tailwind CSS](https://tailwindcss.com/)
    *   [Material-UI](https://mui.com/)
*   **Map & Routing**:
    *   [Leaflet](https://leafletjs.com/)
    *   [React-Leaflet](https://react-leaflet.js.org/)
    *   [OSRM (Open Source Routing Machine)](http://project-osrm.org/)
*   **Language**:
    *   JavaScript (ES6+)

## 📦 Getting Started

To get a local copy up and running, follow these simple steps.

### Prerequisites

*   Node.js and npm (or yarn) installed on your machine.

### Installation

1.  **Clone the repository:**
    ```sh
    git clone https://github.com/your-username/navigateCollege.git
    ```
2.  **Navigate to the project directory:**
    ```sh
    cd navigateCollege
    ```
3.  **Install NPM packages:**
    ```sh
    npm install
    ```

### Running the Application

1.  **Start the development server:**
    ```sh
    npm run dev
    ```
2.  **Open your browser** and navigate to `http://localhost:5173` (or the address shown in your terminal).

## USAGE

1.  **Select a starting location** from the "From" dropdown. You can also choose "Your location" to use your current geographical position within the campus.
2.  **Select a destination** within PSG CAS from the "To" dropdown.
3.  **Click the "Search" button** to see the route drawn on the map.
4.  **Click the "Current Location" button** to center the map on your current position.

## 🔧 Customization

This project is designed to be adaptable for any college campus. Here's how you can customize it for your own use:

1.  **Contribute to OpenStreetMap**:
    *   For the best routing results, your campus map data should be on [OpenStreetMap](https://www.openstreetmap.org/).
    *   You can use tools like [JOSM](https://josm.openstreetmap.de/) or the web-based iD editor to add or edit your campus buildings, pathways, and points of interest.

2.  **Update Location Coordinates**:
    *   The list of locations is hardcoded in the `src/pages/InputSideMenu.jsx` file.
    *   You will need to update the `LOCATIONS` object with the names and coordinates of the locations on your campus.

## 📂 Project Structure

```
/
├── public/
├── src/
│   ├── assets/
│   ├── pages/
│   │   ├── context/
│   │   │   └── LocRouteProvider.jsx
│   │   ├── hook/
│   │   │   └── UseLocRoute.jsx
│   │   ├── InputSideMenu.jsx
│   │   └── Map.jsx
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .gitignore
├── package.json
├── README.md
...
```

### Key Files

*   `src/main.jsx`: The entry point of the application.
*   `src/App.jsx`: The main component that lays out the application.
*   `src/pages/Map.jsx`: Renders the interactive map of the PSG CAS campus.
*   `src/pages/InputSideMenu.jsx`: The side menu for user input.
*   `src/pages/context/LocRouteProvider.jsx`: The context provider for managing application state.
*   `src/pages/hook/UseLocRoute.jsx`: A custom hook for accessing the location and route context.

---

Enjoy navigating your campus with ease! 🗺️