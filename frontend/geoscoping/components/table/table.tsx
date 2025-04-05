import { useState } from "react";
import { Event, sampleEvents } from "./event-data";

export default function Table() {
  const [events] = useState<Event[]>(sampleEvents);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState<Set<string>>(new Set());
  const eventsPerPage = 5;

  // Calculate total pages
  const totalPages = Math.ceil(events.length / eventsPerPage);

  // Get current events for display
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = events.slice(indexOfFirstEvent, indexOfLastEvent);

  // Page navigation functions
  const goToPreviousPage = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage((prev) => Math.min(prev + 1, totalPages));
  };

  // Toggle row expansion
  const toggleRowExpand = (id: string) => {
    setExpandedRows((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      return newSet;
    });
  };

  // Check if row is expanded
  const isRowExpanded = (id: string) => {
    return expandedRows.has(id);
  };

  const getEventIcon = (type: string) => {
    switch (type) {
      case "volcano":
        return "🌋"; // Alternative options: 🔺 ♨️ 🏔️ ☄️
      case "wildfire":
        return "🔥"; // Alternative options: 🌲‍🔥 🌫️ 🚒 🧯
      case "earthquake":
        return "💢"; // Changed to anger symbol representing vibration/shaking
      // Alternative earthquake options: ⚡ 📊 🌊 🪨
      default:
        return "⚠️";
    }
  };

  const getSeverityColor = (severity: number) => {
    // Updated to work with 1-10 scale
    if (severity <= 3) {
      return "bg-[#9EA677]"; // Moss Green for low (1-3)
    } else if (severity <= 7) {
      return "bg-[#693A12]"; // Sepia for medium (4-7)
    } else {
      return "bg-[#1C448E]"; // Marian Blue for high (8-10)
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return "bg-red-100 text-red-800";
      case "inactive":
        return "bg-gray-100 text-gray-800";
      case "monitoring":
        return "bg-yellow-100 text-yellow-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  // Render details for volcano events
  const renderVolcanoDetails = (event: Event) => {
    return (
      <div>
        {event.info && <p className="mb-4">{event.info}</p>}
        <div className="grid grid-cols-2 gap-4 mt-3">
          {event.volcanoType && (
            <div>
              <span className="text-gray-400">Volcano Type:</span>{" "}
              {event.volcanoType}
            </div>
          )}
          {event.vei !== undefined && (
            <div>
              <span className="text-gray-400">
                VEI (Volcanic Explosivity Index):
              </span>{" "}
              {event.vei}
            </div>
          )}
          {event.magmaComposition && (
            <div>
              <span className="text-gray-400">Magma Composition:</span>{" "}
              {event.magmaComposition}
            </div>
          )}
          {event.eruptionHeight !== undefined && (
            <div>
              <span className="text-gray-400">Eruption Column Height:</span>{" "}
              {event.eruptionHeight} meters
            </div>
          )}
          {event.volTsunamiGenerated !== undefined && (
            <div>
              <span className="text-gray-400">Tsunami Generated:</span>{" "}
              {event.volTsunamiGenerated ? "Yes" : "No"}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render details for earthquake events
  const renderEarthquakeDetails = (event: Event) => {
    return (
      <div>
        {event.info && <p className="mb-4">{event.info}</p>}
        <div className="grid grid-cols-2 gap-4 mt-3">
          {event.magnitude !== undefined && (
            <div>
              <span className="text-gray-400">Magnitude:</span>{" "}
              {event.magnitude}
              {event.magnitudeType && ` (${event.magnitudeType} scale)`}
            </div>
          )}
          {event.depth !== undefined && (
            <div>
              <span className="text-gray-400">Depth:</span> {event.depth} km
            </div>
          )}
          {event.faultType && (
            <div>
              <span className="text-gray-400">Fault Type:</span>{" "}
              {event.faultType}
            </div>
          )}
          {event.eqTsunamiGenerated !== undefined && (
            <div>
              <span className="text-gray-400">Tsunami Generated:</span>{" "}
              {event.eqTsunamiGenerated ? "Yes" : "No"}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render details for wildfire events
  const renderWildfireDetails = (event: Event) => {
    return (
      <div>
        {event.info && <p className="mb-4">{event.info}</p>}
        <div className="grid grid-cols-2 gap-4 mt-3">
          {event.areaBurned !== undefined && event.areaUnit && (
            <div>
              <span className="text-gray-400">Area Burned:</span>{" "}
              {event.areaBurned} {event.areaUnit}
            </div>
          )}
          {event.cause && (
            <div>
              <span className="text-gray-400">Cause:</span> {event.cause}
            </div>
          )}
          {event.containmentPercent !== undefined && (
            <div>
              <span className="text-gray-400">Containment:</span>{" "}
              {event.containmentPercent}%
            </div>
          )}
          {event.vegetationType && (
            <div>
              <span className="text-gray-400">Vegetation Type:</span>{" "}
              {event.vegetationType}
            </div>
          )}
        </div>
      </div>
    );
  };

  // Render event details based on type
  const renderEventDetails = (event: Event) => {
    switch (event.type) {
      case "volcano":
        return renderVolcanoDetails(event);
      case "earthquake":
        return renderEarthquakeDetails(event);
      case "wildfire":
        return renderWildfireDetails(event);
      default:
        return <p>{event.info}</p>;
    }
  };

  return (
    <div className="px-4 w-full mx-auto">
      <div className="rounded-lg overflow-hidden">
        <div className="bg-gray-800/30 text-gray-300 py-2 px-6 rounded-lg mb-2">
          <div className="grid grid-cols-12 gap-3">
            <div className="col-span-1 flex items-center font-medium">Type</div>
            <div className="col-span-2 flex items-center font-medium">Name</div>
            <div className="col-span-3 flex items-center font-medium">
              Location
            </div>
            <div className="col-span-2 flex items-center font-medium">Date</div>
            <div className="col-span-2 flex items-center font-medium">
              Severity
            </div>
            <div className="col-span-1 flex items-center font-medium">
              Status
            </div>
          </div>
        </div>

        <div className="py-2">
          {currentEvents.map((event) => (
            <div key={event.id} className="mb-2">
              <div className="grid grid-cols-12 gap-3 px-6 py-2 bg-[#050505] text-white border border-gray-700 rounded-lg shadow-sm hover:bg-gray-900 transition-all">
                <div className="col-span-1 flex items-center">
                  <span className="text-xl" title={event.type}>
                    {getEventIcon(event.type)}
                  </span>
                </div>
                <div className="col-span-2 font-medium flex items-center">
                  {event.name}
                </div>
                <div className="col-span-3 text-gray-300 flex items-center">
                  {event.location}
                </div>
                <div className="col-span-2 text-gray-300 flex items-center">
                  {event.date}
                </div>
                <div className="col-span-2 flex items-center">
                  <div className="flex items-center">
                    <span
                      className={`${getSeverityColor(
                        event.severity
                      )} w-8 h-2 rounded-full mr-2`}
                      title={`Level ${event.severity}`}
                    ></span>
                    <span>{event.severity}/10</span>
                  </div>
                </div>
                <div className="col-span-1 flex items-center">
                  <span
                    className={`${getStatusBadge(
                      event.status
                    )} px-2 py-1 text-xs font-medium rounded-full`}
                  >
                    {event.status}
                  </span>
                </div>
                <div className="col-span-1 flex items-center justify-end">
                  {event.info ? (
                    <button
                      onClick={() => toggleRowExpand(event.id)}
                      className="p-1 rounded-full hover:bg-gray-700 transition-colors"
                      aria-label={
                        isRowExpanded(event.id)
                          ? "Hide details"
                          : "Show details"
                      }
                      title={
                        isRowExpanded(event.id)
                          ? "Hide details"
                          : "Show details"
                      }
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className={`transform ${
                          isRowExpanded(event.id) ? "rotate-180" : ""
                        } transition-transform`}
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="8" />
                      </svg>
                    </button>
                  ) : (
                    <span
                      className="text-gray-600 px-1"
                      title="No additional information"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        opacity="0.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="16" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="8" />
                      </svg>
                    </span>
                  )}
                </div>
              </div>

              {/* Expanded info section - updated to use renderEventDetails */}
              {isRowExpanded(event.id) && (
                <div className="px-6 py-3 mt-1 bg-gray-900 border border-gray-700 rounded-lg text-gray-300">
                  {renderEventDetails(event)}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Pagination Controls */}
        <div className="flex justify-center items-center py-4">
          <button
            onClick={goToPreviousPage}
            disabled={currentPage === 1}
            className={`mx-2 p-2 rounded-lg ${
              currentPage === 1
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:bg-gray-800"
            }`}
            aria-label="Previous page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>

          <span className="text-gray-300 mx-4">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={goToNextPage}
            disabled={currentPage === totalPages}
            className={`mx-2 p-2 rounded-lg ${
              currentPage === totalPages
                ? "text-gray-500 cursor-not-allowed"
                : "text-white hover:bg-gray-800"
            }`}
            aria-label="Next page"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
