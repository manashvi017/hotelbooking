import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import useAuth from "../hooks/useAuth";

function SignIn() {
  const navigate = useNavigate();
  const location = useLocation();

  const { signin } = useAuth();

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

    // Login successful
    navigate(from, {
      replace: true,
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 dark:bg-gray-950">
      <div className="mx-auto flex min-h-[75vh] max-w-md items-center justify-center">

        <div className="w-full rounded-3xl bg-white p-8 shadow-sm dark:bg-gray-900 sm:p-10">

          <div className="text-center">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Welcome back
            </h1>

            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              Sign in to continue to StaySphere
            </p>
          </div>

          {location.state?.message && (
            <div className="mt-6 rounded-xl bg-gray-100 px-4 py-3 text-sm text-gray-700 dark:bg-gray-800 dark:text-gray-300">
              {location.state.message}
            </div>
          )}

          {error && (
            <div className="mt-6 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
              {error}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="mt-8 space-y-5"
          >

            {/* EMAIL */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>

              <div className="relative">
                <Mail
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                />

                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-xl border border-gray-200 bg-transparent py-3 pl-11 pr-4 text-gray-900 outline-none transition focus:border-gray-500 dark:border-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* PASSWORD */}

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>

              <div className="relative">
                <Lock
                  size={18}
                  className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
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
                  className="w-full rounded-xl border border-gray-200 bg-transparent py-3 pl-11 pr-12 text-gray-900 outline-none transition focus:border-gray-500 dark:border-gray-700 dark:text-white"
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className="w-full rounded-xl bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
            >
              Sign In
            </button>

          </form>

          <p className="mt-7 text-center text-sm text-gray-500 dark:text-gray-400">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="font-semibold text-gray-900 hover:underline dark:text-white"
            >
              Sign Up
            </Link>
          </p>

        </div>
      </div>
    </div>
  );
}

export default SignIn;