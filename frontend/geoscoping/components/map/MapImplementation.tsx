import { useState } from "react";
import dynamic from "next/dynamic";

// Dynamically import both implementations to ensure they're only loaded client-side
const LeafletImplementation = dynamic(() => import("./LeafletImplementation"), {
  ssr: false,
});

const GlobeImplementation = dynamic(() => import("./GlobeImplementation"), {
  ssr: false,
});

export default function MapImplementation() {
  const [viewType, setViewType] = useState<"map" | "globe">("map");

  return (
    <div>
      <div className="flex justify-end mb-2">
        <div className="inline-flex rounded-md shadow-sm" role="group">
          <button
            type="button"
            onClick={() => setViewType("map")}
            className={`px-4 py-2 text-sm font-medium border rounded-l-lg ${
              viewType === "map"
                ? "bg-[#8B4513] text-white border-[#693A12]"
                : "bg-white text-[#693A12] border-gray-300 hover:bg-gray-100"
            }`}
          >
            2D Map
          </button>
          <button
            type="button"
            onClick={() => setViewType("globe")}
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
              viewType === "globe"
                ? "bg-[#8B4513] text-white border-[#693A12]"
                : "bg-white text-[#693A12] border-gray-300 hover:bg-gray-100"
            }`}
          >
            3D Globe
          </button>
        </div>
      </div>

      {viewType === "map" ? <LeafletImplementation /> : <GlobeImplementation />}
    </div>
  );
}
