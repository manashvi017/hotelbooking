import { Link, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  User,
  Mail,
  Lock,
  Eye,
  EyeOff,
} from "lucide-react";
import { useState } from "react";

function SignUp() {
  const { signup } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    setError("");

    // Check empty fields
    if (!name || !email || !password || !confirmPassword) {
      setError("Please fill in all fields.");
      return;
    }

    // Check name
    if (name.trim().length < 2) {
      setError("Please enter a valid name.");
      return;
    }

    // Check email
    if (!email.includes("@") || !email.includes(".")) {
      setError("Please enter a valid email address.");
      return;
    }

    // Check password length
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    // Check password match
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    // Create account
    const result = signup({
      name: name.trim(),
      email: email.trim(),
      password,
    });

    // If signup failed
    if (!result.success) {
      setError(result.message);
      return;
    }

    // Signup successful
    navigate("/profile");
  };

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">

      <div className="mx-auto grid min-h-[700px] max-w-6xl overflow-hidden rounded-3xl bg-white shadow-xl dark:bg-gray-900">

        {/* Left Section */}

        <div className="hidden bg-gray-900 p-12 text-white md:flex md:flex-col md:justify-between">

          <div>

            <p className="mb-3 text-sm uppercase tracking-[4px] text-gray-400">
              Join StaySphere
            </p>

            <h1 className="max-w-md text-5xl font-bold leading-tight">
              Find a place that feels like home.
            </h1>

            <p className="mt-6 max-w-md leading-7 text-gray-400">
              Create your StaySphere account and discover beautiful
              destinations, handpicked stays, and effortless booking.
            </p>

          </div>

          <p className="text-sm text-gray-500">
            Stay • Explore • Enjoy
          </p>

        </div>

        {/* Right Section */}

        <div className="flex items-center justify-center p-8 sm:p-12">

          <div className="w-full max-w-md">

            {/* Heading */}

            <div className="mb-8">

              <h2 className="text-3xl font-bold">
                Create an account
              </h2>

              <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                Start your journey with StaySphere.
              </p>

            </div>

            {/* Error */}

            {error && (
              <div className="mb-5 rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600 dark:bg-red-950/30 dark:text-red-400">
                {error}
              </div>
            )}

            <form
              onSubmit={handleSubmit}
              className="space-y-5"
            >

              {/* Full Name */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Full name
                </label>

                <div className="relative">

                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white"
                  />

                </div>

              </div>

              {/* Email */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Email address
                </label>

                <div className="relative">

                  <Mail
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white"
                  />

                </div>

              </div>

              {/* Password */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Create a password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    {showPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Confirm Password */}

              <div>

                <label className="mb-2 block text-sm font-medium">
                  Confirm password
                </label>

                <div className="relative">

                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
                  />

                  <input
                    type={
                      showConfirmPassword
                        ? "text"
                        : "password"
                    }
                    value={confirmPassword}
                    onChange={(e) =>
                      setConfirmPassword(e.target.value)
                    }
                    placeholder="Confirm your password"
                    className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-12 outline-none transition focus:border-gray-900 focus:ring-2 focus:ring-gray-900/10 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white"
                  />

                  <button
                    type="button"
                    onClick={() =>
                      setShowConfirmPassword(
                        !showConfirmPassword
                      )
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-700 dark:hover:text-white"
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={19} />
                    ) : (
                      <Eye size={19} />
                    )}
                  </button>

                </div>

              </div>

              {/* Terms */}

              <div className="flex items-start gap-2">

                <input
                  type="checkbox"
                  id="terms"
                  required
                  className="mt-1 h-4 w-4 rounded"
                />

                <label
                  htmlFor="terms"
                  className="text-sm text-gray-600 dark:text-gray-400"
                >
                  I agree to the{" "}

                  <Link
                    to="#"
                    className="font-medium text-gray-900 hover:underline dark:text-white"
                  >
                    Terms & Conditions
                  </Link>

                </label>

              </div>

              {/* Button */}

              <button
                type="submit"
                className="w-full rounded-xl bg-gray-900 py-3.5 font-semibold text-white transition hover:bg-gray-800 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Create Account
              </button>

            </form>

            {/* Sign In */}

            <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">

              Already have an account?{" "}

              <Link
                to="/signin"
                className="font-semibold text-gray-900 hover:underline dark:text-white"
              >
                Sign In
              </Link>

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}

export default SignUp;