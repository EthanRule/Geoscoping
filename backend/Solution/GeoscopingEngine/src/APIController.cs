namespace GeoscopingEngine.Src
{
    using GeoscopingEngine.src;
    using GeoscopingEngine.src.Events;

    /// <summary>
    /// APIController serves as a bridge between the API and the underlying geoscoping engine.
    /// </summary>
    public class APIController
    {
        private readonly EventController eventController;
        private readonly MapController mapController;
        private readonly ILogger<APIController> logger;

        /// <summary>
        /// Initializes a new instance of the <see cref="APIController"/> class with dependencies.
        /// </summary>
        /// <param name="eventController">Event controller.</param>
        /// <param name="mapController">Map controller.</param>
        /// <param name="logger">Diognostic information logger.</param>
        /// <exception cref="ArgumentNullException">Exception throwing.</exception>
        public APIController(
            EventController eventController,
            MapController mapController,
            ILogger<APIController> logger)
        {
            this.eventController = eventController ?? throw new ArgumentNullException(nameof(eventController));
            this.mapController = mapController ?? throw new ArgumentNullException(nameof(mapController));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Handles the incoming HTTP request and processes it through the geoscoping engine.
        /// </summary>
        /// <param name="request">Request sent by client.</param>
        /// <returns>A formatted HTTP response.</returns>
        public async Task<HttpResponse> HandleRequest(HttpRequest request)
        {
            try
            {
                this.logger.LogInformation($"Received request: {request.Path}");

                // Validate request
                if (request == null)
                {
                    return this.FormatResponse(null, "Invalid request", 400);
                }

                // Route request to appropriate service
                var result = await this.RouteToService(request);

                // Format and return successful response
                return this.FormatResponse(result, "Success", 200);
            }
            catch (Exception ex)
            {
                return this.HandleErrors(ex);
            }
        }

        /// <summary>
        /// Routes the request to the appropriate service within the geoscoping engine.
        /// </summary>
        /// <param name="request">The HTTP request to route.</param>
        /// <returns>Result data from the appropriate controller.</returns>
        public async Task<object> RouteToService(HttpRequest request)
        {
            string path = request.Path.ToString().ToLower();

            // Route to appropriate controller based on path
            if (path.StartsWith("/api/events"))
            {
                return await this.RouteToEventController(request);
            }
            else if (path.StartsWith("/api/map"))
            {
                return await this.RouteToMapController(request);
            }

            throw new NotSupportedException($"Unsupported API path: {path}");
        }


        /// <summary>
        /// Routes requests to the EventController based on the HTTP method and path.
        /// </summary>
        /// <param name="request">Https request.</param>
        /// <returns>Object.</returns>
        /// <exception cref="NotSupportedException">Exception handling.</exception>
        private async Task<object> RouteToEventController(HttpRequest request)
        {
            string method = request.Method.ToUpper();
            string path = request.Path.ToString().ToLower();

            if (path == "/api/events" && method == "GET")
            {
                // Extract query parameters
                var queryParams = request.Query;
                //return eventController.GetEvents(queryParams);
            }
            else if (path.Contains("/api/events/") && method == "GET")
            {
                // Extract event ID from path
                string idStr = path.Split("/").Last();
                if (int.TryParse(idStr, out int id))
                {
                    //return eventController.GetEventDetails(id);
                }
            }

            throw new NotSupportedException($"Unsupported event endpoint: {path}");
        }

        /// <summary>
        /// Routes requests to the MapController.
        /// </summary>
        private async Task<object> RouteToMapController(HttpRequest request)
        {
            string method = request.Method.ToUpper();
            string path = request.Path.ToString().ToLower();

            if (path == "/api/map" && method == "GET")
            {
                //return mapController.GetMap();
            }
            else if (path.Contains("/api/map/region/") && method == "GET")
            {
                // Extract region ID from path
                string idStr = path.Split("/").Last();
                if (int.TryParse(idStr, out int regionId))
                {
                    //return mapController.GetRegionEvents(regionId);
                }
            }

            throw new NotSupportedException($"Unsupported map endpoint: {path}");
        }

        /// <summary>
        /// Formats the API response for consistency.
        /// </summary>
        /// <param name="data">The response data.</param>
        /// <param name="message">Result message.</param>
        /// <param name="statusCode">Http status code.</param>
        /// <returns>A formatted HTTP response.</returns>
        public HttpResponse FormatResponse(object? data, string message, int statusCode)
        {
            var response = new
            {
                success = statusCode >= 200 && statusCode < 300,
                message = message,
                data = data,
                timestamp = DateTime.UtcNow,
            };

            // placeholder
            HttpResponse httpsResponse = null;

            return httpsResponse;
        }

        /// <summary>
        /// Handles exceptions that occur during request processing.
        /// </summary>
        /// <param name="ex">The exception that occurred.</param>
        /// <returns>A formatted error response.</returns>
        public HttpResponse HandleErrors(Exception ex)
        {
            this.logger.LogError(ex, "An error occurred while processing the request");

            int statusCode = ex switch
            {
                ArgumentException => 400,
                NotSupportedException => 404,
                UnauthorizedAccessException => 401,
                _ => 500
            };

            string message = statusCode == 500
                ? "An internal server error occurred"
                : ex.Message;

            return this.FormatResponse(null, message, statusCode);
        }

    }
}
