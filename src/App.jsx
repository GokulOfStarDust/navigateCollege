import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Polyline, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";

function Route({ start, end }) {
  const [route, setRoute] = useState(null);
  useEffect(() => {
    async function fetchRoute() {
      const url = `https://router.project-osrm.org/route/v1/driving/${start.lng},${start.lat};${end.lng},${end.lat}?overview=full&geometries=geojson`;

      const res = await fetch(url);
      const data = await res.json();

      if (data.routes.length > 0) {
        const coords = data.routes[0].geometry.coordinates.map(([lng, lat]) => [lat, lng]);
        setRoute(coords);
      }
    }
    fetchRoute();
  }, [start, end]);


  return route ? <Polyline positions={route} color="blue" /> : null;
}

export default function App() {
  const start = { lat: 11.033746, lng: 77.034188 };
  const end = { lat: 11.0324860, lng: 77.0329760 };
  const [userPosition, setUserPosition] = useState(null);

  const userLocationIcon = L.divIcon({
    html: `
      <div style="
        width: 16px;
        height: 16px;
        background: #4285f4;
        border: 3px solid white;
        border-radius: 50%;
        box-shadow: 0 0 10px rgba(66, 133, 244, 0.6);
      "></div>
    `,
    className: "", // remove default leaflet styles
    iconSize: [16, 16],
    iconAnchor: [8, 8], // center the dot
  });

  useEffect(()=>{
    if(!navigator.geolocation) alert("Geolocation not supported by browser!")

      const watchId = navigator.geolocation.watchPosition(
        (pos)=>{  
          setUserPosition([pos.coords.latitude, pos.coords.longitude]);
        },
        (err)=>{
          console.error(err)
        },
        {enableHighAccuracy: true}
      )
      return () => {
        navigator.geolocation.clearWatch(watchId);
      };
  },[])

  return (
    <MapContainer center={start} zoom={17} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={start} />
      <Marker position={end} />
      {userPosition && <Marker position={userPosition} icon={userLocationIcon} />}
      <Route start={start} end={end} />
    </MapContainer>
  );
}
