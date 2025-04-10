namespace GeoscopingEngine.Src.Events
{
    /// <summary>
    /// EventController serves as a bridge between the API and the underlying geoscoping engine.
    /// </summary>
    public class EventController
    {
        private readonly EventService eventService;

        /// <summary>
        /// Initializes a new instance of the <see cref="EventController"/> class.
        /// </summary>
        /// <param name="eventService">The event service for business logic.</param>
        public EventController(EventService eventService)
        {
            this.eventService = eventService ?? throw new ArgumentNullException(nameof(eventService));
        }
    }
}