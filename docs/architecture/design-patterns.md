# Design Patterns

Design patterns used throughout this application and why.

### Factory / Singleton

Problem: The need to remember and instantiate specific event classes for differing types of events.

Solution: Creates different types of events (e.g. volcano, earthquake, tsunami) with all default parameters unless
specified.

Class: EventFactory

### Repository Pattern

Problem: Direct database access creates tight coupling between business logic and data access logic.

Solution: Abstracts the data layer with specialized classes that handle data operations, providing a collection-like interface.

Classes: EventRepository, RegionRepository, SourceRepository

### Inheritance Hierarchy

Problem: Different event types share common attributes but also have type-specific properties.

Solution: Base Event class with specialized subclasses for each event type, allowing for shared functionality while supporting specialized behaviors.

Classes: Event (base), VolcanoEvent, EarthquakeEvent, WildfireEvent

### API Gateway

Problem: Client applications need a simplified, unified way to interact with multiple backend services.

Solution: A single entry point that routes requests to appropriate services, handling cross-cutting concerns like authentication.

Classes: APIGateway, APIController

### Service Layer

Problem: Business logic spread across controllers creates duplication and makes testing difficult.

Solution: Dedicated service classes that encapsulate domain logic, providing a clear separation from controllers.

Classes: EventService, MapService, RegionService, SourceService

### Model-View-Controller (MVC)

Problem: UI, business logic, and data access concerns can become tangled without clear separation.

Solution: Separates the application into three interconnected components:

- Controllers: Handle user input and coordinate responses
- Services/Models: Contain business logic and data
- Views: Present data to users

Classes: EventController, MapController (controllers), EventService, MapService (services), Client UI components (views)

### Layered Architecture

Problem: Complex applications become difficult to maintain when components have many dependencies across different concerns.

Solution: Organizes the codebase into distinct layers (presentation, business, data) with controlled interactions between them.

Implementation: Client Layer → Server Layer → Data Layer structure

### Dependency Injection

Problem: Hard-coded dependencies make components difficult to test and modify.

Solution: Dependencies are provided to a component rather than created within it.

Implementation: Services receive repositories as dependencies; controllers receive services as dependencies
