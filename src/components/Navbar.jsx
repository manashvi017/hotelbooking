import { useEffect, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {Menu,X,
  Heart,
  Sun,
  Moon,
  User,
  CalendarDays,
  LogOut,
  ChevronDown,
  Sparkles,
  Home,
  Compass,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";
import { useWishlist } from "../context/WishlistContext";

function Navbar() {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const { wishlist } = useWishlist();

  const navigate = useNavigate();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    logout();
    setProfileOpen(false);
    setMobileOpen(false);
    navigate("/");
  };

  const closeMobile = () => {
    setMobileOpen(false);
  };

  const navItems = [
    {
      name: "Home",
      path: "/",
      icon: Home,
    },
    {
      name: "Explore",
      path: "/explore",
      icon: Compass,
    },
  ];

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{
          duration: 0.6,
          ease: "easeOut",
        }}
        className={`sticky top-0 z-50 transition-all duration-500 ${scrolled
            ? "border-b border-gray-200/60 bg-white/80 shadow-lg shadow-gray-900/5 backdrop-blur-2xl dark:border-gray-800/60 dark:bg-gray-950/80"
            : "border-b border-transparent bg-white dark:bg-gray-950"
          }`}
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex h-[76px] items-center justify-between">

            {/* LOGO */}
            <Link
              to="/"
              className="group flex items-center gap-3"
              onClick={closeMobile}
            >
              <motion.div
                whileHover={{
                  rotate: 8,
                  scale: 1.08,
                }}
                whileTap={{
                  scale: 0.95,
                }}
                className="relative flex h-11 w-11 items-center justify-center overflow-hidden rounded-2xl bg-gray-950 text-white shadow-lg shadow-gray-900/20 dark:bg-white dark:text-gray-950"
              >
                <Sparkles size={19} />

                <motion.div
                  animate={{
                    x: ["-120%", "120%"],
                  }}
                  transition={{
                    duration: 2.5,
                    repeat: Infinity,
                    repeatDelay: 3,
                    ease: "easeInOut",
                  }}
                  className="absolute inset-y-0 w-8 rotate-12 bg-white/20 blur-sm dark:bg-black/10"
                />
              </motion.div>

              <div className="flex flex-col items-start leading-none">
                <p className="text-lg font-black tracking-tight text-gray-950 dark:text-white">
                  Stay<span className="text-gray-500">Sphere</span>
                </p>

                <p className="mt-0 text-[9px] font-medium uppercase tracking-[3px] text-gray-400">
                  Stay • Explore • Enjoy
                </p>
              </div>
            </Link>

            {/* DESKTOP NAV */}
            <div className="hidden items-center gap-2 lg:flex">
              {navItems.map((item) => {
                const Icon = item.icon;

                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    className={({ isActive }) =>
                      `group relative flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-300 ${isActive
                        ? "text-gray-950 dark:text-white"
                        : "text-gray-500 hover:text-gray-950 dark:text-gray-400 dark:hover:text-white"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <motion.div
                          whileHover={{ y: -1 }}
                          className="flex items-center gap-2"
                        >
                          <Icon
                            size={17}
                            className="transition-transform duration-300 group-hover:scale-110"
                          />
                          {item.name}
                        </motion.div>

                        {isActive && (
                          <motion.span
                            layoutId="navbar-active"
                            className="absolute inset-x-3 -bottom-[1px] h-0.5 rounded-full bg-gray-950 dark:bg-white"
                            transition={{
                              type: "spring",
                              stiffness: 400,
                              damping: 30,
                            }}
                          />
                        )}
                      </>
                    )}
                  </NavLink>
                );
              })}

              {/* WISHLIST */}
              <Link
                to="/favorites"
                className="group relative ml-1 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-all duration-300 hover:-translate-y-0.5 hover:border-gray-300 hover:text-red-500 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-red-400"
              >
                <Heart
                  size={19}
                  className="transition-transform duration-300 group-hover:scale-110"
                />

                {wishlist.length > 0 && (
                  <motion.span
                    initial={{
                      scale: 0,
                    }}
                    animate={{
                      scale: 1,
                    }}
                    className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-red-500 px-1 text-[10px] font-bold text-white shadow-md"
                  >
                    {wishlist.length > 9 ? "9+" : wishlist.length}
                  </motion.span>
                )}
              </Link>

              {/* THEME */}
              <motion.button
                whileHover={{
                  scale: 1.05,
                }}
                whileTap={{
                  scale: 0.92,
                }}
                onClick={toggleTheme}
                className="ml-1 flex h-11 w-11 items-center justify-center rounded-full border border-gray-200 bg-white text-gray-600 transition-colors hover:border-gray-300 hover:text-gray-950 dark:border-gray-800 dark:bg-gray-900 dark:text-gray-400 dark:hover:border-gray-700 dark:hover:text-white"
                aria-label="Toggle theme"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {theme === "dark" ? (
                    <motion.div
                      key="sun"
                      initial={{
                        rotate: -90,
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        rotate: 90,
                        opacity: 0,
                        scale: 0.5,
                      }}
                    >
                      <Sun size={19} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="moon"
                      initial={{
                        rotate: 90,
                        opacity: 0,
                        scale: 0.5,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                        scale: 1,
                      }}
                      exit={{
                        rotate: -90,
                        opacity: 0,
                        scale: 0.5,
                      }}
                    >
                      <Moon size={19} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* USER */}
              {user ? (
                <div className="relative ml-2">
                  <motion.button
                    whileHover={{
                      y: -1,
                    }}
                    onClick={() =>
                      setProfileOpen((previous) => !previous)
                    }
                    className="flex items-center gap-3 rounded-full border border-gray-200 bg-white py-1.5 pl-1.5 pr-3 transition-all duration-300 hover:border-gray-300 hover:shadow-md dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                  >
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gray-950 text-sm font-bold text-white dark:bg-white dark:text-gray-950">
                      {user.name?.charAt(0)?.toUpperCase() || "U"}
                    </div>

                    <div className="hidden text-left xl:block">
                      <p className="max-w-[110px] truncate text-xs font-semibold text-gray-900 dark:text-white">
                        {user.name}
                      </p>
                      <p className="text-[10px] text-gray-400">
                        Account
                      </p>
                    </div>

                    <motion.div
                      animate={{
                        rotate: profileOpen ? 180 : 0,
                      }}
                    >
                      <ChevronDown size={15} />
                    </motion.div>
                  </motion.button>

                  <AnimatePresence>
                    {profileOpen && (
                      <motion.div
                        initial={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                        }}
                        animate={{
                          opacity: 1,
                          y: 0,
                          scale: 1,
                        }}
                        exit={{
                          opacity: 0,
                          y: -8,
                          scale: 0.96,
                        }}
                        transition={{
                          duration: 0.18,
                        }}
                        className="absolute right-0 mt-3 w-64 overflow-hidden rounded-2xl border border-gray-200 bg-white p-2 shadow-2xl shadow-gray-900/10 dark:border-gray-800 dark:bg-gray-900"
                      >
                        <div className="mb-1 rounded-xl bg-gray-50 p-3 dark:bg-gray-800">
                          <p className="truncate text-sm font-semibold text-gray-900 dark:text-white">
                            {user.name}
                          </p>
                          <p className="mt-0.5 truncate text-xs text-gray-500 dark:text-gray-400">
                            {user.email}
                          </p>
                        </div>

                        <Link
                          to="/profile"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                          <User size={17} />
                          Profile
                        </Link>

                        <Link
                          to="/my-bookings"
                          onClick={() =>
                            setProfileOpen(false)
                          }
                          className="flex items-center gap-3 rounded-xl px-3 py-3 text-sm text-gray-600 transition hover:bg-gray-100 hover:text-gray-950 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                        >
                          <CalendarDays size={17} />
                          My Bookings
                        </Link>

                        <div className="my-1 h-px bg-gray-100 dark:bg-gray-800" />

                        <button
                          onClick={handleLogout}
                          className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-sm text-red-500 transition hover:bg-red-50 dark:hover:bg-red-950/20"
                        >
                          <LogOut size={17} />
                          Sign Out
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              ) : (
                <div className="ml-2 flex items-center gap-2">
                  <Link
                    to="/signin"
                    className="rounded-full px-4 py-2.5 text-sm font-medium text-gray-600 transition hover:text-gray-950 dark:text-gray-300 dark:hover:text-white"
                  >
                    Sign In
                  </Link>

                  <motion.div
                    whileHover={{
                      scale: 1.03,
                    }}
                    whileTap={{
                      scale: 0.97,
                    }}
                  >
                    <Link
                      to="/signup"
                      className="flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-gray-950/15 transition hover:bg-gray-800 dark:bg-white dark:text-gray-950 dark:hover:bg-gray-200"
                    >
                      Get Started
                      <Sparkles size={14} />
                    </Link>
                  </motion.div>
                </div>
              )}
            </div>

            {/* MOBILE CONTROLS */}
            <div className="flex items-center gap-2 lg:hidden">
              <Link
                to="/favorites"
                className="relative flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800"
              >
                <Heart size={18} />

                {wishlist.length > 0 && (
                  <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-red-500 px-1 text-[9px] font-bold text-white">
                    {wishlist.length > 9
                      ? "9+"
                      : wishlist.length}
                  </span>
                )}
              </Link>

              <button
                onClick={toggleTheme}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200 dark:border-gray-800"
              >
                {theme === "dark" ? (
                  <Sun size={18} />
                ) : (
                  <Moon size={18} />
                )}
              </button>

              <button
                onClick={() =>
                  setMobileOpen((previous) => !previous)
                }
                className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-950 text-white dark:bg-white dark:text-gray-950"
              >
                <AnimatePresence mode="wait" initial={false}>
                  {mobileOpen ? (
                    <motion.div
                      key="close"
                      initial={{
                        rotate: -90,
                        opacity: 0,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                      }}
                      exit={{
                        rotate: 90,
                        opacity: 0,
                      }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{
                        rotate: 90,
                        opacity: 0,
                      }}
                      animate={{
                        rotate: 0,
                        opacity: 1,
                      }}
                      exit={{
                        rotate: -90,
                        opacity: 0,
                      }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </button>
            </div>
          </div>
        </div>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{
                opacity: 0,
                height: 0,
              }}
              animate={{
                opacity: 1,
                height: "auto",
              }}
              exit={{
                opacity: 0,
                height: 0,
              }}
              className="overflow-hidden border-t border-gray-200/70 dark:border-gray-800/70 lg:hidden"
            >
              <div className="mx-auto max-w-7xl px-5 py-5 sm:px-8">
                <div className="space-y-2">
                  {navItems.map((item, index) => {
                    const Icon = item.icon;

                    return (
                      <motion.div
                        key={item.path}
                        initial={{
                          opacity: 0,
                          x: -15,
                        }}
                        animate={{
                          opacity: 1,
                          x: 0,
                        }}
                        transition={{
                          delay: index * 0.06,
                        }}
                      >
                        <NavLink
                          to={item.path}
                          onClick={closeMobile}
                          className={({ isActive }) =>
                            `flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium ${isActive
                              ? "bg-gray-950 text-white dark:bg-white dark:text-gray-950"
                              : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            }`
                          }
                        >
                          <Icon size={18} />
                          {item.name}
                        </NavLink>
                      </motion.div>
                    );
                  })}

                  <Link
                    to="/favorites"
                    onClick={closeMobile}
                    className="flex items-center justify-between rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                  >
                    <span className="flex items-center gap-3">
                      <Heart size={18} />
                      Wishlist
                    </span>

                    {wishlist.length > 0 && (
                      <span className="rounded-full bg-red-500 px-2 py-0.5 text-[10px] font-bold text-white">
                        {wishlist.length}
                      </span>
                    )}
                  </Link>

                  {user ? (
                    <>
                      <Link
                        to="/profile"
                        onClick={closeMobile}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <User size={18} />
                        Profile
                      </Link>

                      <Link
                        to="/my-bookings"
                        onClick={closeMobile}
                        className="flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                      >
                        <CalendarDays size={18} />
                        My Bookings
                      </Link>

                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium text-red-500 hover:bg-red-50 dark:hover:bg-red-950/20"
                      >
                        <LogOut size={18} />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <div className="grid grid-cols-2 gap-2 pt-2">
                      <Link
                        to="/signin"
                        onClick={closeMobile}
                        className="flex items-center justify-center rounded-2xl border border-gray-200 py-3 font-medium dark:border-gray-800"
                      >
                        Sign In
                      </Link>

                      <Link
                        to="/signup"
                        onClick={closeMobile}
                        className="flex items-center justify-center rounded-2xl bg-gray-950 py-3 font-semibold text-white dark:bg-white dark:text-gray-950"
                      >
                        Get Started
                      </Link>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.nav>
    </>
  );
}

export default Navbar;