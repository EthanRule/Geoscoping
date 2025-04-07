"use client";
import React from "react";
import Map from "@/components/map/map";
import Table from "@/components/table/table";

export default function Home() {
  return (
    <div>
      <div className="xl:w-1/2">
        <Map />
      </div>
      <div className="py-5">
        <Table />
      </div>
    </div>
  );
}
