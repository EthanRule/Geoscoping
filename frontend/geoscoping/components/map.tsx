import { useState } from 'react';

export default function Map() {
  const [selectedRegion, setSelectedRegion] = useState<string | null>(null);
  const [zoomLevel, setZoomLevel] = useState(1);

  // Sample regions - would be replaced with actual geographic data
  const sampleRegions = [
    { id: 1, name: "North America", color: "#A5D6A7" },
    { id: 2, name: "South America", color: "#81C784" },
    { id: 3, name: "Europe", color: "#66BB6A" },
    { id: 4, name: "Africa", color: "#4CAF50" },
    { id: 5, name: "Asia", color: "#43A047" },
    { id: 6, name: "Oceania", color: "#388E3C" },
  ];

  // Placeholder for event highlighting - regions with active events would be highlighted
  const activeEventRegions = [1, 3, 5];

  const handleRegionClick = (regionId: number, regionName: string) => {
    setSelectedRegion(regionName);
    // In a real implementation, this would trigger an API call to fetch events for this region
    console.log(`Fetching events for region: ${regionName}`);
  };

  const handleZoom = (direction: 'in' | 'out') => {
    setZoomLevel(prev => {
      const newZoom = direction === 'in' ? prev + 0.2 : prev - 0.2;
      return Math.max(0.5, Math.min(2, newZoom)); // Limit zoom between 0.5 and 2
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-slate-800">Interactive World Map</h2>
        <div className="flex space-x-2">
          <button 
            onClick={() => handleZoom('in')}
            className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
            aria-label="Zoom in"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clipRule="evenodd" />
            </svg>
          </button>
          <button 
            onClick={() => handleZoom('out')}
            className="bg-teal-500 text-white p-2 rounded hover:bg-teal-600"
            aria-label="Zoom out"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M5 10a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      {selectedRegion && (
        <div className="bg-blue-50 p-3 mb-4 rounded border border-blue-200">
          <p className="text-blue-800">
            <span className="font-medium">Selected Region:</span> {selectedRegion}
          </p>
        </div>
      )}

      <div 
        className="border border-gray-300 rounded-lg bg-blue-50 p-4 relative h-[400px] overflow-hidden flex items-center justify-center"
        style={{ transform: `scale(${zoomLevel})`, transition: 'transform 0.3s ease-out' }}
      >
        <div className="absolute inset-0 flex items-center justify-center opacity-10">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-full h-full" viewBox="0 0 1000 500">
            <path d="M731.94,324.65c-3.38-12.32-4.49-24.43-12.44-35.03c-2.21-2.97-1.49-8.12-1.73-12.3 c-0.3-5.34,0.2-10.72-0.14-16.06..." fill="#A5D6A7" stroke="#333" />
          </svg>
        </div>

        <div className="grid grid-cols-3 gap-4 z-10">
          {sampleRegions.map((region) => (
            <div 
              key={region.id} 
              className={`
                p-6 rounded-lg cursor-pointer transition-all transform hover:scale-105
                ${activeEventRegions.includes(region.id) ? 'border-2 border-red-500' : 'border border-gray-300'}
              `}
              style={{ backgroundColor: region.color }}
              onClick={() => handleRegionClick(region.id, region.name)}
            >
              <h3 className="text-white font-bold text-lg mb-2 drop-shadow-md">{region.name}</h3>
              {activeEventRegions.includes(region.id) && (
                <span className="inline-block bg-red-500 text-white text-xs px-2 py-1 rounded">Active Events</span>
              )}
            </div>
          ))}
        </div>
        
        <div className="absolute bottom-2 right-2 text-xs text-gray-500">
          Placeholder Map - Will be replaced with interactive geographic map
        </div>
      </div>
    </div>
  );
}
