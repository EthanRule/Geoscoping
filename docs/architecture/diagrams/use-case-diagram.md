# Use Case Diagram

#### Install `bierner.markdown-mermaid` extension from VS Code to view the graph.

Open with: `Ctrl+Shift+V`

Visualizes the functional requirements of the system from a user's perspective.

# Use Case Diagram

```mermaid
%% Simple Use Case Diagram for GeoScoping.com

graph TD;
    User -->|View| Events["View Natural Events"];
    User -->|Sort| Sorting["Sort by Severity, Region, Time"];
    User -->|Interact| Map["Use Interactive Map"];

    Admin -->|Manage| AdminPage["Manage Data & Users"];
    Admin -->|Secure| Protected["Access Protected Areas"];

    Events -->|Stored in| Database["PostgreSQL Database"];
    Map -->|Shows| Regions["Affected Areas"];
```
