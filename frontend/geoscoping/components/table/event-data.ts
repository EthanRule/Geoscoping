// This is just dummy data for the table component to use. In a real application, this data would come from an API or a database.

export type Event = {
  id: string;
  type: "volcano" | "wildfire" | "earthquake";
  name: string;
  location: string;
  date: string;
  severity: number; // On a scale of 1-10
  status: "active" | "inactive" | "monitoring";
  info?: string; // Optional additional information

  // Volcano specific properties
  volcanoType?: string;
  vei?: number; // Volcanic Explosivity Index
  magmaComposition?: string;
  eruptionHeight?: number;
  volTsunamiGenerated?: boolean;

  // Earthquake specific properties
  magnitude?: number;
  magnitudeType?: string;
  depth?: number;
  faultType?: string;
  eqTsunamiGenerated?: boolean;

  // Wildfire specific properties
  areaBurned?: number;
  areaUnit?: string;
  cause?: string;
  containmentPercent?: number;
  vegetationType?: string;
};

export const sampleEvents: Event[] = [
  {
    id: "1",
    type: "volcano",
    name: "Mount St. Helens",
    location: "Washington, USA",
    date: "2023-10-15",
    severity: 7,
    status: "monitoring",
    info: "Mount St. Helens is an active stratovolcano located in Skamania County, Washington. The volcano is monitored for potential eruption after increased seismic activity was detected in recent weeks.",
    volcanoType: "Stratovolcano",
    vei: 4,
    magmaComposition: "Dacitic",
    eruptionHeight: 19000,
    volTsunamiGenerated: false,
  },
  {
    id: "2",
    type: "wildfire",
    name: "California Coastal Fire",
    location: "California, USA",
    date: "2023-10-02",
    severity: 9,
    status: "active",
    info: "The coastal fire has consumed over 8,000 acres of land and threatens several residential communities. Evacuation orders have been issued for affected areas.",
    areaBurned: 8327,
    areaUnit: "acres",
    cause: "Human activity",
    containmentPercent: 35,
    vegetationType: "Chaparral and coastal sage scrub",
  },
  {
    id: "3",
    type: "earthquake",
    name: "Pacific Rim Tremor",
    location: "Japan",
    date: "2023-09-28",
    severity: 5,
    status: "inactive",
    magnitude: 6.2,
    magnitudeType: "Richter",
    depth: 28,
    faultType: "Subduction",
    eqTsunamiGenerated: false,
  },
  {
    id: "4",
    type: "volcano",
    name: "Kilauea",
    location: "Hawaii, USA",
    date: "2023-09-12",
    severity: 4,
    status: "active",
    volcanoType: "Shield volcano",
    vei: 1,
    magmaComposition: "Basaltic",
    eruptionHeight: 300,
    volTsunamiGenerated: false,
  },
  {
    id: "5",
    type: "earthquake",
    name: "San Andreas Movement",
    location: "California, USA",
    date: "2023-08-22",
    severity: 8,
    status: "monitoring",
    info: "Significant seismic activity detected along the San Andreas fault line. Authorities are monitoring for aftershocks.",
    magnitude: 7.1,
    magnitudeType: "Moment magnitude",
    depth: 15,
    faultType: "Strike-slip",
    eqTsunamiGenerated: false,
  },
  {
    id: "6",
    type: "wildfire",
    name: "Australian Bushfire",
    location: "New South Wales, Australia",
    date: "2023-08-15",
    severity: 10,
    status: "active",
    info: "Extreme bushfire conditions have led to widespread evacuations. Wildlife sanctuaries have been severely impacted.",
    areaBurned: 125000,
    areaUnit: "hectares",
    cause: "Lightning strike",
    containmentPercent: 20,
    vegetationType: "Eucalyptus forest",
  },
  {
    id: "7",
    type: "earthquake",
    name: "Alaskan Subduction",
    location: "Anchorage, Alaska",
    date: "2023-07-29",
    severity: 7,
    status: "inactive",
    info: "A major earthquake struck the Alaskan coastline. Several fishing villages reported structural damage.",
    magnitude: 6.8,
    magnitudeType: "Moment magnitude",
    depth: 35,
    faultType: "Subduction",
    eqTsunamiGenerated: true,
  },
  {
    id: "8",
    type: "volcano",
    name: "Mount Fuji Activity",
    location: "Honshu, Japan",
    date: "2023-07-12",
    severity: 6,
    status: "monitoring",
    info: "Japan's iconic Mount Fuji has shown increased activity with minor gas emissions. Authorities have established a safety perimeter and are actively monitoring for changes.",
    volcanoType: "Stratovolcano",
    vei: 2,
    magmaComposition: "Basaltic-andesitic",
    eruptionHeight: 500,
    volTsunamiGenerated: false,
  },
  {
    id: "9",
    type: "wildfire",
    name: "Rocky Mountain Blaze",
    location: "Colorado, USA",
    date: "2023-06-18",
    severity: 3,
    status: "active",
    areaBurned: 1200,
    areaUnit: "acres",
    cause: "Campfire",
    containmentPercent: 85,
    vegetationType: "Pine forest",
  },
  {
    id: "10",
    type: "earthquake",
    name: "Indonesian Ring of Fire",
    location: "Java, Indonesia",
    date: "2023-05-30",
    severity: 9,
    status: "monitoring",
    info: "A major 7.2 magnitude earthquake struck the island of Java. Aftershocks continue to be felt throughout the region. Relief efforts are underway in affected communities.",
    magnitude: 7.2,
    magnitudeType: "Richter",
    depth: 22,
    faultType: "Subduction",
    eqTsunamiGenerated: true,
  },
];
