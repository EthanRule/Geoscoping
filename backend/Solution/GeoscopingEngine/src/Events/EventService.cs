namespace GeoscopingEngine.Src.Events
{
    using System;
    using System.Text.Json;
    using System.Threading.Tasks;

    /// <summary>
    /// Contains business logic for event operations and uses Event Factory and event Repository.
    /// </summary>
    public class EventService
    {
        private readonly EventRepository eventRepository;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventService"/> class.
        /// </summary>
        /// <param name="eventRepository">The event repository for data access.</param>
        public EventService(EventRepository eventRepository)
        {
            this.eventRepository = eventRepository ?? throw new ArgumentNullException(nameof(eventRepository));
        }

        /// <summary>
        /// Gets earthquake data asynchronously.
        /// </summary>
        /// <param name="period">Time period for earthquakes.</param>
        /// <param name="minMagnitude">Minimum magnitude.</param>
        /// <returns>JSON document with earthquake data.</returns>
        public async Task<JsonDocument> GetEarthquakeDataAsync(string period = "day", double minMagnitude = 2.5)
        {
            return await this.eventRepository.GetEarthquakeDataAsync(period, minMagnitude);
        }

        /// <summary>
        /// Gets volcano data asynchronously.
        /// </summary>
        /// <param name="period">Time period for volcanos.</param>
        /// <returns>JSON document with volcano data.</returns>
        public async Task<JsonDocument> GetVolcanoDataAsync(string period = "day")
        {
            return await this.eventRepository.GetVolcanoDataAsync(period);
        }

        /// <summary>
        /// Gets wildfire data asynchronously.
        /// </summary>
        /// <param name="period">Time period for wildfire.</param>
        /// <returns>JSON document with wildfire data.</returns>
        public async Task<JsonDocument> GetWildfireDataAsync(string period = "day")
        {
            return await this.eventRepository.GetWildfireDataAsync(period);
        }
    }
}
