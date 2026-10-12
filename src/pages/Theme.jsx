import { Moon, Palette, SunMedium } from "lucide-react";
import useTheme from "../hooks/useTheme";

function Theme() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-4xl">
        <p className="text-sm uppercase tracking-[3px] text-gray-500">Appearance</p>
        <h1 className="mt-2 text-3xl font-bold">Theme settings</h1>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          Personalize how StaySphere looks for your next booking experience.
        </p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                {theme === "dark" ? <SunMedium size={22} /> : <Moon size={22} />}
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Current mode</p>
                <h2 className="text-xl font-bold">
                  {theme === "dark" ? "Dark mode" : "Light mode"}
                </h2>
              </div>
            </div>

            <button
              onClick={toggleTheme}
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-gray-900 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
            >
              {theme === "dark" ? <SunMedium size={16} /> : <Moon size={16} />}
              Switch to {theme === "dark" ? "light" : "dark"} mode
            </button>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                <Palette size={22} />
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Experience</p>
                <h2 className="text-xl font-bold">Premium travel UI</h2>
              </div>
            </div>

            <div className="mt-6 space-y-3 text-sm text-gray-600 dark:text-gray-300">
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">Simplified, clean booking flow</div>
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">Comfortable reading layout for trip plans</div>
              <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">Optimized for mobile and desktop browsing</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Theme;