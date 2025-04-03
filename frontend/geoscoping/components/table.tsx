import { useState } from 'react';

type Event = {
  id: number;
  name: string;
  type: 'Volcano' | 'Earthquake' | 'Wildfire';
  severity: number;
  casualties: number;
  region: string;
  date: string;
};

type SortKey = 'name' | 'type' | 'severity' | 'casualties' | 'region' | 'date';
type SortDirection = 'asc' | 'desc';

export default function EventsTable() {
  // Sample data - would be loaded from API in the real implementation
  const sampleEvents: Event[] = [
    { id: 1, name: 'Mount Vesuvius Eruption', type: 'Volcano', severity: 9, casualties: 16000, region: 'Europe', date: '79-08-24' },
    { id: 2, name: 'San Francisco Earthquake', type: 'Earthquake', severity: 7, casualties: 3000, region: 'North America', date: '1906-04-18' },
    { id: 3, name: 'Australian Bushfire', type: 'Wildfire', severity: 8, casualties: 33, region: 'Oceania', date: '2019-09-01' },
    { id: 4, name: 'Mount St. Helens Eruption', type: 'Volcano', severity: 5, casualties: 57, region: 'North America', date: '1980-05-18' },
    { id: 5, name: 'Tohoku Earthquake', type: 'Earthquake', severity: 9, casualties: 19759, region: 'Asia', date: '2011-03-11' },
    { id: 6, name: 'California Wildfire', type: 'Wildfire', severity: 7, casualties: 85, region: 'North America', date: '2018-11-08' },
  ];

  const [events, setEvents] = useState<Event[]>(sampleEvents);
  const [sortConfig, setSortConfig] = useState<{ key: SortKey; direction: SortDirection }>({ key: 'date', direction: 'desc' });
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  // Filter states
  const [typeFilter, setTypeFilter] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<string>('');
  const [severityFilter, setSeverityFilter] = useState<number | ''>('');

  const handleSort = (key: SortKey) => {
    let direction: SortDirection = 'asc';
    if (sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });

    const sortedEvents = [...events].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'asc' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'asc' ? 1 : -1;
      return 0;
    });
    
    setEvents(sortedEvents);
  };

  const renderSortIcon = (key: SortKey) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'asc' 
        ? <span className="ml-1">↑</span> 
        : <span className="ml-1">↓</span>;
    }
    return null;
  };

  const handleEventClick = (event: Event) => {
    setSelectedEvent(event);
  };

  const applyFilters = () => {
    let filteredEvents = [...sampleEvents];
    
    if (typeFilter) {
      filteredEvents = filteredEvents.filter(event => 
        event.type.toLowerCase().includes(typeFilter.toLowerCase())
      );
    }
    
    if (regionFilter) {
      filteredEvents = filteredEvents.filter(event => 
        event.region.toLowerCase().includes(regionFilter.toLowerCase())
      );
    }
    
    if (severityFilter !== '') {
      filteredEvents = filteredEvents.filter(event => 
        event.severity >= Number(severityFilter)
      );
    }
    
    setEvents(filteredEvents);
  };

  const resetFilters = () => {
    setTypeFilter('');
    setRegionFilter('');
    setSeverityFilter('');
    setEvents(sampleEvents);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-4 mt-6">
      <h2 className="text-xl font-semibold text-slate-800 mb-4">Geological Events</h2>
      
      {/* Filtering controls */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded"
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="">All Types</option>
            <option value="volcano">Volcano</option>
            <option value="earthquake">Earthquake</option>
            <option value="wildfire">Wildfire</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Region</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded"
            value={regionFilter}
            onChange={(e) => setRegionFilter(e.target.value)}
          >
            <option value="">All Regions</option>
            <option value="north america">North America</option>
            <option value="south america">South America</option>
            <option value="europe">Europe</option>
            <option value="asia">Asia</option>
            <option value="africa">Africa</option>
            <option value="oceania">Oceania</option>
          </select>
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Min Severity</label>
          <select 
            className="w-full p-2 border border-gray-300 rounded"
            value={severityFilter}
            onChange={(e) => setSeverityFilter(e.target.value ? Number(e.target.value) : '')}
          >
            <option value="">Any Severity</option>
            <option value="5">5+</option>
            <option value="6">6+</option>
            <option value="7">7+</option>
            <option value="8">8+</option>
            <option value="9">9+</option>
          </select>
        </div>
        
        <div className="flex items-end space-x-2">
          <button 
            onClick={applyFilters}
            className="bg-teal-500 text-white px-4 py-2 rounded hover:bg-teal-600"
          >
            Apply Filters
          </button>
          <button 
            onClick={resetFilters}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Event detail panel */}
      {selectedEvent && (
        <div className="mb-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex justify-between">
            <h3 className="text-lg font-semibold text-slate-800">{selectedEvent.name}</h3>
            <button 
              onClick={() => setSelectedEvent(null)}
              className="text-gray-500 hover:text-gray-700"
            >
              ×
            </button>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-2">
            <div>
              <span className="text-sm text-gray-500">Type:</span>
              <p>{selectedEvent.type}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Severity:</span>
              <p>{selectedEvent.severity}/10</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Casualties:</span>
              <p>{selectedEvent.casualties.toLocaleString()}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Region:</span>
              <p>{selectedEvent.region}</p>
            </div>
            <div>
              <span className="text-sm text-gray-500">Date:</span>
              <p>{selectedEvent.date}</p>
            </div>
          </div>
          <div className="mt-3 text-sm text-gray-500">
            <p>This is a placeholder for more detailed event information and sources.</p>
          </div>
        </div>
      )}

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th 
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort('name')}
              >
                Event Name {renderSortIcon('name')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort('type')}
              >
                Type {renderSortIcon('type')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort('severity')}
              >
                Severity {renderSortIcon('severity')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort('casualties')}
              >
                Casualties {renderSortIcon('casualties')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort('region')}
              >
                Region {renderSortIcon('region')}
              </th>
              <th 
                className="px-4 py-2 text-left cursor-pointer"
                onClick={() => handleSort('date')}
              >
                Date {renderSortIcon('date')}
              </th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr 
                key={event.id} 
                className={`border-t hover:bg-gray-50 cursor-pointer ${selectedEvent?.id === event.id ? 'bg-blue-50' : ''}`}
                onClick={() => handleEventClick(event)}
              >
                <td className="px-4 py-3">{event.name}</td>
                <td className="px-4 py-3">
                  <span 
                    className={`px-2 py-1 rounded text-xs text-white ${
                      event.type === 'Volcano' ? 'bg-red-500' : 
                      event.type === 'Earthquake' ? 'bg-orange-500' : 'bg-amber-500'
                    }`}
                  >
                    {event.type}
                  </span>
                </td>
                <td className="px-4 py-3">{event.severity}/10</td>
                <td className="px-4 py-3">{event.casualties.toLocaleString()}</td>
                <td className="px-4 py-3">{event.region}</td>
                <td className="px-4 py-3">{event.date}</td>
              </tr>
            ))}
            {events.length === 0 && (
              <tr>
                <td colSpan={6} className="px-4 py-3 text-center text-gray-500">
                  No events match the current filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 text-xs text-gray-500 text-right">
        Showing {events.length} events (Placeholder data - Will be replaced with real events from API)
      </div>
    </div>
  );
}
