## Class Diagram

The structure of your system in terms of classes, their attributes, methods, and relationships (e.g., inheritance, association).

#### Install `bierner.markdown-mermaid` extension from VS Code to view the graph.

Open with: `Ctrl+Shift+V`

```mermaid
classDiagram
    %% Domain Models
    class Event {
        +int id
        +String name
        +DateTime startDate
        +DateTime endDate
        +int severity
        +int casualties
        +String description
        +DateTime createdAt
        +DateTime updatedAt
        +getEventDetails()
        +getAssociatedRegions()
        +getSources()
    }

    class EventType {
        +String typeCode
        +String name
        +String description
        +String colorCode
        +getEvents()
    }

    class VolcanoEvent {
        +String volcanoType
        +int vei
        +double magmaComposition
        +int eruptionHeight
        +boolean tsunamiGenerated
        +getVolcanoSpecificDetails()
    }

    class EarthquakeEvent {
        +double magnitude
        +String magnitudeType
        +int depth
        +String faultType
        +boolean tsunamiGenerated
        +getEarthquakeSpecificDetails()
    }

    class WildfireEvent {
        +double areaBurned
        +String areaUnit
        +String cause
        +int containmentPercent
        +String vegetationType
        +getWildfireSpecificDetails()
    }

    class EventFactory {
        +Event createEvent(String eventType, EventData data)
        +VolcanoEvent createVolcanoEvent(EventData data)
        +EarthquakeEvent createEarthquakeEvent(EventData data)
        +WildfireEvent createWildfireEvent(EventData data)
        +Event createEventFromDTO(EventDTO dto)
    }

    class Region {
        +int id
        +String name
        +String country
        +String continent
        +Geometry coordinates
        +getEvents()
        +getBoundaries()
    }

    class Source {
        +int id
        +String name
        +String url
        +String description
        +Date publicationDate
        +int reliabilityScore
        +getReferencedEvents()
    }

    %% Service Layer
    class EventService {
        -EventFactory eventFactory
        +getAllEvents()
        +getEventById(int id)
        +getEventsByType(String typeCode)
        +getEventsByRegion(int regionId)
        +getEventsBySeverity(int minSeverity, int maxSeverity)
        +getEventsByCasualties(int minCasualties, int maxCasualties)
        +getEventsByTimeFrame(DateTime start, DateTime end)
        +searchEvents(String query)
    }

    class MapService {
        +getWorldMapData()
        +getRegionBoundaries(int regionId)
        +getEventRegions()
        +getShadeIntensity(int severity)
        +calculateAffectedArea(Event event, Region region)
    }

    %% Controllers
    class APIController {
        +handleRequest(Request request)
        +routeToService(Request request)
        +formatResponse(Data data)
        +handleErrors(Exception e)
    }

    class EventController {
        +getEvents(Params params)
        +getEventDetails(int id)
        +filterEvents(Criteria criteria)
        +sortEvents(SortOption option)
    }

    class MapController {
        +getMap()
        +zoomMap(Coordinates center, int zoomLevel)
        +highlightRegion(int regionId)
        +getRegionEvents(int regionId)
    }

    %% Data Access
    class EventRepository {
        +findAll()
        +findById(int id)
        +findByType(String typeCode)
        +findByRegion(int regionId)
        +findBySeverity(int min, int max)
        +findByCasualties(int min, int max)
        +findByTimeFrame(DateTime start, DateTime end)
        +search(String query)
    }

    class RegionRepository {
        +findAll()
        +findById(int id)
        +findByName(String name)
        +findByCountry(String country)
        +findByContinent(String continent)
        +findByCoordinates(Coordinates coordinates)
    }

    class SourceRepository {
        +findAll()
        +findById(int id)
        +findByEvent(int eventId)
        +findByReliability(int minScore)
    }

    %% Relationships
    Event <|-- VolcanoEvent
    Event <|-- EarthquakeEvent
    Event <|-- WildfireEvent

    EventFactory ..> Event
    EventFactory ..> VolcanoEvent
    EventFactory ..> EarthquakeEvent
    EventFactory ..> WildfireEvent

    EventType "1" -- "many" Event
    Event "many" -- "many" Region
    Event "many" -- "many" Source

    EventService --> EventFactory
    EventService --> EventRepository

    MapService --> RegionRepository

    APIController --> EventController
    APIController --> MapController

    EventController --> EventService
    MapController --> MapService

    EventRepository ..> Event
    RegionRepository ..> Region
    SourceRepository ..> Source

    %% Implementation Status Styling - Using only border colors with transparent fill
    style Event fill:transparent,stroke:#FFD700,stroke-width:3px %% In Progress - Gold/Orange border
    style VolcanoEvent fill:transparent,stroke:#FFD700,stroke-width:3px %% In Progress - Gold/Orange border
    style EarthquakeEvent fill:transparent,stroke:#FFD700,stroke-width:3px %% In Progress - Gold/Orange border
    style WildfireEvent fill:transparent,stroke:#FFD700,stroke-width:3px %% In Progress - Gold/Orange border

    style EventType fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started - Tomato Red border
    style EventFactory fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style Region fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style Source fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style EventService fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style MapService fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style APIController fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style EventController fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style MapController fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style EventRepository fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style RegionRepository fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started
    style SourceRepository fill:transparent,stroke:#FF6347,stroke-width:3px %% Not Started

    %% Add a Legend class
    class Legend {
        <<Implementation Status>>
        Completed (Green Border)
        In Progress (Yellow Border)
        Not Started (Red Border)
    }
    style Legend fill:transparent,stroke-dasharray:5 5
```

