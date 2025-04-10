using GeoscopingEngine.Src.Events;
using System;
using System.Collections.Generic;
using System.Net;
using System.Net.Http;
using System.Text;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;
using Xunit;
using Xunit.Abstractions;

namespace GeoscopingEngineTests
{
    public class EventRepositoryTests
    {
        private readonly ITestOutputHelper _output;

        public EventRepositoryTests(ITestOutputHelper output)
        {
            _output = output;
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
            _output.WriteLine("Earthquake Test Data:");
            _output.WriteLine("============================");

            var features = result.RootElement.GetProperty("features");
            for (int i = 0; i < featuresCount; i++)
            {
                var properties = features[i].GetProperty("properties");
                string place = properties.GetProperty("place").GetString();
                double magnitude = properties.GetProperty("mag").GetDouble();
                long time = properties.GetProperty("time").GetInt64();
                var dateTime = DateTimeOffset.FromUnixTimeMilliseconds(time).LocalDateTime;

                _output.WriteLine($"{i + 1}. Magnitude {magnitude} earthquake at {place}");
                _output.WriteLine($"   Time: {dateTime}");
                _output.WriteLine($"   Coordinates: {string.Join(", ", features[i].GetProperty("geometry").GetProperty("coordinates").EnumerateArray().Select(x => x.GetDouble()))}");
                _output.WriteLine("");
            }
        }

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
            _output.WriteLine("Live Earthquake Data (Magnitude 4.5+, Past Day):");
            _output.WriteLine("===============================================");

            int count = features.GetArrayLength();
            _output.WriteLine($"Found {count} earthquakes");
            _output.WriteLine("");

            for (int i = 0; i < Math.Min(count, 5); i++)
            {
                var properties = features[i].GetProperty("properties");
                string place = properties.GetProperty("place").GetString() ?? "Unknown location";

                if (properties.TryGetProperty("mag", out var magElement))
                {
                    double magnitude = magElement.GetDouble();
                    _output.WriteLine($"{i + 1}. Magnitude {magnitude} at {place}");
                }
                else
                {
                    _output.WriteLine($"{i + 1}. Unknown magnitude at {place}");
                }

                if (properties.TryGetProperty("time", out var timeElement))
                {
                    long timestamp = timeElement.GetInt64();
                    var time = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).LocalDateTime;
                    _output.WriteLine($"   Time: {time}");
                }

                _output.WriteLine("");
            }
        }

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
            _output.WriteLine("Test completed - PrintEarthquakeDataAsync executed successfully");
        }
    }

    // Custom TestHttpMessageHandler to replace Moq
    public class TestHttpMessageHandler : HttpMessageHandler
    {
        private readonly string _response;
        private readonly HttpStatusCode _statusCode;

        public TestHttpMessageHandler(string response, HttpStatusCode statusCode = HttpStatusCode.OK)
        {
            _response = response;
            _statusCode = statusCode;
        }

        public int NumberOfCalls { get; private set; }

        protected override Task<HttpResponseMessage> SendAsync(HttpRequestMessage request, CancellationToken cancellationToken)
        {
            NumberOfCalls++;
            return Task.FromResult(new HttpResponseMessage
            {
                StatusCode = _statusCode,
                Content = new StringContent(_response, Encoding.UTF8, "application/json")
            });
        }
    }
}
