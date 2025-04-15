import dynamic from "next/dynamic";

// Dynamically import the entire map implementation with toggle functionality
const MapWithNoSSR = dynamic(() => import("./MapImplementation"), {
  ssr: false,
  // Remove the loading state here as it's handled in MapImplementation.tsx
});

export default function Map() {
  return (
    <div className="bg-black rounded-lg shadow-md p-4 mt-6 w-full overflow-hidden h-[580px] ">
      <MapWithNoSSR />
    </div>
  );
}
