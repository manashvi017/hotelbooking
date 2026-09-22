import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  Heart,
  LogOut,
  Pencil,
  ShieldCheck,
} from "lucide-react";

import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";

function Profile() {
  const { user, logout } = useAuth();

  // If user is not logged in
  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Please Sign In
          </h1>

          <Link
            to="/signin"
            className="mt-5 inline-block rounded-full bg-gray-900 px-6 py-3 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
          >
            Sign In
          </Link>
        </div>
      </div>
    );
  }

  // First letter of user's name
  const avatarLetter = user.name
    ? user.name.charAt(0).toUpperCase()
    : "U";

  return (
    <div className="min-h-screen bg-gray-50 px-4 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl">

        {/* Header */}
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[3px] text-gray-500">
            Account
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            My Profile
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage your personal information and bookings.
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">

          {/* Profile Card */}
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

            <div className="flex flex-col items-center text-center">

              {/* Dynamic Avatar */}
              <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gray-900 text-3xl font-bold text-white dark:bg-white dark:text-gray-900">
                {avatarLetter}
              </div>

              {/* Dynamic Name */}
              <h2 className="mt-4 text-xl font-bold">
                {user.name}
              </h2>

              <p className="text-sm text-gray-500 dark:text-gray-400">
                StaySphere Member
              </p>

              <button className="mt-5 flex items-center gap-2 rounded-full border border-gray-200 px-5 py-2 text-sm font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800">
                <Pencil size={16} />
                Edit Profile
              </button>
            </div>

            <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

            <div className="space-y-5">

              {/* Dynamic Email */}
              <div className="flex items-center gap-3">
                <Mail
                  size={19}
                  className="text-gray-400"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Email
                  </p>

                  <p className="text-sm font-medium">
                    {user.email}
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-3">
                <Phone
                  size={19}
                  className="text-gray-400"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Phone
                  </p>

                  <p className="text-sm font-medium">
                    Not added
                  </p>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-center gap-3">
                <MapPin
                  size={19}
                  className="text-gray-400"
                />

                <div>
                  <p className="text-xs text-gray-400">
                    Location
                  </p>

                  <p className="text-sm font-medium">
                    Not added
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Right Section */}
          <div className="space-y-6 lg:col-span-2">

            {/* Stats */}
            <div className="grid gap-4 sm:grid-cols-3">

              {/* Bookings */}
              <Link
                to="/my-bookings"
                className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 dark:bg-gray-900"
              >
                <CalendarDays
                  className="text-gray-500"
                  size={22}
                />

                <p className="mt-4 text-2xl font-bold">
                  0
                </p>

                <p className="text-sm text-gray-500">
                  My Bookings
                </p>
              </Link>

              {/* Wishlist */}
              <Link
                to="/favorites"
                className="rounded-2xl bg-white p-5 shadow-sm transition hover:-translate-y-1 dark:bg-gray-900"
              >
                <Heart
                  className="text-red-500"
                  size={22}
                />

                <p className="mt-4 text-2xl font-bold">
                  0
                </p>

                <p className="text-sm text-gray-500">
                  Wishlist
                </p>
              </Link>

              {/* Account Status */}
              <div className="rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-900">
                <ShieldCheck
                  className="text-gray-500"
                  size={22}
                />

                <p className="mt-4 text-sm font-semibold">
                  Verified
                </p>

                <p className="text-sm text-gray-500">
                  Account status
                </p>
              </div>

            </div>

            {/* Personal Information */}
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-bold">
                    Personal Information
                  </h2>

                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                    Your account details
                  </p>
                </div>

                <User
                  size={22}
                  className="text-gray-400"
                />
              </div>

              <div className="mt-6 grid gap-5 sm:grid-cols-2">

                {/* Dynamic Name */}
                <div>
                  <p className="mb-2 text-xs text-gray-400">
                    Full Name
                  </p>

                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
                    {user.name}
                  </div>
                </div>

                {/* Dynamic Email */}
                <div>
                  <p className="mb-2 text-xs text-gray-400">
                    Email Address
                  </p>

                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
                    {user.email}
                  </div>
                </div>

                {/* Phone */}
                <div>
                  <p className="mb-2 text-xs text-gray-400">
                    Phone Number
                  </p>

                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
                    Not added
                  </div>
                </div>

                {/* Member Since */}
                <div>
                  <p className="mb-2 text-xs text-gray-400">
                    Member Since
                  </p>

                  <div className="rounded-xl bg-gray-50 px-4 py-3 text-sm dark:bg-gray-800">
                    StaySphere Member
                  </div>
                </div>

              </div>
            </div>

            {/* Account Actions */}
            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <h2 className="text-xl font-bold">
                Account
              </h2>

              <div className="mt-5 space-y-3">

                {/* My Bookings */}
                <Link
                  to="/my-bookings"
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <CalendarDays size={20} />

                    <span className="text-sm font-medium">
                      My Bookings
                    </span>
                  </div>

                  <span>→</span>
                </Link>

                {/* Wishlist */}
                <Link
                  to="/favorites"
                  className="flex items-center justify-between rounded-xl border border-gray-200 p-4 transition hover:bg-gray-50 dark:border-gray-800 dark:hover:bg-gray-800"
                >
                  <div className="flex items-center gap-3">
                    <Heart
                      size={20}
                      className="text-red-500"
                    />

                    <span className="text-sm font-medium">
                      Wishlist
                    </span>
                  </div>

                  <span>→</span>
                </Link>

                {/* Sign Out */}
                <button
                  onClick={logout}
                  className="flex w-full items-center gap-3 rounded-xl border border-red-100 p-4 text-left text-red-500 transition hover:bg-red-50 dark:border-red-900/30 dark:hover:bg-red-950/20"
                >
                  <LogOut size={20} />

                  <span className="text-sm font-medium">
                    Sign Out
                  </span>
                </button>

              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;