import { useEffect, useRef } from "react";
import Globe from "globe.gl";

export default function GlobeImplementation() {
  const globeEl = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!globeEl.current) return;

    // Initialize globe with the new keyword as required by TypeScript
    const globe = new Globe(globeEl.current);

    // Configure the globe with style guide colors
    globe
      .globeImageUrl(
        "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"
      )
      .bumpImageUrl("//unpkg.com/three-globe/example/img/earth-topology.png")
      .backgroundImageUrl("//unpkg.com/three-globe/example/img/night-sky.png")
      .width(globeEl.current.clientWidth)
      .height(500)
      .atmosphereColor("rgba(28, 68, 142, 0.7)") // Using Marian Blue from style guide with transparency
      .atmosphereAltitude(0.15)
      .backgroundColor("#050505"); // Using Black from style guide

    // Handle resize
    const handleResize = () => {
      if (globeEl.current) {
        globe.width(globeEl.current.clientWidth);
      }
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      if (globe && typeof globe._destructor === "function") {
        globe._destructor();
      }
    };
  }, []);

  return (
    <div
      ref={globeEl}
      className="border-2 border-[#1C448E] rounded-lg overflow-hidden"
      style={{
        width: "100%",
        height: "500px",
      }}
    />
  );
}
