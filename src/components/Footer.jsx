import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white text-gray-900 dark:border-gray-800 dark:bg-gray-900 dark:text-white">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          {/* BRAND */}
          <div>
            <Link
              to="/"
              className="text-2xl font-bold tracking-tight"
            >
              StaySphere
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-gray-500 dark:text-gray-400">
              Find your perfect stay, explore beautiful
              destinations, and make your next trip
              unforgettable.
            </p>
          </div>

          {/* EXPLORE */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Explore
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  Hotels
                </Link>
              </li>

              <li>
                <Link
                  to="/destinations"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  Destinations
                </Link>
              </li>

              <li>
                <Link
                  to="/favorites"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          {/* COMPANY */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* SUPPORT */}
          <div>
            <h3 className="text-sm font-semibold uppercase tracking-wider">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-gray-500 dark:text-gray-400">
              <li>
                <a
                  href="#"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  FAQs
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  Privacy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-gray-900 dark:hover:text-white"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* BOTTOM */}
        <div className="mt-12 border-t border-gray-200 pt-6 dark:border-gray-800">

          <div className="flex flex-col gap-3 text-sm text-gray-500 dark:text-gray-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 StaySphere. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="transition hover:text-gray-900 dark:hover:text-white"
              >
                Privacy
              </a>

              <a
                href="#"
                className="transition hover:text-gray-900 dark:hover:text-white"
              >
                Terms
              </a>

              <Link
                to="/"
                className="transition hover:text-gray-900 dark:hover:text-white"
              >
                Contact
              </Link>
            </div>

          </div>

        </div>

      </div>
    </footer>
  );
}

export default Footer;