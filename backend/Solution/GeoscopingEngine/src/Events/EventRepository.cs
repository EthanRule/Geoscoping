namespace GeoscopingEngine.Src.Events
{
    using System;
    using System.Net.Http;
    using System.Text.Json;
    using System.Threading.Tasks;

    /// <summary>
    /// Primary class for fetching data from third party APIs and the Database.
    /// </summary>
    public class EventRepository
    {
        private readonly HttpClient eventHttpClient;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventRepository"/> class.
        /// </summary>
        /// <param name="httpClient">http client.</param>
        /// <exception cref="ArgumentNullException">exception.</exception>
        public EventRepository(HttpClient httpClient)
        {
            this.eventHttpClient = httpClient ?? throw new ArgumentNullException(nameof(httpClient));
        }

        /// <summary>
        /// Fetches recent earthquake data from USGS API.
        /// </summary>
        /// <param name="period">Time period for earthquakes (hour, day, week, month).</param>
        /// <param name="minMagnitude">Minimum earthquake magnitude.</param>
        /// <returns>A JSON object containing earthquake data.</returns>
        public async Task<JsonDocument> GetEarthquakeDataAsync(string period = "day", double minMagnitude = 2.5)
        {
            // USGS Earthquake API endpoint
            // Documentation: https://earthquake.usgs.gov/fdsnws/event/1/
            string url = $"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/{minMagnitude}_{period}.geojson";

            try
            {
                var response = await this.eventHttpClient.GetAsync(url);
                response.EnsureSuccessStatusCode();

                var content = await response.Content.ReadAsStreamAsync();
                return await JsonDocument.ParseAsync(content);
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"Error fetching earthquake data: {ex.Message}");
                throw;
            }
        }

        /// <summary>
        /// Prints earthquake data to console.
        /// </summary>
        /// <param name="period">Time period for earthquakes (hour, day, week, month).</param>
        /// <param name="minMagnitude">Minimum earthquake magnitude.</param>
        /// <returns>Task.</returns>
        public async Task PrintEarthquakeDataAsync(string period = "day", double minMagnitude = 2.5)
        {
            try
            {
                var earthquakeData = await this.GetEarthquakeDataAsync(period, minMagnitude);

                Console.WriteLine($"USGS Earthquake Data ({minMagnitude}+ magnitude, past {period})");
                Console.WriteLine("=====================================================");

                var features = earthquakeData.RootElement.GetProperty("features");
                int count = features.GetArrayLength();

                Console.WriteLine($"Found {count} earthquakes");
                Console.WriteLine();

                for (int i = 0; i < Math.Min(count, 10); i++)
                {
                    var feature = features[i];
                    var properties = feature.GetProperty("properties");

                    string place = properties.GetProperty("place").GetString() ?? "Unknown location";
                    double magnitude = properties.GetProperty("mag").GetDouble();
                    long timestamp = properties.GetProperty("time").GetInt64();
                    var time = DateTimeOffset.FromUnixTimeMilliseconds(timestamp).LocalDateTime;

                    Console.WriteLine($"Magnitude {magnitude} at {place}");
                    Console.WriteLine($"Time: {time}");
                    Console.WriteLine();
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine($"Error printing earthquake data: {ex.Message}");
            }
        }
    }
}
