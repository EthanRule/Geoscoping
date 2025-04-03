import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-slate-800 text-white relative">
      <div className="container mx-auto px-4 py-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-lg font-semibold mb-4 text-teal-400">
            Geoscoping
          </h3>
          <p className="text-slate-300 mb-4">
            Worldwide natural disaster tracker. Enabling users to view and
            explore geographical events.
          </p>
          <p className="text-slate-400 text-sm">
            &copy; {new Date().getFullYear()} Geoscoping
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-teal-400">
            Navigation
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>
              <Link
                href="/map"
                className="hover:text-teal-300 transition-colors"
              >
                Interactive Map
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-teal-300 transition-colors"
              >
                Geological Events
              </Link>
            </li>
            <li>
              <Link
                href="/regions"
                className="hover:text-teal-300 transition-colors"
              >
                Regions
              </Link>
            </li>
            <li>
              <Link
                href="/about"
                className="hover:text-teal-300 transition-colors"
              >
                About
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold mb-4 text-teal-400">
            Resources
          </h3>
          <ul className="space-y-2 text-slate-300">
            <li>
              <Link
                href="/docs"
                className="hover:text-teal-300 transition-colors"
              >
                Documentation
              </Link>
            </li>
            <li>
              <a
                href="https://github.com/yourusername/geoscoping"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-teal-300 transition-colors"
              >
                GitHub Repository
              </a>
            </li>
            <li>
              <Link
                href="/sources"
                className="hover:text-teal-300 transition-colors"
              >
                Data Sources
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
