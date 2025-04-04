namespace GeoscopingEngineTests
{
    using System;
    using GeoscopingEngine.Src.Events.EventTypes;
    using Xunit;

    /// <summary>
    /// Tests for earthquake event functionality.
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
    }
}