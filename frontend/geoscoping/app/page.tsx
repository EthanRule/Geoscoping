"use client";
import Map from "../components/map";
import EventsTable from "../components/table";

export default function Home() {
  return (
    <div className="space-y-8">
      <section>
        <h1 className="text-3xl font-bold text-slate-800 mb-2">Natural Disaster Tracker</h1>
        <p className="text-gray-600">
          Explore geological events from around the world. View events on the map or filter them in the table below.
        </p>
      </section>
      
      <Map />
      
      <EventsTable />
      
    </div>
  );
}
