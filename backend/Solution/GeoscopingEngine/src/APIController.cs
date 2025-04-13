namespace GeoscopingEngine.Src
{
    using GeoscopingEngine.Src.Events;

    /// <summary>
    /// APIController serves as a bridge between the API and the underlying geoscoping engine.
    /// </summary>
    public class APIController
    {
        private readonly EventController eventController;
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
            ILogger<APIController> logger)
        {
            this.eventController = eventController ?? throw new ArgumentNullException(nameof(eventController));
            this.logger = logger ?? throw new ArgumentNullException(nameof(logger));
        }

        /// <summary>
        /// Handles the incoming HTTP request and processes it through the geoscoping engine.
        /// </summary>
        /// <param name="request">Request sent by client.</param>
        /// <returns>A formatted HTTP response.</returns>
        public async Task<HttpResponse> HandleRequest(HttpRequest request)
        {
            this.logger.LogInformation($"Received request: {request.Path}");
            if (request == null)
            {
                return this.FormatResponse(null, "Invalid request", 400);
            }

            var result = await this.RouteToService(request);
            return this.FormatResponse(result, "Success", 200);
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

            var context = new DefaultHttpContext();
            context.Response.StatusCode = statusCode;
            context.Response.ContentType = "application/json";
            context.Response.Body = new MemoryStream();

            var jsonResponse = System.Text.Json.JsonSerializer.Serialize(response);
            using (var writer = new StreamWriter(context.Response.Body, leaveOpen: true))
            {
                writer.Write(jsonResponse);
                writer.Flush();
            }

            context.Response.Body.Position = 0; // Set to zero for tests

            return context.Response;
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

            throw new NotSupportedException($"Unsupported API path: {path}");
        }

        /// <summary>
        /// Routes requests to the EventController based on the HTTP method and path.
        /// </summary>
        /// <param name="request">Https request.</param>
        /// <returns>Object.</returns>
        /// <exception cref="NotSupportedException">Returns exception if no API is hit.</exception>
        private async Task<object> RouteToEventController(HttpRequest request)
        {
            string method = request.Method.ToUpper();
            string path = request.Path.ToString().ToLower();

            if (method != "GET")
            {
                throw new NotSupportedException($"Not a GET request: {method}");
            }

            switch (path)
            {
                case "/api/events/earthquakes":
                    return await this.eventController.GetEarthquakeData();
                case "/api/events/volcanos":
                    return await this.eventController.GetVolcanoData();
                case "/api/events/wildfires":
                    return await this.eventController.GetWildfireData();
            }

            throw new NotSupportedException($"Unsupported event endpoint: {path}");
        }
    }
}