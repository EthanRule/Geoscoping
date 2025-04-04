//-----------------------------------------------------------------------
// <copyright file="VolcanoEvent.cs" company="Geoscoping">
// Copyright (c) PlaceholderCompany. All rights reserved.
// </copyright>
//-----------------------------------------------------------------------

namespace GeoscopingEngine.Src.Events.EventTypes
{
    using System;

    /// <summary>
    /// Represents a volcanic eruption event in the system.
    /// </summary>
    public class VolcanoEvent : Event
    {
        private string volcanoType;
        private int vei; // Volcanic Explosivity Index
        private double magmaComposition;
        private int eruptionHeight;
        private bool tsunamiGenerated;

        /// <summary>
        /// Initializes a new instance of the <see cref="VolcanoEvent"/> class.
        /// </summary>
        /// <param name="name">The name of the volcano event.</param>
        /// <param name="description">The description of the volcano event.</param>
        /// <param name="startDate">The start date/time of the event.</param>
        /// <param name="endDate">The end date/time of the event.</param>
        /// <param name="severity">The severity level of the event.</param>
        /// <param name="volcanoType">The type of volcano (e.g., "Shield", "Stratovolcano", "Caldera").</param>
        /// <param name="vei">The Volcanic Explosivity Index (0-8 scale).</param>
        /// <param name="magmaComposition">The silica content of the magma as a percentage.</param>
        /// <param name="eruptionHeight">The height of the eruption column in meters.</param>
        /// <param name="tsunamiGenerated">Whether the eruption generated a tsunami.</param>
        public VolcanoEvent(
            string name,
            string description,
            DateTime startDate,
            DateTime endDate,
            int severity,
            string volcanoType,
            int vei,
            double magmaComposition,
            int eruptionHeight,
            bool tsunamiGenerated)
            : base(name, description, startDate, endDate, severity)
        {
            this.volcanoType = volcanoType;
            this.vei = vei;
            this.magmaComposition = magmaComposition;
            this.eruptionHeight = eruptionHeight;
            this.tsunamiGenerated = tsunamiGenerated;
        }

        /// <summary>
        /// Gets or sets the type of volcano.
        /// </summary>
        public string VolcanoType
        {
            get => this.volcanoType;
            set => this.volcanoType = value;
        }

        /// <summary>
        /// Gets or sets the Volcanic Explosivity Index (0-8 scale).
        /// </summary>
        public int VEI
        {
            get => this.vei;
            set => this.vei = value;
        }

        /// <summary>
        /// Gets or sets the silica content of the magma as a percentage.
        /// </summary>
        public double MagmaComposition
        {
            get => this.magmaComposition;
            set => this.magmaComposition = value;
        }

        /// <summary>
        /// Gets or sets the height of the eruption column in meters.
        /// </summary>
        public int EruptionHeight
        {
            get => this.eruptionHeight;
            set => this.eruptionHeight = value;
        }

        /// <summary>
        /// Gets or sets a value indicating whether the eruption generated a tsunami.
        /// </summary>
        public bool TsunamiGenerated
        {
            get => this.tsunamiGenerated;
            set => this.tsunamiGenerated = value;
        }

        /// <summary>
        /// Contains volcano-specific details.
        /// </summary>
        public record VolcanoDetails(
            string volcanoType,
            int vEI,
            double magmaComposition,
            int eruptionHeight,
            bool tsunamiGenerated);

        /// <summary>
        /// Gets volcano-specific details.
        /// </summary>
        /// <returns>A record containing volcano details.</returns>
        public VolcanoDetails GetVolcanoDetails()
        {
            return new VolcanoDetails(
                this.VolcanoType,
                this.VEI,
                this.MagmaComposition,
                this.EruptionHeight,
                this.TsunamiGenerated);
        }
    }
}
