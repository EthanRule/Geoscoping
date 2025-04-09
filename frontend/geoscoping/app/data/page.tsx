export default async function Data() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Data Attribution</h1>
      <p className="mb-6">
        Geoscoping utilizes data from the following trusted sources. We are
        grateful for their contributions to making geological and environmental
        data accessible. Geoscoping collects no geological data outside the data
        providers listed below.
      </p>
      <div className="mb-10">
        <div className="bg-[#050505] border border-[#1C448E] rounded-lg shadow-md p-6 mb-6">
          <h3 className="text-xl font-semibold mb-2 text-[#9EA677]">
            United States Geological Survey (USGS)
          </h3>
          <p className="mb-2">
            <strong>Website:</strong>{" "}
            <a
              href="https://www.usgs.gov"
              className="text-[#9EA677] hover:text-[#FEFFFE]"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.usgs.gov
            </a>
          </p>
          <p className="mb-2">
            <strong>Events:</strong> Earthquakes, Wildfires, and Volcanoes
          </p>
          <p className="mb-2">
            <strong>Data Frequency:</strong> Near Real-Time
          </p>
          <div className="bg-gray-900 border-l-4 border-[#1C448E] p-3 rounded">
            <p className="text-sm italic text-[#FEFFFE]/80">
              Data provided by the U.S. Geological Survey.
            </p>
          </div>
        </div>

        <div className="bg-[#050505] border border-[#1C448E] rounded-lg shadow-md p-6">
          <h3 className="text-xl font-semibold mb-2 text-[#9EA677]">
            National Centers for Environmental Information (NCEI)
          </h3>
          <p className="mb-2">
            <strong>Website:</strong>{" "}
            <a
              href="https://www.ncei.noaa.gov"
              className="text-[#9EA677] hover:text-[#FEFFFE]"
              target="_blank"
              rel="noopener noreferrer"
            >
              https://www.ncei.noaa.gov
            </a>
          </p>
          <p className="mb-2">
            <strong>Events:</strong> Tsunamis, Earthquakes, and Volcanoes
          </p>
          <p className="mb-2">
            <strong>Data Frequency:</strong> Historical and Real-Time
          </p>
          <div className="bg-gray-900 border-l-4 border-[#693A12] p-3 rounded">
            <p className="text-sm italic text-[#FEFFFE]/80">
              Data provided by NOAA National Centers for Environmental
              Information (NCEI).
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
