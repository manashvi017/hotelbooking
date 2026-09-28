import { lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import ProtectedRoute from "./Protectedroutes";

// Lazy loaded pages
const Home = lazy(() => import("../pages/Home"));
const Explore = lazy(() => import("../pages/Explore"));
const HotelDetails = lazy(() => import("../pages/HotelDetails"));
const SearchResults = lazy(() => import("../pages/SearchResults"));
const SignIn = lazy(() => import("../pages/SignIn"));
const SignUp = lazy(() => import("../pages/SignUp"));
const Booking = lazy(() => import("../pages/Booking"));
const MyBookings = lazy(() => import("../pages/MyBookings"));
const Profile = lazy(() => import("../pages/Profile"));
const Favorites = lazy(() => import("../pages/Favorites"));
const Theme = lazy(() => import("../pages/Theme"));
const NotFound = lazy(() => import("../pages/NotFound"));


function LoadingScreen() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
      <div className="text-center">
        <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-gray-900 dark:border-gray-700 dark:border-t-white" />

        <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
          Loading...
        </p>
      </div>
    </div>
  );
}

function AppRoutes() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <Routes>

        {/* PUBLIC ROUTES */}

        <Route path="/" element={<Home />} />

        <Route
          path="/explore"
          element={<Explore />}
        />

        <Route
          path="/hotel/:id"
          element={<HotelDetails />}
        />

        <Route
          path="/search"
          element={<SearchResults />}
        />

        <Route
          path="/signin"
          element={<SignIn />}
        />

        <Route
          path="/signup"
          element={<SignUp />}
        />

        {/* PROTECTED ROUTES */}

        <Route
          path="/booking"
          element={
            <ProtectedRoute>
              <Booking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/my-bookings"
          element={
            <ProtectedRoute>
              <MyBookings />
            </ProtectedRoute>
          }
        />

        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />

        <Route
          path="/favorites"
          element={
            <ProtectedRoute>
              <Favorites />
            </ProtectedRoute>
          }
        />

        <Route
          path="/theme"
          element={
            <ProtectedRoute>
              <Theme />
            </ProtectedRoute>
          }
        />

        {/* 404 */}

        <Route
          path="*"
          element={<NotFound />}
        />
     

      </Routes>
    </Suspense>
  );
}

export default AppRoutes;