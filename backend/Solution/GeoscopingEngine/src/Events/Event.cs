//-----------------------------------------------------------------------
// <copyright file="Event.cs" company="Geoscoping">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace GeoscopingEngine.Src.Events
{
    /// <summary>
    /// Event base class.
    /// </summary>
    internal abstract class Event
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

        // public Regions GetAssociatedRegions()

        // public Sources GetAssociatedSources()
    }
}
