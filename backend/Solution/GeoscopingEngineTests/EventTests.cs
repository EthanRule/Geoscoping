namespace GeoscopingEngineTests
{
    using System;
    using GeoscopingEngine.Src.Events.EventTypes;
    using Xunit;

    /// <summary>
    /// Tests for various event types functionality.
    /// </summary>
    public class EventTests
    {
        /// <summary>
        /// Tests the creation and property values of an EarthquakeEvent.
        /// </summary>
        [Fact]
        public void TestEarthquakeEventCreation()
        {
            // Arrange
            string name = "Tohoku Earthquake";
            string description = "Major earthquake off the coast of Japan";
            DateTime startDate = new DateTime(2011, 3, 11, 14, 46, 0, DateTimeKind.Utc);
            DateTime endDate = new DateTime(2011, 3, 11, 15, 30, 0, DateTimeKind.Utc);
            int severity = 9;
            double magnitude = 9.1;
            string magnitudeType = "Moment";
            int depth = 29;
            string faultType = "Megathrust";
            bool tsunamiGenerated = true;

            // Act
            var earthquake = new EarthquakeEvent(
                name,
                description,
                startDate,
                endDate,
                severity,
                magnitude,
                magnitudeType,
                depth,
                faultType,
                tsunamiGenerated);

            // Assert - Test base class properties
            Assert.Equal(name, earthquake.Name);
            Assert.Equal(description, earthquake.Description);
            Assert.Equal(startDate, earthquake.StartDate);
            Assert.Equal(endDate, earthquake.EndDate);
            Assert.Equal(severity, earthquake.Severity);

            // Assert - Test earthquake-specific properties
            Assert.Equal(magnitude, earthquake.Magnitude);
            Assert.Equal(magnitudeType, earthquake.MagnitudeType);
            Assert.Equal(depth, earthquake.Depth);
            Assert.Equal(faultType, earthquake.FaultType);
            Assert.Equal(tsunamiGenerated, earthquake.TsunamiGenerated);
        }

        /// <summary>
        /// Tests the GetEarthquakeDetails method of the EarthquakeEvent class.
        /// </summary>
        [Fact]
        public void TestGetEarthquakeDetails()
        {
            // Arrange
            var earthquake = new EarthquakeEvent(
                "Test Earthquake",
                "Test description",
                DateTime.UtcNow,
                DateTime.UtcNow.AddHours(1),
                7,
                6.5,
                "Richter",
                15,
                "Strike-slip",
                false);

            // Act
            var details = earthquake.GetEarthquakeDetails();

            // Assert
            Assert.Equal(6.5, details.magnitude);
            Assert.Equal("Richter", details.magnitudeType);
            Assert.Equal(15, details.depth);
            Assert.Equal("Strike-slip", details.faultType);
            Assert.False(details.tsunamiGenerated);
        }

        /// <summary>
        /// Tests the creation and property values of a VolcanoEvent.
        /// </summary>
        [Fact]
        public void TestVolcanoEventCreation()
        {
            // Arrange
            string name = "Mount St. Helens Eruption";
            string description = "Major volcanic eruption in Washington state";
            DateTime startDate = new DateTime(1980, 5, 18, 8, 32, 0, DateTimeKind.Utc);
            DateTime endDate = new DateTime(1980, 5, 18, 17, 0, 0, DateTimeKind.Utc);
            int severity = 8;
            string volcanoType = "Stratovolcano";
            int vei = 5;
            double magmaComposition = 63.5; // Percentage of silica
            int eruptionHeight = 24000; // Height in meters
            bool tsunamiGenerated = false;

            // Act
            var volcano = new VolcanoEvent(
                name,
                description,
                startDate,
                endDate,
                severity,
                volcanoType,
                vei,
                magmaComposition,
                eruptionHeight,
                tsunamiGenerated);

            // Assert - Test base class properties
            Assert.Equal(name, volcano.Name);
            Assert.Equal(description, volcano.Description);
            Assert.Equal(startDate, volcano.StartDate);
            Assert.Equal(endDate, volcano.EndDate);
            Assert.Equal(severity, volcano.Severity);

            // Assert - Test volcano-specific properties
            Assert.Equal(volcanoType, volcano.VolcanoType);
            Assert.Equal(vei, volcano.VEI);
            Assert.Equal(magmaComposition, volcano.MagmaComposition);
            Assert.Equal(eruptionHeight, volcano.EruptionHeight);
            Assert.Equal(tsunamiGenerated, volcano.TsunamiGenerated);
        }

        /// <summary>
        /// Tests the GetVolcanoDetails method of the VolcanoEvent class.
        /// </summary>
        [Fact]
        public void TestGetVolcanoDetails()
        {
            // Arrange
            var volcano = new VolcanoEvent(
                "Krakatoa Eruption",
                "Devastating eruption in Indonesia",
                new DateTime(1883, 8, 26, 0, 0, 0, DateTimeKind.Utc),
                new DateTime(1883, 8, 27, 0, 0, 0, DateTimeKind.Utc),
                10,
                "Caldera",
                6,
                70.2,
                36000,
                true);

            // Act
            var details = volcano.GetVolcanoDetails();

            // Assert
            Assert.Equal("Caldera", details.volcanoType);
            Assert.Equal(6, details.vEI);
            Assert.Equal(70.2, details.magmaComposition);
            Assert.Equal(36000, details.eruptionHeight);
            Assert.True(details.tsunamiGenerated);
        }

        /// <summary>
        /// Tests the creation and property values of a WildfireEvent.
        /// </summary>
        [Fact]
        public void TestWildfireEventCreation()
        {
            // Arrange
            string name = "Camp Fire";
            string description = "Destructive wildfire in Northern California";
            DateTime startDate = new DateTime(2018, 11, 8, 6, 33, 0, DateTimeKind.Utc);
            DateTime endDate = new DateTime(2018, 11, 25, 0, 0, 0, DateTimeKind.Utc);
            int severity = 9;
            double areaBurned = 153336;
            string areaUnit = "acres";
            string cause = "Electrical Transmission";
            int containmentPercent = 100;
            string vegetationType = "Forest/Urban Interface";

            // Act
            var wildfire = new WildfireEvent(
                name,
                description,
                startDate,
                endDate,
                severity,
                areaBurned,
                areaUnit,
                cause,
                containmentPercent,
                vegetationType);

            // Assert - Test base class properties
            Assert.Equal(name, wildfire.Name);
            Assert.Equal(description, wildfire.Description);
            Assert.Equal(startDate, wildfire.StartDate);
            Assert.Equal(endDate, wildfire.EndDate);
            Assert.Equal(severity, wildfire.Severity);

            // Assert - Test wildfire-specific properties
            Assert.Equal(areaBurned, wildfire.AreaBurned);
            Assert.Equal(areaUnit, wildfire.AreaUnit);
            Assert.Equal(cause, wildfire.Cause);
            Assert.Equal(containmentPercent, wildfire.ContainmentPercent);
            Assert.Equal(vegetationType, wildfire.VegetationType);
        }

        /// <summary>
        /// Tests the GetWildfireDetails method of the WildfireEvent class.
        /// </summary>
        [Fact]
        public void TestGetWildfireDetails()
        {
            // Arrange
            var wildfire = new WildfireEvent(
                "Dixie Fire",
                "Second-largest wildfire in California history",
                new DateTime(2021, 7, 13, 0, 0, 0, DateTimeKind.Utc),
                new DateTime(2021, 10, 25, 0, 0, 0, DateTimeKind.Utc),
                9,
                963309,
                "acres",
                "Power Lines",
                100,
                "Forest");

            // Act
            var details = wildfire.GetWildfireDetails();

            // Assert
            Assert.Equal(963309, details.areaBurned);
            Assert.Equal("acres", details.areaUnit);
            Assert.Equal("Power Lines", details.cause);
            Assert.Equal(100, details.containmentPercent);
            Assert.Equal("Forest", details.vegetationType);
        }
    }
}