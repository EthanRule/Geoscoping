import Link from "next/link";

export default function Header() {
  return (
    <header className="bg-slate-900 text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <Link href="/" className="text-2xl font-bold text-teal-400">
            Geoscoping
          </Link>
          <span className="text-xs bg-teal-700 px-2 py-1 rounded text-white">
            Beta
          </span>
        </div>
        <nav>
          <ul className="flex space-x-6">
            <li>
              <Link
                href="/map"
                className="hover:text-teal-300 transition-colors"
              >
                Map
              </Link>
            </li>
            <li>
              <Link
                href="/events"
                className="hover:text-teal-300 transition-colors"
              >
                Events
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
        </nav>
      </div>
    </header>
  );
}
