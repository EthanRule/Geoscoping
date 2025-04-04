//-----------------------------------------------------------------------
// <copyright file="WildfireEvent.cs" company="Geoscoping">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace GeoscopingEngine.Src.Events.EventTypes
{
    using System;

    /// <summary>
    /// Represents a wildfire event in the system.
    /// </summary>
    public class WildfireEvent : Event
    {
        private double areaBurned;
        private string areaUnit;
        private string cause;
        private int containmentPercent;
        private string vegetationType;

        /// <summary>
        /// Initializes a new instance of the <see cref="WildfireEvent"/> class.
        /// </summary>
        /// <param name="name">The name of the wildfire event.</param>
        /// <param name="description">The description of the wildfire event.</param>
        /// <param name="startDate">The start date/time of the event.</param>
        /// <param name="endDate">The end date/time of the event.</param>
        /// <param name="severity">The severity level of the event.</param>
        /// <param name="areaBurned">The area burned by the wildfire.</param>
        /// <param name="areaUnit">The unit of measurement for the burned area (e.g., "acres", "hectares", "km²").</param>
        /// <param name="cause">The cause of the wildfire (e.g., "Lightning", "Human", "Powerlines").</param>
        /// <param name="containmentPercent">The percentage of the fire that has been contained (0-100).</param>
        /// <param name="vegetationType">The primary type of vegetation burned (e.g., "Forest", "Grassland", "Shrubland").</param>
        public WildfireEvent(
            string name,
            string description,
            DateTime startDate,
            DateTime endDate,
            int severity,
            double areaBurned,
            string areaUnit,
            string cause,
            int containmentPercent,
            string vegetationType)
            : base(name, description, startDate, endDate, severity)
        {
            this.areaBurned = areaBurned;
            this.areaUnit = areaUnit ?? throw new ArgumentNullException(nameof(areaUnit));
            this.cause = cause ?? throw new ArgumentNullException(nameof(cause));
            this.containmentPercent = Math.Clamp(containmentPercent, 0, 100);
            this.vegetationType = vegetationType ?? throw new ArgumentNullException(nameof(vegetationType));
        }

        /// <summary>
        /// Gets or sets the area burned by the wildfire.
        /// </summary>
        public double AreaBurned
        {
            get => this.areaBurned;
            set => this.areaBurned = value;
        }

        /// <summary>
        /// Gets or sets the unit of measurement for the burned area (e.g., "acres", "hectares", "km²").
        /// </summary>
        public string AreaUnit
        {
            get => this.areaUnit;
            set => this.areaUnit = value ?? throw new ArgumentNullException(nameof(value));
        }

        /// <summary>
        /// Gets or sets the cause of the wildfire (e.g., "Lightning", "Human", "Powerlines").
        /// </summary>
        public string Cause
        {
            get => this.cause;
            set => this.cause = value ?? throw new ArgumentNullException(nameof(value));
        }

        /// <summary>
        /// Gets or sets the percentage of the fire that has been contained (0-100).
        /// </summary>
        public int ContainmentPercent
        {
            get => this.containmentPercent;
            set => this.containmentPercent = Math.Clamp(value, 0, 100);
        }

        /// <summary>
        /// Gets or sets the primary type of vegetation burned (e.g., "Forest", "Grassland", "Shrubland").
        /// </summary>
        public string VegetationType
        {
            get => this.vegetationType;
            set => this.vegetationType = value ?? throw new ArgumentNullException(nameof(value));
        }

        /// <summary>
        /// Contains wildfire-specific details.
        /// </summary>
        public record WildfireDetails(
            double areaBurned,
            string areaUnit,
            string cause,
            int containmentPercent,
            string vegetationType);

        /// <summary>
        /// Gets wildfire-specific details.
        /// </summary>
        /// <returns>A record containing wildfire details.</returns>
        public WildfireDetails GetWildfireDetails()
        {
            return new WildfireDetails(
                this.AreaBurned,
                this.AreaUnit,
                this.Cause,
                this.ContainmentPercent,
                this.VegetationType);
        }
    }
}
