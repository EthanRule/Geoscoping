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
                ? "bg-[#693A12] text-[#FEFFFE] border-[#693A12]"
                : "bg-[#FEFFFE] text-[#693A12] border-[#9EA677] hover:bg-[#9EA677] hover:text-[#FEFFFE] hover:opacity-80"
            }`}
          >
            2D Map
          </button>
          <button
            type="button"
            onClick={() => setViewType("globe")}
            className={`px-4 py-2 text-sm font-medium border rounded-r-lg ${
              viewType === "globe"
                ? "bg-[#693A12] text-[#FEFFFE] border-[#693A12]"
                : "bg-[#FEFFFE] text-[#693A12] border-[#9EA677] hover:bg-[#9EA677] hover:text-[#FEFFFE] hover:opacity-80"
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
