import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[linear-gradient(180deg,#f8fbff_0%,#edf4ff_100%)] text-slate-800 dark:border-slate-800 dark:bg-[linear-gradient(180deg,#020817_0%,#0f172a_100%)] dark:text-slate-200">
      <div className="mx-auto max-w-7xl px-6 py-14">

        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">

          <div>
            <Link
              to="/"
              className="text-2xl font-black tracking-tight"
            >
              Stay<span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">Sphere</span>
            </Link>

            <p className="mt-4 max-w-xs text-sm leading-6 text-slate-600 dark:text-slate-400">
              Find your perfect stay, explore beautiful
              destinations, and make your next trip
              unforgettable.
            </p>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Explore
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  Hotels
                </Link>
              </li>

              <li>
                <Link
                  to="/explore"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  Destinations
                </Link>
              </li>

              <li>
                <Link
                  to="/favorites"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  Wishlist
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Company
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <Link
                  to="/"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  About Us
                </Link>
              </li>

              <li>
                <Link
                  to="/profile"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  My Profile
                </Link>
              </li>

              <li>
                <Link
                  to="/"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-sm font-semibold uppercase tracking-[0.22em] text-slate-500 dark:text-slate-400">
              Support
            </h3>

            <ul className="mt-5 space-y-3 text-sm text-slate-600 dark:text-slate-400">
              <li>
                <a
                  href="#"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  Help Center
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  FAQs
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  Privacy
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="transition hover:text-slate-900 dark:hover:text-white"
                >
                  Terms
                </a>
              </li>
            </ul>
          </div>

        </div>

        <div className="mt-12 border-t border-slate-200 pt-6 dark:border-slate-800">

          <div className="flex flex-col gap-3 text-sm text-slate-500 dark:text-slate-400 sm:flex-row sm:items-center sm:justify-between">

            <p>
              © 2026 StaySphere. All rights reserved.
            </p>

            <div className="flex gap-5">
              <a
                href="#"
                className="transition hover:text-slate-900 dark:hover:text-white"
              >
                Privacy
              </a>

              <a
                href="#"
                className="transition hover:text-slate-900 dark:hover:text-white"
              >
                Terms
              </a>

              <Link
                to="/"
                className="transition hover:text-slate-900 dark:hover:text-white"
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