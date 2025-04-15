import { useState, useEffect } from "react";
import dynamic from "next/dynamic";

// Custom loading component with fade-out effect
const LoadingPlaceholder = ({ type }: { type: string }) => {
  const [showLoader, setShowLoader] = useState(true);
  const [opacity, setOpacity] = useState(1);

  useEffect(() => {
    // Simulate waiting 1 second after component is mounted
    const timer = setTimeout(() => {
      // Start fade out animation
      setOpacity(0);

      // Wait for fade animation to complete, then hide loader completely
      setTimeout(() => {
        setShowLoader(false);
      }, 1000);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (!showLoader) return null;

  return (
    <div
      className="border-2 border-gray-800/50 rounded-lg overflow-hidden flex items-center justify-center bg-[#050505] text-[#FEFFFE] transition-opacity duration-1000"
      style={{ height: "500px", width: "100%", opacity }}
    >
      <div className="text-center">
        <div className="animate-spin rounded-full h-20 w-20 border-t-2 border-b-2 border-[#9EA677] mx-auto mb-3"></div>
      </div>
    </div>
  );
};

// Dynamically import both implementations to ensure they're only loaded client-side
const LeafletImplementation = dynamic(() => import("./LeafletImplementation"), {
  ssr: false,
  loading: () => <LoadingPlaceholder type="map" />,
});

const GlobeImplementation = dynamic(() => import("./GlobeImplementation"), {
  ssr: false,
  loading: () => <LoadingPlaceholder type="globe" />,
});

export default function MapImplementation() {
  const [viewType, setViewType] = useState<"globe" | "map">("globe");

  // Add this style tag to override Leaflet's default background
  useEffect(() => {
    // Create a style element to set the dark background
    const styleEl = document.createElement("style");
    styleEl.textContent = `
      .leaflet-container {
        background-color: #050505 !important;
      }
    `;
    document.head.appendChild(styleEl);

    // Cleanup when component unmounts
    return () => {
      document.head.removeChild(styleEl);
    };
  }, []);

  return (
    <div className="flex flex-col">
      <div className="flex justify-end mb-2">
        <div className="inline-flex rounded-md shadow-sm gap-2" role="group">
          <button
            type="button"
            onClick={() => setViewType("globe")}
            className={`px-4 py-2 text-sm font-medium border rounded-lg ${
              viewType === "globe"
                ? "bg-gray-800/30 text-[#FEFFFE] border-[#9EA677]"
                : "bg-gray-800/30 text-[#FEFFFE] border-gray-800/30 hover:bg-[#9EA677] hover:text-[#FEFFFE] hover:opacity-80"
            }`}
          >
            3D Globe
          </button>
          <button
            type="button"
            onClick={() => setViewType("map")}
            className={`px-4 py-2 text-sm font-medium border rounded-lg ${
              viewType === "map"
                ? "bg-gray-800/30 text-[#FEFFFE] border-[#9EA677]"
                : "bg-gray-800/30 text-[#FEFFFE] border-gray-800/30 hover:bg-[#9EA677] hover:text-[#FEFFFE] hover:opacity-80"
            }`}
          >
            2D Map
          </button>
        </div>
      </div>

      <div className="flex-grow">
        {viewType === "map" ? (
          <LeafletImplementation />
        ) : (
          <GlobeImplementation />
        )}
      </div>
    </div>
  );
}
