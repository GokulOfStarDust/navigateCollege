/*
 * mapcol
 * Copyright (C) 2025 The One From The Stardust
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import { use, useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import UseLocRoute from "./hook/UseLocRoute";


export default function Map() {
  const start = { lat: 11.033746, lng: 77.034188 };
  const {Route, userPosition, setMapInstance, startEndPos} = UseLocRoute();

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

  delete L.Icon.Default.prototype._getIconUrl;
  L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});



  return (
    <MapContainer 
    className="relative" center={start} zoom={30} style={{ height: "100vh", width: "100%" }}
    ref={setMapInstance}
    >
      <TileLayer
        url={`https://{s}.tile.openstreetmap.fr/osmfr/{z}/{x}/{y}.png`}
        attribution="&copy; OpenStreetMap contributors"
      />
      <Marker position={startEndPos.start} />
      <Marker position={startEndPos.end} />
      {userPosition && <Marker position={userPosition} icon={userLocationIcon} />}
      <Route start={startEndPos.start} end={startEndPos.end} />
    </MapContainer>
  );
}