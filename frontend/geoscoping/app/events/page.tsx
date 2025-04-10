import Image from "next/image";
export default async function Events() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Natural Event Types</h1>

      {/* Earthquake Section */}
      <div className="bg-[#050505] border border-[#1C448E] rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#9EA677] flex items-center gap-3">
          <span className="text-3xl">💢</span> Earthquakes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FEFFFE]/90">
              Metrics
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-[#9EA677]">Magnitude:</span> Measured on
                the Richter or Moment Magnitude scale
              </li>
              <li>
                <span className="text-[#9EA677]">Depth:</span> Measured in
                kilometers from the surface
              </li>
              <li>
                <span className="text-[#9EA677]">Fault Type:</span> Strike-slip,
                Normal, Reverse, or Subduction
              </li>
              <li>
                <span className="text-[#9EA677]">Tsunami Generation:</span>{" "}
                Whether the earthquake generated a tsunami
              </li>
              <li>
                <span className="text-[#9EA677]">Population Affected:</span>{" "}
                Estimated population in the affected region
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6 text-[#FEFFFE]/90">
              Severity Calculation
            </h3>
            <p className="mb-3">
              Earthquake severity (1-10 scale) is calculated using a weighted
              formula:
            </p>
            <div className="bg-gray-900 p-4 rounded">
              <code className="text-[#FEFFFE]/80">
                Severity = (0.5 × Magnitude) + (0.1 × Inverse Depth) + (0.2 ×
                Population Factor) + (0.2 × Tsunami Factor)
              </code>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                • Magnitude directly correlates with severity (5.0 = moderate,
                8.0+ = extreme)
              </li>
              <li>
                • Shallower earthquakes receive higher severity ratings due to
                increased surface impact
              </li>
              <li>
                • Tsunamis increase severity by 1-2 points depending on size
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/earthquake.png"
                alt="Earthquake damage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#050505]/40 flex items-end p-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Volcano Section */}
      <div className="bg-[#050505] border border-[#1C448E] rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#9EA677] flex items-center gap-3">
          <span className="text-3xl">🌋</span> Volcanoes
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FEFFFE]/90">
              Metrics
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-[#9EA677]">Volcano Type:</span> Shield,
                Stratovolcano, Caldera, etc.
              </li>
              <li>
                <span className="text-[#9EA677]">
                  VEI (Volcanic Explosivity Index):
                </span>{" "}
                Scale from 0-8
              </li>
              <li>
                <span className="text-[#9EA677]">Magma Composition:</span>{" "}
                Basaltic, Andesitic, Rhyolitic, etc.
              </li>
              <li>
                <span className="text-[#9EA677]">Eruption Column Height:</span>{" "}
                Measured in meters
              </li>
              <li>
                <span className="text-[#9EA677]">Tsunami Generated:</span>{" "}
                Whether the eruption caused a tsunami
              </li>
              <li>
                <span className="text-[#9EA677]">Ash Distribution:</span> Area
                covered by volcanic ash
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6 text-[#FEFFFE]/90">
              Severity Calculation
            </h3>
            <p className="mb-3">
              Volcano severity (1-10 scale) is calculated using a weighted
              formula:
            </p>
            <div className="bg-gray-900 p-4 rounded">
              <code className="text-[#FEFFFE]/80">
                Severity = (0.4 × VEI) + (0.2 × Eruption Height Factor) + (0.2 ×
                Population Factor) + (0.2 × Additional Hazards)
              </code>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                • VEI is heavily weighted (scale of 0-8, with 7+ being
                catastrophic)
              </li>
              <li>
                • Higher eruption columns spread ash further, increasing
                severity
              </li>
              <li>
                • Additional hazards include pyroclastic flows, lahars, and
                tsunamis
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/volcano.png"
                alt="Earthquake damage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#050505]/40 flex items-end p-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Wildfire Section */}
      <div className="bg-[#050505] border border-[#1C448E] rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-[#9EA677] flex items-center gap-3">
          <span className="text-3xl">🔥</span> Wildfires
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <h3 className="text-xl font-semibold mb-3 text-[#FEFFFE]/90">
              Metrics
            </h3>
            <ul className="space-y-3">
              <li>
                <span className="text-[#9EA677]">Area Burned:</span> Measured in
                acres, hectares, or km²
              </li>
              <li>
                <span className="text-[#9EA677]">Cause:</span> Lightning, Human
                activity, Power lines, etc.
              </li>
              <li>
                <span className="text-[#9EA677]">Containment:</span> Percentage
                of the fire's perimeter that has been contained
              </li>
              <li>
                <span className="text-[#9EA677]">Vegetation Type:</span> Forest,
                Grassland, Chaparral, etc.
              </li>
              <li>
                <span className="text-[#9EA677]">Weather Conditions:</span>{" "}
                Temperature, humidity, wind speed
              </li>
              <li>
                <span className="text-[#9EA677]">Structures Threatened:</span>{" "}
                Number of buildings at risk
              </li>
            </ul>

            <h3 className="text-xl font-semibold mb-3 mt-6 text-[#FEFFFE]/90">
              Severity Calculation
            </h3>
            <p className="mb-3">
              Wildfire severity (1-10 scale) is calculated using a weighted
              formula:
            </p>
            <div className="bg-gray-900 p-4 rounded">
              <code className="text-[#FEFFFE]/80">
                Severity = (0.3 × Area Factor) + (0.3 × Containment Inverse) +
                (0.2 × Population Risk) + (0.2 × Spread Rate)
              </code>
            </div>
            <ul className="mt-4 space-y-2 text-sm">
              <li>• Larger area burned directly increases severity</li>
              <li>• Lower containment percentage results in higher severity</li>
              <li>
                • Dry conditions and high winds significantly increase spread
                rate factor
              </li>
              <li>
                • Proximity to populated areas increases population risk factor
              </li>
            </ul>
          </div>

          <div className="flex flex-col justify-between">
            <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-lg overflow-hidden mb-4">
              <Image
                src="/images/wildfire.png"
                alt="Earthquake damage"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-[#050505]/40 flex items-end p-4"></div>
            </div>
          </div>
        </div>
      </div>

      {/* General Severity Information */}
      <div className="bg-[#050505] border border-[#1C448E]/30 rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-semibold mb-4 text-[#9EA677]">
          Understanding Severity Ratings
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-900 p-4 rounded">
            <div className="flex items-center mb-2">
              <span className="w-8 h-2 bg-[#9EA677] rounded-full mr-2"></span>
              <span className="text-[#FEFFFE]">Low Severity (1-3)</span>
            </div>
            <p className="text-sm text-[#FEFFFE]/70">
              Minimal impact on communities and environment. Local response
              usually sufficient. No significant casualties expected. Limited
              disruption to daily activities.
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <div className="flex items-center mb-2">
              <span className="w-8 h-2 bg-[#693A12] rounded-full mr-2"></span>
              <span className="text-[#FEFFFE]">Medium Severity (4-7)</span>
            </div>
            <p className="text-sm text-[#FEFFFE]/70">
              Moderate impact requiring regional response. Some casualties
              possible. Temporary evacuation may be necessary. Significant
              structural damage in limited areas.
            </p>
          </div>

          <div className="bg-gray-900 p-4 rounded">
            <div className="flex items-center mb-2">
              <span className="w-8 h-2 bg-[#1C448E] rounded-full mr-2"></span>
              <span className="text-[#FEFFFE]">High Severity (8-10)</span>
            </div>
            <p className="text-sm text-[#FEFFFE]/70">
              Severe impact requiring national or international response.
              Significant casualties likely. Extended evacuation requirements.
              Widespread structural damage and environmental impact.
            </p>
          </div>
        </div>

        <p className="mt-6 text-[#FEFFFE]/80 text-sm">
          Severity ratings are dynamic and may change as events evolve and more
          data becomes available. Our algorithms continuously update ratings
          based on the latest metrics, allowing for real-time assessment of
          changing conditions.
        </p>
      </div>
    </div>
  );
}
