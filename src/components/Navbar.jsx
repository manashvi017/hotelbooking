import { useState } from "react";
import {
  Menu,
  X,
  Heart,
  User,
  Sun,
  Moon,
  LogOut,
  ChevronDown,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";

import useTheme from "../hooks/useTheme";
import useAuth from "../hooks/useAuth";

function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();

  const [mobileMenu, setMobileMenu] = useState(false);
  const [userMenu, setUserMenu] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenu(false);
  };

  const handleLogout = () => {
    logout();
    setUserMenu(false);
    setMobileMenu(false);
  };

  const navLinkClass = ({ isActive }) =>
    `rounded-full px-4 py-2 text-sm font-medium transition ${
      isActive
        ? "bg-white/80 text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
        : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
    }`;

  return (
    <header className="sticky top-0 z-50 border-b border-slate-200/80 bg-white/80 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-950/80">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-6">

        <Link
          to="/"
          onClick={closeMobileMenu}
          className="text-2xl font-black tracking-tight text-slate-900 dark:text-white"
        >
          Stay<span className="bg-gradient-to-r from-sky-500 to-cyan-500 bg-clip-text text-transparent">Sphere</span>
        </Link>

        <nav className="hidden items-center gap-2 md:flex">
          <NavLink to="/" className={navLinkClass}>
            Home
          </NavLink>

          <NavLink to="/explore" className={navLinkClass}>
            Explore
          </NavLink>

          <NavLink
            to="/favorites"
            className={({ isActive }) =>
              `flex items-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition ${
                isActive
                  ? "bg-white/80 text-slate-900 shadow-sm ring-1 ring-slate-200 dark:bg-slate-800 dark:text-white dark:ring-slate-700"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              }`
            }
          >
            <Heart size={18} />
            Wishlist
          </NavLink>
        </nav>

        <div className="hidden items-center gap-4 md:flex">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white/80 text-slate-700 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          {user ? (
            <div className="relative">
              <button
                onClick={() => setUserMenu(!userMenu)}
                className="flex items-center gap-2 rounded-full border border-slate-200 bg-white/80 px-3 py-2 shadow-sm transition hover:-translate-y-0.5 hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
              >
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-slate-900 to-sky-600 text-sm font-bold text-white dark:from-white dark:to-sky-300 dark:text-slate-900">
                  {user.name
                    ? user.name.charAt(0).toUpperCase()
                    : "U"}
                </div>

                <span className="max-w-24 truncate text-sm font-medium text-slate-700 dark:text-slate-200">
                  {user.name || "User"}
                </span>

                <ChevronDown size={16} className="text-slate-500 dark:text-slate-300" />
              </button>

              {userMenu && (
                <div className="absolute right-0 top-14 w-56 overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-[0_18px_45px_rgba(15,23,42,0.15)] dark:border-slate-800 dark:bg-slate-900">

                  <div className="border-b border-slate-200 px-4 py-3 dark:border-slate-800">
                    <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
                      {user.name || "User"}
                    </p>

                    {user.email && (
                      <p className="mt-1 truncate text-xs text-slate-500 dark:text-slate-400">
                        {user.email}
                      </p>
                    )}
                  </div>

                  <Link
                    to="/profile"
                    onClick={() => setUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <User size={17} />
                    My Profile
                  </Link>

                  <Link
                    to="/my-bookings"
                    onClick={() => setUserMenu(false)}
                    className="flex items-center gap-3 px-4 py-3 text-sm text-slate-700 transition hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800"
                  >
                    <span className="text-base">📋</span>
                    My Bookings
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex w-full items-center gap-3 border-t border-slate-200 px-4 py-3 text-sm text-red-500 transition hover:bg-red-50 dark:border-slate-800 dark:hover:bg-red-950/30"
                  >
                    <LogOut size={17} />
                    Sign Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link
                to="/signin"
                className="text-sm font-medium text-slate-700 transition hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              >
                Sign In
              </Link>

              <Link
                to="/signup"
                className="rounded-full bg-gradient-to-r from-slate-900 to-sky-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 dark:from-white dark:to-sky-200 dark:text-slate-900"
              >
                Sign Up
              </Link>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon size={18} />
            ) : (
              <Sun size={18} />
            )}
          </button>

          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="flex h-10 w-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-700 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200"
            aria-label="Toggle menu"
          >
            {mobileMenu ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
      </div>

      {/* MOBILE MENU */}
      {mobileMenu && (
        <div className="border-t border-gray-200 bg-white px-6 py-6 dark:border-gray-800 dark:bg-gray-950 md:hidden">

          <nav className="flex flex-col gap-5">

            <NavLink
              to="/"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              Home
            </NavLink>

            <NavLink
              to="/explore"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              Explore
            </NavLink>

            <NavLink
              to="/favorites"
              onClick={closeMobileMenu}
              className={navLinkClass}
            >
              <span className="flex items-center gap-2">
                <Heart size={18} />
                Wishlist
              </span>
            </NavLink>

            {user ? (
              <>
                <NavLink
                  to="/profile"
                  onClick={closeMobileMenu}
                  className={navLinkClass}
                >
                  <span className="flex items-center gap-2">
                    <User size={18} />
                    My Profile
                  </span>
                </NavLink>

                <NavLink
                  to="/my-bookings"
                  onClick={closeMobileMenu}
                  className={navLinkClass}
                >
                  My Bookings
                </NavLink>

                <button
                  onClick={handleLogout}
                  className="flex items-center gap-2 text-left font-medium text-red-500"
                >
                  <LogOut size={18} />
                  Sign Out
                </button>
              </>
            ) : (
              <div className="flex flex-col gap-3 border-t border-gray-200 pt-5 dark:border-gray-800">
                <Link
                  to="/signin"
                  onClick={closeMobileMenu}
                  className="rounded-full border border-gray-300 px-5 py-3 text-center text-sm font-medium dark:border-gray-700"
                >
                  Sign In
                </Link>

                <Link
                  to="/signup"
                  onClick={closeMobileMenu}
                  className="rounded-full bg-gray-900 px-5 py-3 text-center text-sm font-medium text-white dark:bg-white dark:text-gray-900"
                >
                  Sign Up
                </Link>
              </div>
            )}
          </nav>
        </div>
      )}
    </header>
  );
}

export default Navbar;