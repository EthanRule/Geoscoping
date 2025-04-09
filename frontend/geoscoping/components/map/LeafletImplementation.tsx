import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { LatLngBoundsLiteral } from "leaflet";

export default function LeafletImplementation() {
  // Define the maximum bounds for the map with proper typing
  const worldBounds: LatLngBoundsLiteral = [
    [-85.06, -180], // Southwest corner
    [85.06, 180], // Northeast corner
  ];

  return (
    <div>
      <div style={{ height: "500px", width: "100%" }} className="relative">
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          minZoom={2}
          scrollWheelZoom={true}
          maxBounds={worldBounds}
          maxBoundsViscosity={1.0}
          worldCopyJump={false}
          style={{
            height: "100%",
            width: "100%",
            borderRadius: "0.5rem",
            zIndex: 10,
          }}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
        </MapContainer>
      </div>
    </div>
  );
}
