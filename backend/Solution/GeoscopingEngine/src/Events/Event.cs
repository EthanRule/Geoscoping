//-----------------------------------------------------------------------
// <copyright file="Event.cs" company="Geoscoping">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace GeoscopingEngine.Src.Events
{
    /// <summary>
    /// Event base class. Making this class internal would be ideal, but for testing purposes it needs to be public.
    /// </summary>
    public abstract class Event
    {
        private long id = -1; // Default value to indicate an uninitialized state.
        private string name = string.Empty;
        private DateTime startDate;
        private DateTime endDate;
        private int severity;
        private string description = string.Empty;
        private DateTime createdAt;
        private DateTime updatedAt;

        /// <summary>
        /// Initializes a new instance of the <see cref="Event"/> class.
        /// </summary>
        /// <param name="name">The name of the event.</param>
        /// <param name="description">The description of the event.</param>
        /// <param name="startDate">The start date/time of the event.</param>
        /// <param name="endDate">The end date/time of the event.</param>
        /// <param name="severity">The severity level of the event (higher values indicate greater severity).</param>
        protected Event(string name, string description, DateTime startDate, DateTime endDate, int severity)
        {
            this.name = name;
            this.description = description;
            this.startDate = startDate;
            this.endDate = endDate;
            this.severity = severity;

            // Set creation/update timestamps to current time
            DateTime now = DateTime.UtcNow;
            this.createdAt = now;
            this.updatedAt = now;
        }

        /// <summary>
        /// Gets or sets the unique id for the event.
        /// </summary>
        public long Id
        {
            get => this.id;
            set => this.id = value;
        }

        /// <summary>
        /// Gets or sets event name.
        /// </summary>
        public string Name
        {
            get => this.name;
            set => this.name = value;
        }

        /// <summary>
        /// Gets or sets the start time of the event.
        /// </summary>
        public DateTime StartDate
        {
            get => this.startDate;
            set => this.startDate = value;
        }

        /// <summary>
        /// Gets or sets the end time of the event.
        /// </summary>
        public DateTime EndDate
        {
            get => this.endDate;
            set => this.endDate = value;
        }

        /// <summary>
        /// Gets or sets the severity of the event.
        /// </summary>
        public int Severity
        {
            get => this.severity;
            set => this.severity = value;
        }

        /// <summary>
        /// Gets or sets the description of the event.
        /// </summary>
        public string Description
        {
            get => this.description;
            set => this.description = value;
        }

        /// <summary>
        /// Gets or sets the date and time when the event was created.
        /// </summary>
        public DateTime CreatedAt
        {
            get => this.createdAt;
            set => this.createdAt = value;
        }

        /// <summary>
        /// Gets or sets the date and time when the event was last updated.
        /// </summary>
        public DateTime UpdatedAt
        {
            get => this.updatedAt;
            set => this.updatedAt = value;
        }

        /// <summary>
        /// Contains essential event information.
        /// </summary>
        public record EventDetails(long id, string name, DateTime startDate, DateTime endDate, int severity, string description);

        /// <summary>
        /// Returns an instance of <see cref="EventDetails"/> containing essential information about the event.
        /// </summary>
        /// <returns>Id, Name, StartDate, EndDate, Severity, and Description.</returns>
        public EventDetails GetEventDetails()
        {
            return new EventDetails(
                this.Id,
                this.Name,
                this.StartDate,
                this.EndDate,
                this.Severity,
                this.Description);
        }
    }
}
