## Activity Diagram

Flow of operations or actions within the Geoscoping system, showing how users interact with the application and how the system processes these interactions.

#### Install `bierner.markdown-mermaid` extension from VS Code to view the graph.

Open with: `Ctrl+Shift+V`

```mermaid
stateDiagram-v2
    [*] --> AccessWebsite

    state "Client Layer" as ClientLayer {
        state "User Interaction" as UserInteraction {
            AccessWebsite --> ViewWorldMap
            AccessWebsite --> ViewEventsTable

            state "Map Interaction" as MapInteraction {
                ViewWorldMap --> ZoomMap
                ViewWorldMap --> ExamineEvent
                ExamineEvent --> SelectEvent
                ZoomMap --> ViewWorldMap: Client-side only
            }

            state "Table Interaction" as TableInteraction {
                ViewEventsTable --> SortEvents
                ViewEventsTable --> FilterEvents
            }

            SelectEvent --> ViewEventDetails
            FilterEvents --> ViewEventDetails
            SortEvents --> FilterEvents

            ViewEventDetails --> CheckSources
        }

        state "Client-Side Map Processing" as ClientMapProcessing {
            RenderClientMap --> HandleZoom
            RenderClientMap --> HandlePan
            RenderClientMap --> HighlightEvent
            HighlightEvent --> DisplayEventInfo
        }
    }

    state "Server Layer" as ServerLayer {
        state "API Processing" as APIProcessing {
            ReceiveRequest --> RouteToService
            RouteToService --> ProcessResponse
        }

        state "Event Service" as EventService {
            FetchEvents --> ProcessEventData
            ProcessEventData --> PrepareEventDisplay
            GetEventDetails --> FormatEventData
            GetRegionEvents --> FormatRegionEvents
        }
    }

    state "Data Layer" as DataLayer {
        QueryDatabase --> RetrieveEventData
        QueryDatabase --> RetrieveGeographicData
        QueryDatabase --> RetrieveSources
    }

    % Client to Server transitions (removed direct map service calls)
    AccessWebsite --> ReceiveRequest
    SelectEvent --> GetEventDetails
    ViewEventsTable --> FetchEvents

    % Client to client-side map transitions
    ViewWorldMap --> RenderClientMap
    ZoomMap --> HandleZoom
    ExamineEvent --> HighlightEvent

    % Server internal transitions
    RouteToService --> FetchEvents
    RouteToService --> GetEventDetails

    EventService --> QueryDatabase

    % Server to Client transitions
    PrepareEventDisplay --> ViewEventsTable
    FormatEventData --> ViewEventDetails
    FormatRegionEvents --> ViewRegionEvents
    RetrieveSources --> CheckSources

    % Terminal states
    ProcessResponse --> [*]

    note right of ClientLayer
        Map interactions focus on events rather than regions,
        allowing users to directly interact with event markers
    end note

    note right of ClientMapProcessing
        Client-side map operations highlight events when
        users hover over them and display event data on click
    end note

    note right of ServerLayer
        Server only processes data requests,
        not UI interactions
    end note

    note right of DataLayer
        Interactions with the Data Layer from
        the Application Diagram
    end note
```

### Activity Flow Description

This activity diagram illustrates the flow of operations in the Geoscoping system, showing how users interact with the application and how the system processes these interactions.

#### Client Layer Activities

1. **Initial Access**

   - User navigates to the Geoscoping website
   - Can choose to view the world map or events table

2. **Map Interaction (Client-Side Only)**

   - User views the interactive global map rendered entirely client-side
   - Can zoom in/out to focus on specific areas without server requests
   - Can pan and navigate the map without server requests
   - Can examine events by hovering over event markers on the map
   - Can select events to retrieve detailed information (triggers server request only for data)

3. **Table Interaction**

   - User views tabular data of geological events
   - Can sort events by various criteria
   - Can filter events based on specific parameters

4. **Detailed Information**
   - User can view comprehensive details about specific events by clicking them on the map
   - Can review information sources for each event

#### Server Layer Activities

1. **API Processing**

   - Receives data requests from the client (not UI interaction requests)
   - Routes requests to appropriate services
   - Processes and formats responses

2. **Event Service**
   - Fetches event data based on requests
   - Retrieves events associated with selected regions
   - Processes event data for display
   - Retrieves detailed information for specific events
   - Formats event data for client display

#### Data Layer Activities

- Queries the database for required information
- Retrieves event data, geographic data, and source information
- Provides data to services for processing

This updated diagram removes direct interactions between map UI operations and the server, keeping all map rendering and navigation on the client side. Server requests are only made when actual data needs to be fetched, such as retrieving event details or region-specific information.
