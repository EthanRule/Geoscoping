import dynamic from "next/dynamic";

// Dynamically import the entire map implementation with toggle functionality
const MapWithNoSSR = dynamic(() => import("./MapImplementation"), {
  ssr: false,
  loading: () => (
    <div className="flex items-center justify-center bg-[#693A12] text-[#FEFFFE] h-[300px] sm:h-[400px] md:h-[500px] w-full rounded-lg">
      Loading map...
    </div>
  ),
});

export default function Map() {
  return (
    <div className="bg-[#FEFFFE] rounded-lg shadow-md p-4 mt-6 w-full overflow-hidden border border-[#9EA677]">
      <MapWithNoSSR />
    </div>
  );
}
