"use client";
import React from "react";
import Map from "@/components/map/map";
import Table from "@/components/table/table";

export default function Home() {
  return (
    <div className="pt-20">
      <Map />
      <div className="py-20">
        <Table />
      </div>
    </div>
  );
}
