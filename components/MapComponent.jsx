"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";

import { useEffect, useRef } from "react";

const MapComponent = ({ lat, lng }) => {
  const mapRef = useRef(null);
  useEffect(() => {
    if (mapRef.current && !mapRef.current._leaflet_id) {
      // Fix marker icon
      delete L.Icon.Default.prototype._getIconUrl;
      L.Icon.Default.mergeOptions({
        iconRetinaUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
        iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
        shadowUrl:
          "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
      });
      const map = L.map("map", {
        zoomControl: false,
      }).setView([lat, lng], 19);

      L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      L.marker([lat, lng]).addTo(map).openPopup();
    }
  }, []);

  return (
    <div ref={mapRef} id="map" style={{ height: "500px", width: "100%" }}></div>
  );
};

export default MapComponent;
