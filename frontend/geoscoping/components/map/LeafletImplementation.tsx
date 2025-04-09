import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBoundsLiteral } from "leaflet";
import { useState } from "react";

export default function LeafletImplementation() {
  // Define the maximum bounds for the map with proper typing
  const worldBounds: LatLngBoundsLiteral = [
    [-85.06, -180], // Southwest corner
    [85.06, 180], // Northeast corner
  ];

  // Determine whether to use satellite or standard dark mode
  const [useSatellite, setUseSatellite] = useState(false);

  return (
    <div className="border-2 border-[#1C448E] rounded-lg overflow-hidden">
      <div className="absolute top-2 right-2 z-20">
        <button
          onClick={() => setUseSatellite(!useSatellite)}
          className="bg-[#1C448E] text-[#FEFFFE] px-2 py-1 rounded text-sm"
        >
          {useSatellite ? "Dark Mode" : "Satellite View"}
        </button>
      </div>
      <div style={{ height: "500px", width: "100%" }} className="relative">
        <MapContainer
          center={[20, 0]} // Centered view
          zoom={2} // More zoomed out (smaller number = more zoomed out)
          minZoom={1}
          scrollWheelZoom={true}
          maxBounds={worldBounds}
          maxBoundsViscosity={1.0}
          worldCopyJump={true}
          style={{
            height: "100%",
            width: "100%",
            zIndex: 10,
          }}
        >
          {/* Use either dark mode or satellite imagery based on state */}
          {useSatellite ? (
            // Satellite imagery
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
            />
          ) : (
            // Dark mode layer
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            />
          )}
        </MapContainer>
      </div>
    </div>
  );
}
