//-----------------------------------------------------------------------
// <copyright file="EarthquakeEvent.cs" company="Geoscoping">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace GeoscopingEngine.Src.Events.EventTypes
{
    using System;

    /// <summary>
    /// Represents an earthquake event in the system.
    /// </summary>
    public class EarthquakeEvent : Event
    {
        private double magnitude;
        private string magnitudeType;
        private int depth;
        private string faultType;
        private bool tsunamiGenerated;

        /// <summary>
        /// Initializes a new instance of the <see cref="EarthquakeEvent"/> class.
        /// </summary>
        /// <param name="name">The name of the earthquake event.</param>
        /// <param name="description">The description of the earthquake event.</param>
        /// <param name="startDate">The start date/time of the event.</param>
        /// <param name="endDate">The end date/time of the event.</param>
        /// <param name="severity">The severity level of the event.</param>
        /// <param name="magnitude">The magnitude of the earthquake.</param>
        /// <param name="magnitudeType">The type of magnitude measurement used.</param>
        /// <param name="depth">The depth of the earthquake in kilometers.</param>
        /// <param name="faultType">The type of fault that caused the earthquake.</param>
        /// <param name="tsunamiGenerated">Whether the earthquake generated a tsunami.</param>
        public EarthquakeEvent(
            string name,
            string description,
            DateTime startDate,
            DateTime endDate,
            int severity,
            double magnitude,
            string magnitudeType,
            int depth,
            string faultType,
            bool tsunamiGenerated)
            : base(name, description, startDate, endDate, severity)
        {
            this.magnitude = magnitude;
            this.magnitudeType = magnitudeType ?? throw new ArgumentNullException(nameof(magnitudeType));
            this.depth = depth;
            this.faultType = faultType ?? throw new ArgumentNullException(nameof(faultType));
            this.tsunamiGenerated = tsunamiGenerated;
        }

        /// <summary>
        /// Gets or sets the magnitude of the earthquake.
        /// </summary>
        public double Magnitude
        {
            get => this.magnitude;
            set => this.magnitude = value;
        }

        /// <summary>
        /// Gets or sets the type of magnitude measurement used (e.g., "Richter", "Moment", "Surface Wave").
        /// </summary>
        public string MagnitudeType
        {
            get => this.magnitudeType;
            set => this.magnitudeType = value;
        }

        /// <summary>
        /// Gets or sets the depth of the earthquake in kilometers.
        /// </summary>
        public int Depth
        {
            get => this.depth;
            set => this.depth = value;
        }

        /// <summary>
        /// Gets or sets the type of fault that caused the earthquake (e.g., "Strike-slip", "Normal", "Reverse").
        /// </summary>
        public string FaultType
        {
            get => this.faultType;
            set => this.faultType = value;
        }

        /// <summary>
        /// Gets or sets a value indicating whether the earthquake generated a tsunami.
        /// </summary>
        public bool TsunamiGenerated
        {
            get => this.tsunamiGenerated;
            set => this.tsunamiGenerated = value;
        }

        /// <summary>
        /// Contains earthquake-specific details.
        /// </summary>
        public record EarthquakeDetails(
            double magnitude,
            string magnitudeType,
            int depth,
            string faultType,
            bool tsunamiGenerated);

        /// <summary>
        /// Gets earthquake-specific details including magnitude information.
        /// </summary>
        /// <returns>A record containing earthquake details.</returns>
        public EarthquakeDetails GetEarthquakeDetails()
        {
            return new EarthquakeDetails(
                this.Magnitude,
                this.MagnitudeType,
                this.Depth,
                this.FaultType,
                this.TsunamiGenerated);
        }
    }
}
