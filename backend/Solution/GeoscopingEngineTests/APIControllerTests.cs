namespace GeoscopingEngineTests
{
    using System.Text.Json;
    using GeoscopingEngine.Src;
    using GeoscopingEngine.Src.Events;
    using Microsoft.AspNetCore.Http;
    using Microsoft.Extensions.Logging;
    using Xunit;

    /// <summary>
    /// Tests for the API Controller.
    /// </summary>
    public class APIControllerTests
    {
        private readonly APIController apiController;

        public APIControllerTests()
        {
            // Create concrete dependencies
            var httpClient = new HttpClient();
            var eventRepository = new EventRepository(httpClient);
            var eventService = new EventService(eventRepository);
            var eventController = new EventController(eventService);

            // Create a logger (can be null for simplicity in tests)
            var logger = LoggerFactory.Create(builder => builder.AddConsole()).CreateLogger<APIController>();

            // Create APIController with concrete dependencies
            this.apiController = new APIController(eventController, logger);
        }

        /// <summary>
        /// Tests that HandleRequest correctly routes to EventController and returns a response.
        /// </summary>
        [Fact]
        public async Task HandleRequest_ReturnsEarthquakeData()
        {
            // Arrange
            var mockHttpRequest = new DefaultHttpContext().Request;
            mockHttpRequest.Path = "/api/events/earthquakes";
            mockHttpRequest.Method = "GET";

            // Act
            var response = await this.apiController.HandleRequest(mockHttpRequest);

            // Assert
            Assert.NotNull(response);
            Assert.Equal(200, response.StatusCode);
            Assert.Equal("application/json", response.ContentType);

            // Read the response body
            response.Body.Seek(0, System.IO.SeekOrigin.Begin);
            using (var reader = new StreamReader(response.Body))
            {
                var responseBody = await reader.ReadToEndAsync();
                Assert.Contains("data", responseBody); // Check if the response contains "data"
            }
        }

        /// <summary>
        /// Tests that RouteToService correctly routes to the EventController for earthquake data.
        /// </summary>
        [Fact]
        public async Task RouteToService_RoutesToEventController()
        {
            // Arrange
            var mockHttpRequest = new DefaultHttpContext().Request;
            mockHttpRequest.Path = "/api/events/earthquakes";
            mockHttpRequest.Method = "GET";

            // Act
            var result = await this.apiController.RouteToService(mockHttpRequest);

            // Assert
            Assert.NotNull(result);
            Assert.IsType<JsonDocument>(result);
        }
    }
}
