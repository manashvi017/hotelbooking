import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  ArrowRight,
  Sparkles,
} from "lucide-react";

import useAuth from "../hooks/useAuth";
import useTheme from "../hooks/useTheme";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signin } = useAuth();
  const { theme } = useTheme();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");

  const from = location.state?.from || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter email and password.");
      return;
    }

    const result = signin(email, password);

    if (!result.success) {
      setError(result.message);
      return;
    }

    navigate(from, {
      replace: true,
    });
  };

  return (
    <div
      className={`relative min-h-screen overflow-hidden px-6 py-12 transition-colors duration-700 ${
        theme === "dark"
          ? "bg-[#050505]"
          : "bg-[#f5f5f7]"
      }`}
    >
      {/* ================================
          ANIMATED BACKGROUND
      ================================= */}

      <motion.div
        animate={{
          x: [0, 80, -30, 0],
          y: [0, -50, 60, 0],
          scale: [1, 1.15, 0.95, 1],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -left-32 -top-32 h-80 w-80 rounded-full blur-3xl ${
          theme === "dark"
            ? "bg-purple-700/20"
            : "bg-purple-300/50"
        }`}
      />

      <motion.div
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 50, -40, 0],
          scale: [1, 0.9, 1.1, 1],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute -bottom-32 -right-32 h-96 w-96 rounded-full blur-3xl ${
          theme === "dark"
            ? "bg-blue-700/20"
            : "bg-blue-300/50"
        }`}
      />

      <motion.div
        animate={{
          y: [0, -25, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className={`absolute right-[20%] top-[15%] h-32 w-32 rounded-full blur-3xl ${
          theme === "dark"
            ? "bg-pink-600/10"
            : "bg-pink-300/30"
        }`}
      />

      {/* ================================
          MAIN
      ================================= */}

      <div className="relative z-10 mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center">

        <div className="grid w-full overflow-hidden rounded-[32px] border border-white/20 shadow-2xl backdrop-blur-xl lg:grid-cols-2">

          {/* =================================
              LEFT SIDE
          ================================= */}

          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className="relative hidden min-h-[650px] overflow-hidden lg:flex"
          >

            {/* Background */}

            <div
              className={`absolute inset-0 ${
                theme === "dark"
                  ? "bg-gradient-to-br from-gray-900 via-gray-800 to-black"
                  : "bg-gradient-to-br from-gray-900 via-gray-800 to-gray-950"
              }`}
            />

            {/* Decorative circles */}

            <motion.div
              animate={{
                rotate: 360,
              }}
              transition={{
                duration: 25,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -right-24 -top-24 h-72 w-72 rounded-full border border-white/10"
            />

            <motion.div
              animate={{
                rotate: -360,
              }}
              transition={{
                duration: 30,
                repeat: Infinity,
                ease: "linear",
              }}
              className="absolute -bottom-32 -left-20 h-80 w-80 rounded-full border border-white/10"
            />

            <div className="relative z-10 flex flex-col justify-between p-12 text-white">

              <div>

                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-gray-900">
                    <Sparkles size={19} />
                  </div>

                  <span className="text-xl font-bold">
                    StaySphere
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: 0.3,
                    duration: 0.6,
                  }}
                  className="mt-24"
                >
                  <p className="text-sm uppercase tracking-[5px] text-gray-400">
                    Welcome back
                  </p>

                  <h2 className="mt-5 text-5xl font-bold leading-tight">
                    Your next
                    <br />
                    stay awaits.
                  </h2>

                  <p className="mt-6 max-w-md leading-7 text-gray-400">
                    Sign in to continue exploring beautiful
                    destinations, save your favourite stays,
                    and manage your bookings.
                  </p>
                </motion.div>

              </div>

              <p className="text-sm text-gray-500">
                Stay • Explore • Enjoy
              </p>

            </div>
          </motion.div>

          {/* =================================
              RIGHT SIDE FORM
          ================================= */}

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{
              duration: 0.7,
              ease: "easeOut",
            }}
            className={`flex items-center justify-center p-8 transition-colors duration-700 sm:p-12 ${
              theme === "dark"
                ? "bg-gray-900/90"
                : "bg-white/90"
            }`}
          >

            <div className="w-full max-w-md">

              {/* Heading */}

              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  delay: 0.2,
                  duration: 0.5,
                }}
              >
                <h1 className="text-3xl font-bold">
                  Welcome back
                </h1>

                <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                  Sign in to continue to StaySphere
                </p>
              </motion.div>

              {/* Protected route message */}

              {location.state?.message && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-6 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm text-gray-600 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-300"
                >
                  {location.state.message}
                </motion.div>
              )}

              {/* Error */}

              {error && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="mt-6 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-600 dark:border-red-900/50 dark:bg-red-950/30 dark:text-red-400"
                >
                  {error}
                </motion.div>
              )}

              {/* FORM */}

              <form
                onSubmit={handleSubmit}
                className="mt-8 space-y-5"
              >

                {/* EMAIL */}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                >
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <div className="group relative">

                    <Mail
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white"
                    />

                    <input
                      type="email"
                      value={email}
                      onChange={(e) =>
                        setEmail(e.target.value)
                      }
                      placeholder="Enter your email"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition-all duration-300 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/5 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white dark:focus:bg-gray-800 dark:focus:ring-white/5"
                    />

                  </div>
                </motion.div>

                {/* PASSWORD */}

                <motion.div
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                >
                  <label className="mb-2 block text-sm font-medium">
                    Password
                  </label>

                  <div className="group relative">

                    <Lock
                      size={18}
                      className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 transition group-focus-within:text-gray-900 dark:group-focus-within:text-white"
                    />

                    <input
                      type={
                        showPassword
                          ? "text"
                          : "password"
                      }
                      value={password}
                      onChange={(e) =>
                        setPassword(e.target.value)
                      }
                      placeholder="Enter your password"
                      className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 outline-none transition-all duration-300 focus:border-gray-900 focus:bg-white focus:ring-4 focus:ring-gray-900/5 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white dark:focus:bg-gray-800 dark:focus:ring-white/5"
                    />

                    <button
                      type="button"
                      onClick={() =>
                        setShowPassword(!showPassword)
                      }
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 transition hover:text-gray-900 dark:hover:text-white"
                    >
                      {showPassword ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>

                  </div>
                </motion.div>

                {/* BUTTON */}

                <motion.button
                  initial={{ opacity: 0, y: 15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                  whileHover={{
                    scale: 1.02,
                  }}
                  whileTap={{
                    scale: 0.98,
                  }}
                  type="submit"
                  className="group flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4 font-semibold text-white shadow-lg shadow-gray-900/20 transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:shadow-white/10 dark:hover:bg-gray-200"
                >
                  Sign In

                  <ArrowRight
                    size={18}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </motion.button>

              </form>

              {/* SIGN UP */}

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.6 }}
                className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400"
              >
                Don't have an account?{" "}

                <Link
                  to="/signup"
                  className="font-semibold text-gray-900 transition hover:underline dark:text-white"
                >
                  Sign Up
                </Link>
              </motion.p>

            </div>

          </motion.div>

        </div>

      </div>
    </div>
  );
}

export default SignIn;