# Component Diagram

This diagram illustrates the key components of the Geoscoping system and their interactions, showing how the various software elements work together to fulfill the system requirements.

#### Install `bierner.markdown-mermaid` extension from VS Code to view the graph.

Open with: `Ctrl+Shift+V`

```mermaid
graph TD
    subgraph "Client Layer"
        WebClient["Web Browser Client"]

        subgraph "UI Components"
            MapComponent["Interactive Map<br/>Component"]
            TableComponent["Events Table<br/>Component"]
            DetailComponent["Event Detail<br/>Component"]
            SourcesComponent["Sources Display<br/>Component"]
            FilterComponent["Filter & Sort<br/>Component"]
        end

        WebClient --> MapComponent
        WebClient --> TableComponent
        WebClient --> DetailComponent
        WebClient --> SourcesComponent
        WebClient --> FilterComponent

        MapComponent <--> TableComponent
        TableComponent --> DetailComponent
        DetailComponent --> SourcesComponent
    end

    subgraph "Server Layer"
        APIGateway["API Gateway"]

        subgraph "Security"
            AuthService["Authentication<br/>Service"]
        end

        subgraph "Core Services"
            EventService["Event Service"]
            MapService["Map Service"]
            RegionService["Region Service"]
            SourceService["Source Service"]
        end

        APIGateway --> AuthService
        APIGateway --> EventService
        APIGateway --> MapService
        APIGateway --> RegionService
        APIGateway --> SourceService
    end

    subgraph "Data Layer"
        PostgreSQL[(PostgreSQL<br/>Database)]

        subgraph "Data Models"
            EventsData["Geological Events<br/>Data"]
            RegionsData["Geographic Regions<br/>Data"]
            SourcesData["Information Sources<br/>Data"]
        end

        PostgreSQL --- EventsData
        PostgreSQL --- RegionsData
        PostgreSQL --- SourcesData
    end

    %% Cross-layer connections
    WebClient <--> APIGateway

    EventService <--> PostgreSQL
    MapService <--> PostgreSQL
    RegionService <--> PostgreSQL
    SourceService <--> PostgreSQL

    %% Apply styling
    classDef client fill:#D5E8D4,stroke:#82B366,stroke-width:2px,color:black;
    classDef ui fill:#D5E8D4,stroke:#82B366,stroke-width:1px,color:black;
    classDef server fill:#DAE8FC,stroke:#6C8EBF,stroke-width:2px,color:black;
    classDef service fill:#DAE8FC,stroke:#6C8EBF,stroke-width:1px,color:black;
    classDef security fill:#FFE6CC,stroke:#D79B00,stroke-width:1px,color:black;
    classDef data fill:#F8CECC,stroke:#B85450,stroke-width:2px,color:black;
    classDef datamodel fill:#F8CECC,stroke:#B85450,stroke-width:1px,color:black;

    class WebClient client;
    class MapComponent,TableComponent,DetailComponent,SourcesComponent,FilterComponent ui;
    class APIGateway server;
    class EventService,MapService,RegionService,SourceService service;
    class AuthService security;
    class PostgreSQL data;
    class EventsData,RegionsData,SourcesData datamodel;
```

## Component Description

### Client Layer

- **Web Browser Client**: The main entry point for users accessing the Geoscoping application
- **UI Components**:
  - **Interactive Map Component**: Displays the world map with shaded regions, supports zooming
  - **Events Table Component**: Shows tabular data of geological events
  - **Filter & Sort Component**: Allows filtering and sorting events by severity, casualties, region, and time frame
  - **Event Detail Component**: Displays comprehensive information about a selected event
  - **Sources Display Component**: Shows information sources for events

### Server Layer

- **API Gateway**: Central entry point for all client requests, routes to appropriate services
- **Security**:
  - **Authentication Service**: Handles authentication for protected endpoints
- **Core Services**:
  - **Event Service**: Manages geological event data (volcanos, earthquakes, wildfires)
  - **Map Service**: Handles map rendering and geographic data processing
  - **Region Service**: Manages region-specific data and operations
  - **Source Service**: Handles information source retrieval and management

### Data Layer

- **PostgreSQL Database**: Stores all application data
- **Data Models**:
  - **Geological Events Data**: Information about natural disasters
  - **Geographic Regions Data**: Map regions and coordinates
  - **Information Sources Data**: References and citations for event information

## Key Interactions

1. The Web Client communicates with the API Gateway for all data requests
2. API requests pass through Authentication Service for protected endpoints
3. Core Services process client requests and interact with the database
4. UI Components interact with each other (e.g., clicking a map region updates the table)
5. All data persistence happens through the PostgreSQL database

This architecture supports the functional requirements while maintaining a clear separation of concerns and adhering to the non-functional requirements of an object-oriented backend with protected endpoints.
