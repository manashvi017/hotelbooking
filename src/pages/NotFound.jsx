import { Link } from "react-router-dom";
import { ArrowLeft, Home, Search } from "lucide-react";

function NotFound() {
  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-gray-50 px-6 py-16 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="w-full max-w-2xl text-center">

        {/* 404 */}
        <p className="text-8xl font-black tracking-tight text-gray-200 dark:text-gray-800 sm:text-9xl">
          404
        </p>

        {/* Heading */}
        <h1 className="mt-4 text-3xl font-bold sm:text-4xl">
          Page not found
        </h1>

        {/* Description */}
        <p className="mx-auto mt-4 max-w-md text-gray-500 dark:text-gray-400">
          Sorry, the page you're looking for doesn't exist or may
          have been moved.
        </p>

        {/* Buttons */}
        <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">

          <Link
            to="/"
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200 sm:w-auto"
          >
            <Home size={18} />
            Go Home
          </Link>

          <Link
            to="/explore"
            className="flex w-full items-center justify-center gap-2 rounded-xl border border-gray-300 px-6 py-3 font-medium text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800 sm:w-auto"
          >
            <Search size={18} />
            Explore Hotels
          </Link>

        </div>

        {/* Back */}
        <button
          onClick={() => window.history.back()}
          className="mt-6 inline-flex items-center gap-2 text-sm text-gray-500 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={16} />
          Go back
        </button>

      </div>
    </div>
  );
}

export default NotFound;