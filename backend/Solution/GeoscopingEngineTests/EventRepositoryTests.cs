namespace GeoscopingEngineTests
{
    using System;
    using System.Net;
    using System.Net.Http;
    using System.Text;
    using System.Threading;
    using System.Threading.Tasks;
    using GeoscopingEngine.Src.Events;
    using Xunit;
    using Xunit.Abstractions;

    /// <summary>
    /// Event Repository tests.
    /// </summary>
    public class EventRepositoryTests
    {
        private readonly ITestOutputHelper testOutput;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventRepositoryTests"/> class.
        /// </summary>
        /// <param name="output">output.</param>
        public EventRepositoryTests(ITestOutputHelper output)
        {
            this.testOutput = output;
        }

        [Fact]
        public async Task GetEarthquakeDataAsync_ReturnsValidData()
        {
            // Arrange
            string sampleResponse = @"{
                ""type"": ""FeatureCollection"",
                ""metadata"": {
                    ""generated"": 1684956956000,
                    ""url"": ""https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"",
                    ""title"": ""USGS Magnitude 2.5+ Earthquakes, Past Day"",
                    ""status"": 200,
                    ""api"": ""1.10.3"",
                    ""count"": 2
                },
                ""features"": [
                    {
                        ""type"": ""Feature"",
                        ""properties"": {
                            ""mag"": 3.4,
                            ""place"": ""20 km NW of Los Angeles, CA"",
                            ""time"": 1684956000000,
                            ""updated"": 1684956200000,
                            ""tz"": null,
                            ""url"": ""https://earthquake.usgs.gov/earthquakes/eventpage/us7000jl0q"",
                            ""detail"": ""https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000jl0q.geojson"",
                            ""felt"": null,
                            ""cdi"": null,
                            ""mmi"": null,
                            ""alert"": null,
                            ""status"": ""reviewed"",
                            ""tsunami"": 0,
                            ""sig"": 178,
                            ""net"": ""us"",
                            ""code"": ""7000jl0q"",
                            ""ids"": """",
                            ""sources"": """",
                            ""types"": """",
                            ""nst"": null,
                            ""dmin"": null,
                            ""rms"": 0.57,
                            ""gap"": null,
                            ""magType"": ""mb"",
                            ""type"": ""earthquake"",
                            ""title"": ""M 3.4 - 20 km NW of Los Angeles, CA""
                        },
                        ""geometry"": {
                            ""type"": ""Point"",
                            ""coordinates"": [-118.4, 34.2, 10]
                        },
                        ""id"": ""us7000jl0q""
                    }
                ]
            }";

            var httpClient = new HttpClient(new TestHttpMessageHandler(sampleResponse));
            var eventRepository = new EventRepository(httpClient);

            // Act
            var result = await eventRepository.GetEarthquakeDataAsync();

            // Assert
            Assert.NotNull(result);
            var featuresCount = result.RootElement.GetProperty("features").GetArrayLength();
            Assert.Equal(1, featuresCount);

            // Print some data from the response
            this.testOutput.WriteLine("Earthquake Test Data:");
            this.testOutput.WriteLine("============================");

            var features = result.RootElement.GetProperty("features");
            for (int i = 0; i < featuresCount; i++)
            {
                var properties = features[i].GetProperty("properties");
                string place = properties.GetProperty("place").GetString();
                double magnitude = properties.GetProperty("mag").GetDouble();
                long time = properties.GetProperty("time").GetInt64();
                var dateTime = DateTimeOffset.FromUnixTimeMilliseconds(time).LocalDateTime;

                this.testOutput.WriteLine($"{i + 1}. Magnitude {magnitude} earthquake at {place}");
                this.testOutput.WriteLine($"   Time: {dateTime}");
                this.testOutput.WriteLine($"   Coordinates: {string.Join(", ", features[i].GetProperty("geometry").GetProperty("coordinates").EnumerateArray().Select(x => x.GetDouble()))}");
                this.testOutput.WriteLine(string.Empty);
            }
        }

        /// <summary>
        /// Tests the GetEarthquakeDataAsync method with live data.
        /// </summary>
        /// <returns>Result.</returns>
        [Fact]
        public async Task GetEarthquakeDataAsync_WithLiveData_ReturnsResults()
        {
            // Arrange - use real HTTP client for this test
            var httpClient = new HttpClient();
            var repository = new EventRepository(httpClient);

            // Act
            var result = await repository.GetEarthquakeDataAsync("day", 4.5);

            // Assert
            Assert.NotNull(result);
            Assert.True(result.RootElement.TryGetProperty("features", out var features));

            // Print earthquake data
            this.testOutput.WriteLine("Live Earthquake Data (Magnitude 4.5+, Past Day):");
            this.testOutput.WriteLine("===============================================");

            int count = features.GetArrayLength();
            this.testOutput.WriteLine($"Found {count} earthquakes");
            this.testOutput.WriteLine(string.Empty);

            for (int i = 0; i < Math.Min(count, 5); i++)
            {
                var properties = features[i].GetProperty("properties");
                string place = properties.GetProperty("place").GetString() ?? "Unknown location";

                if (properties.TryGetProperty("mag", out var magElement))
                {
                    double magnitude = magElement.GetDouble();
                    this.testOutput.WriteLine($"{i + 1}. Magnitude {magnitude} at {place}");
                }
                else
                {
                    this.testOutput.WriteLine($"{i + 1}. Unknown magnitude at {place}");
                }

                if (properties.TryGetProperty("time", out var timeElement))
                {
                    long timestamp = timeElement.GetInt64();
                    var time = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).LocalDateTime;
                    this.testOutput.WriteLine($"   Time: {time}");
                }

                this.testOutput.WriteLine(string.Empty);
            }
        }

        /// <summary>
        /// Tests the PrintEarthquakeDataAsync method.
        /// </summary>
        /// <returns>result.</returns>
        [Fact]
        public async Task PrintEarthquakeDataAsync_PrintsToConsole()
        {
            // Arrange
            string sampleResponse = @"{
                ""type"": ""FeatureCollection"",
                ""metadata"": {
                    ""generated"": 1684956956000,
                    ""url"": ""https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_day.geojson"",
                    ""title"": ""USGS Magnitude 2.5+ Earthquakes, Past Day"",
                    ""status"": 200,
                    ""api"": ""1.10.3"",
                    ""count"": 1
                },
                ""features"": [
                    {
                        ""type"": ""Feature"",
                        ""properties"": {
                            ""mag"": 5.2,
                            ""place"": ""45 km SSW of Tokyo, Japan"",
                            ""time"": 1684956000000,
                            ""updated"": 1684956200000,
                            ""tz"": null,
                            ""url"": ""https://earthquake.usgs.gov/earthquakes/eventpage/us7000jl0q"",
                            ""detail"": ""https://earthquake.usgs.gov/earthquakes/feed/v1.0/detail/us7000jl0q.geojson"",
                            ""felt"": null,
                            ""cdi"": null,
                            ""mmi"": null,
                            ""alert"": null,
                            ""status"": ""reviewed"",
                            ""tsunami"": 0,
                            ""sig"": 178,
                            ""net"": ""us"",
                            ""code"": ""7000jl0q"",
                            ""ids"": """",
                            ""sources"": """",
                            ""types"": """",
                            ""nst"": null,
                            ""dmin"": null,
                            ""rms"": 0.57,
                            ""gap"": null,
                            ""magType"": ""mb"",
                            ""type"": ""earthquake"",
                            ""title"": ""M 5.2 - 45 km SSW of Tokyo, Japan""
                        },
                        ""geometry"": {
                            ""type"": ""Point"",
                            ""coordinates"": [139.6, 35.4, 10]
                        },
                        ""id"": ""us7000jl0q""
                    }
                ]
            }";

            var httpClient = new HttpClient(new TestHttpMessageHandler(sampleResponse));
            var eventRepository = new EventRepository(httpClient);

            // Act - this will print earthquake data
            await eventRepository.PrintEarthquakeDataAsync();

            // Assert
            // No specific assertions - this test is to verify that the method
            // runs without exceptions and prints data
            this.testOutput.WriteLine("Test completed - PrintEarthquakeDataAsync executed successfully");
        }

        [Fact]
        public async Task GetWildfireDataAsync_ReturnsValidData()
        {
            // Arrange
            string sampleResponse = @"{
                ""type"": ""FeatureCollection"",
                ""metadata"": {
                    ""generated"": 1684956956000,
                    ""url"": ""https://wildfire.usgs.gov/wildfires/feed/v1.0/summary/2.5_day.geojson"",
                    ""title"": ""USGS Wildfires, Past Day"",
                    ""status"": 200,
                    ""api"": ""1.10.3"",
                    ""count"": 1
                },
                ""features"": [
                    {
                        ""type"": ""Feature"",
                        ""properties"": {
                            ""name"": ""Wildfire near Los Angeles"",
                            ""size"": 1200,
                            ""time"": 1684956000000,
                            ""updated"": 1684956200000,
                            ""status"": ""active"",
                            ""type"": ""wildfire""
                        },
                        ""geometry"": {
                            ""type"": ""Point"",
                            ""coordinates"": [-118.4, 34.2]
                        },
                        ""id"": ""wf12345""
                    }
                ]
            }";

            var httpClient = new HttpClient(new TestHttpMessageHandler(sampleResponse));
            var eventRepository = new EventRepository(httpClient);

            // Act
            var result = await eventRepository.GetWildfireDataAsync();

            // Assert
            Assert.NotNull(result);
            var featuresCount = result.RootElement.GetProperty("features").GetArrayLength();
            Assert.Equal(1, featuresCount);

            // Print some data from the response
            this.testOutput.WriteLine("Wildfire Test Data:");
            this.testOutput.WriteLine("============================");

            var features = result.RootElement.GetProperty("features");
            for (int i = 0; i < featuresCount; i++)
            {
                var properties = features[i].GetProperty("properties");
                string name = properties.GetProperty("name").GetString();
                double size = properties.GetProperty("size").GetDouble();
                long time = properties.GetProperty("time").GetInt64();
                var dateTime = DateTimeOffset.FromUnixTimeMilliseconds(time).LocalDateTime;

                this.testOutput.WriteLine($"{i + 1}. Wildfire: {name}");
                this.testOutput.WriteLine($"   Size: {size} acres");
                this.testOutput.WriteLine($"   Time: {dateTime}");
                this.testOutput.WriteLine($"   Coordinates: {string.Join(", ", features[i].GetProperty("geometry").GetProperty("coordinates").EnumerateArray().Select(x => x.GetDouble()))}");
                this.testOutput.WriteLine(string.Empty);
            }
        }

        [Fact]
        public async Task GetVolcanoDataAsync_ReturnsValidData()
        {
            // Arrange
            string sampleResponse = @"{
                ""type"": ""FeatureCollection"",
                ""metadata"": {
                    ""generated"": 1684956956000,
                    ""url"": ""https://volcanoes.usgs.gov/vhp/feeds/volcanoes.geojson"",
                    ""title"": ""USGS Volcanoes, Past Day"",
                    ""status"": 200,
                    ""api"": ""1.10.3"",
                    ""count"": 1
                },
                ""features"": [
                    {
                        ""type"": ""Feature"",
                        ""properties"": {
                            ""name"": ""Mount St. Helens"",
                            ""elevation"": 2549,
                            ""time"": 1684956000000,
                            ""updated"": 1684956200000,
                            ""status"": ""active"",
                            ""type"": ""volcano""
                        },
                        ""geometry"": {
                            ""type"": ""Point"",
                            ""coordinates"": [-122.18, 46.2]
                        },
                        ""id"": ""vol12345""
                    }
                ]
            }";

            var httpClient = new HttpClient(new TestHttpMessageHandler(sampleResponse));
            var eventRepository = new EventRepository(httpClient);

            // Act
            var result = await eventRepository.GetVolcanoDataAsync();

            // Assert
            Assert.NotNull(result);
            var featuresCount = result.RootElement.GetProperty("features").GetArrayLength();
            Assert.Equal(1, featuresCount);

            // Print some data from the response
            this.testOutput.WriteLine("Volcano Test Data:");
            this.testOutput.WriteLine("============================");

            var features = result.RootElement.GetProperty("features");
            for (int i = 0; i < featuresCount; i++)
            {
                var properties = features[i].GetProperty("properties");
                string name = properties.GetProperty("name").GetString();
                double elevation = properties.GetProperty("elevation").GetDouble();
                long time = properties.GetProperty("time").GetInt64();
                var dateTime = DateTimeOffset.FromUnixTimeMilliseconds(time).LocalDateTime;

                this.testOutput.WriteLine($"{i + 1}. Volcano: {name}");
                this.testOutput.WriteLine($"   Elevation: {elevation} meters");
                this.testOutput.WriteLine($"   Time: {dateTime}");
                this.testOutput.WriteLine($"   Coordinates: {string.Join(", ", features[i].GetProperty("geometry").GetProperty("coordinates").EnumerateArray().Select(x => x.GetDouble()))}");
                this.testOutput.WriteLine(string.Empty);
            }
        }
    }

    /// <summary>
    /// Custom TestHttpMessageHandler to replace Moq.
    /// </summary>
    public class TestHttpMessageHandler : HttpMessageHandler
    {
        private readonly string httpResponse;
        private readonly HttpStatusCode httpStatusCode;

        public TestHttpMessageHandler(string response, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            this.httpResponse = response;
            this.httpStatusCode = statusCode;
        }

        /// <summary>
        /// Gets or sets the number of calls.
        /// </summary>
        public int NumberOfCalls { get; private set; }

        /// <summary>
        /// Sends the HTTP request.
        /// </summary>
        /// <param name="request">request.</param>
        /// <param name="cancellationToken">canceltoken.</param>
        /// <returns>http message.</returns>
        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            this.NumberOfCalls++;
            return Task.FromResult(new HttpResponseMessage
            {
                StatusCode = this.httpStatusCode,
                Content = new StringContent(this.httpResponse, Encoding.UTF8, "application/json"),
            });
        }
    }
}