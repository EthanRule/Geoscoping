# Use Case Diagram

#### Install `bierner.markdown-mermaid` extension from VS Code to view the graph.

Open with: `Ctrl+Shift+V`

Visualizes the functional requirements of the system from a user's perspective.

```mermaid
graph LR
    User((User))

    subgraph Geoscoping System
        UC1[View Interactive World Map]
        UC2[Zoom In/Out on Map]
        UC3[View Geological Events Table]
        UC4[Sort Events]
        UC5[View Event Details]
        UC6[View Shaded Event Regions]
        UC7[Access Event Sources]
        UC8[View Region-Specific Event Data]
    end

    User --> UC1
    User --> UC2
    User --> UC3
    User --> UC4
    User --> UC5
    User --> UC6
    User --> UC7
    User --> UC8

    UC1 -.-> UC6
    UC1 -.-> UC8
    UC3 -.-> UC4
    UC3 -.-> UC5
    UC5 -.-> UC7
    UC8 -.-> UC5

    classDef usecase fill:#994,stroke:#333,stroke-width:1px;
    class UC1,UC2,UC3,UC4,UC5,UC6,UC7,UC8 usecase;
```

## Use Case Descriptions

### Primary User Interactions

1. **View Interactive World Map**

   - User can access and view a global map showing geological events
   - Includes the ability to see shaded regions representing event areas

2. **Zoom In/Out on Map**

   - User can adjust the map view to focus on specific regions or get a broader overview

3. **View Geological Events Table**

   - User can access a tabular view of all geological events (volcanoes, earthquakes, wildfires)
   - Table displays key information about each event

4. **Sort Events**

   - User can organize events based on different criteria:
     - Severity of the event
     - Number of casualties
     - Geographic region
     - Time frame of occurrence

5. **View Event Details**

   - User can access comprehensive information about a specific geological event
   - Includes all recorded data points about the event

6. **View Shaded Event Regions**

   - User can see color-coded or otherwise visually distinguished areas on the map representing event locations

7. **Access Event Sources**

   - User can view the sources of information for any given event
   - Includes references, citations, or links to original data sources

8. **View Region-Specific Event Data**
   - User can click on a map region and be linked directly to corresponding event data in the table
   - Provides a geographic entry point to detailed information

## Relationships

- Viewing the world map includes the ability to see shaded regions and click on regions for details
- The events table is the foundation for sorting events and viewing detailed information
- Event details include access to information sources
- Clicking on map regions leads to viewing specific event details