## Class Diagram Description

This class diagram illustrates the structure of the Geoscoping application, showing the key classes, their attributes, methods, and relationships. The diagram is organized into several logical sections:

### Domain Models

These classes represent the core business entities of the application:

- **Event**: Base class for all geological events with common properties
  - **VolcanoEvent**: Specialized class for volcanic events
  - **EarthquakeEvent**: Specialized class for earthquake events
  - **WildfireEvent**: Specialized class for wildfire events
- **EventType**: Categorizes events (volcano, earthquake, wildfire)
- **EventFactory**: Creates appropriate event instances based on type (Factory Pattern)
- **Region**: Geographic areas affected by events
- **Source**: Information sources referenced for event data

### Service Layer

These classes implement the business logic:

- **EventService**: Manages event data retrieval and processing
- **MapService**: Handles geographic data and map rendering operations

### Controllers

These classes handle requests and coordinate application flow:

- **APIController**: Central entry point that routes all client requests
- **EventController**: Handles event-specific operations
- **MapController**: Manages map-related operations

### Data Access

These classes manage database interactions:

- **EventRepository**: Data access for events
- **RegionRepository**: Data access for geographic regions
- **SourceRepository**: Data access for information sources

### Key Relationships

1. **Inheritance**:

   - Specific event types (Volcano, Earthquake, Wildfire) inherit from the base Event class

2. **Factory Pattern**:

   - The EventFactory creates appropriate event instances based on the event type
   - This improves extensibility by centralizing event creation logic
   - New event types can be added by extending the factory without modifying client code

3. **Associations**:

   - Many-to-many relationships between events and regions
   - Many-to-many relationships between events and sources
   - One-to-many relationship between event types and events

4. **Dependencies**:
   - EventService depends on EventFactory for creating events
   - Services depend on Repositories
   - Controllers depend on Services
   - Repositories work with Domain Models

### Factory Pattern Benefits

The Event Factory pattern provides several advantages:

1. **Encapsulation**: Hides the instantiation logic from client code
2. **Centralized Creation**: Single point for creating different event types
3. **Extensibility**: New event types can be added by updating the factory without changing client code
4. **Simplified Client Code**: Services just request an event of a certain type without needing to know creation details

### Implementation Status

The class diagram uses color coding to indicate the implementation status of each class:

- **Green**: Completed classes
- **Orange**: Classes in progress (Event, VolcanoEvent, EarthquakeEvent, WildfireEvent)
- **Red**: Classes not yet started

This visual indication helps track the development progress of the system components.

This class structure supports the requirements for displaying geological events on an interactive map with the ability to filter, sort, and view detailed information about events and their sources.
