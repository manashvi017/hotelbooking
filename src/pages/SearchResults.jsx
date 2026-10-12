import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { MapPin, Search } from "lucide-react";

import HotelCard from "../components/HotelCard";
import { getHotels } from "../services/api";

function SearchResults() {
  const [searchParams, setSearchParams] = useSearchParams();

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const initialQuery = searchParams.get("q") || "";
  const initialCity = searchParams.get("city") || "";

  const [query, setQuery] = useState(initialQuery);
  const [selectedCity, setSelectedCity] = useState(initialCity);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getHotels();

        let hotelList = [];

        if (Array.isArray(data)) hotelList = data;
        else if (Array.isArray(data.hotels)) hotelList = data.hotels;
        else if (Array.isArray(data.data)) hotelList = data.data;
        else if (Array.isArray(data.results)) hotelList = data.results;

        setHotels(hotelList);
      } catch (err) {
        console.error("Search Results API Error:", err);
        setError("Unable to load hotels for your search.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams();

    if (query.trim()) params.set("q", query.trim());
    if (selectedCity) params.set("city", selectedCity);

    setSearchParams(params, { replace: true });
  }, [query, selectedCity, setSearchParams]);

  const cities = useMemo(
    () => [
      ...new Set(
        hotels
          .map((hotel) => hotel.city || hotel.location || hotel.address)
          .filter(Boolean)
      ),
    ],
    [hotels]
  );

  const filteredHotels = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return hotels.filter((hotel) => {
      const hotelName = (hotel.name || hotel.hotel_name || hotel.hotelName || "").toLowerCase();
      const hotelCity = (hotel.city || hotel.location || hotel.address || "").toLowerCase();
      const textMatch =
        !normalizedQuery ||
        hotelName.includes(normalizedQuery) ||
        hotelCity.includes(normalizedQuery);

      const cityMatch = !selectedCity || hotelCity === selectedCity.toLowerCase();

      return textMatch && cityMatch;
    });
  }, [hotels, query, selectedCity]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-10 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">
          <div className="h-28 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
          <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div key={index} className="h-80 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Something went wrong</h1>
          <p className="mt-3 text-gray-500 dark:text-gray-400">{error}</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-gray-900 px-6 py-3 font-medium text-white dark:bg-white dark:text-gray-900"
          >
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-7xl">
        <div className="mb-8 rounded-[30px] border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="grid gap-4 md:grid-cols-[1fr_220px]">
            <div className="relative">
              <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search hotels or cities..."
                className="w-full rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition focus:border-sky-500 dark:border-gray-700 dark:bg-gray-800"
              />
            </div>

            <div className="relative">
              <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <select
                value={selectedCity}
                onChange={(e) => setSelectedCity(e.target.value)}
                className="w-full appearance-none rounded-2xl border border-gray-200 bg-gray-50 py-3.5 pl-11 pr-4 outline-none transition dark:border-gray-700 dark:bg-gray-800"
              >
                <option value="">All cities</option>
                {cities.map((city) => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="mb-6 flex items-end justify-between gap-3">
          <div>
            <p className="text-sm uppercase tracking-[3px] text-gray-500">Results</p>
            <h1 className="mt-2 text-3xl font-bold">
              {query || selectedCity ? "Matching stays" : "Browse all stays"}
            </h1>
          </div>

          <p className="text-sm text-gray-500 dark:text-gray-400">{filteredHotels.length} hotels found</p>
        </div>

        {filteredHotels.length === 0 ? (
          <div className="rounded-[30px] border border-dashed border-gray-300 bg-white px-6 py-16 text-center dark:border-gray-700 dark:bg-gray-900">
            <h2 className="text-xl font-semibold">No stays matched your search</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try a different city or search term.
            </p>
            <button
              onClick={() => {
                setQuery("");
                setSelectedCity("");
              }}
              className="mt-5 rounded-xl bg-gray-900 px-5 py-3 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
            {filteredHotels.map((hotel, index) => (
              <HotelCard key={hotel.id || `${hotel.name}-${index}`} hotel={hotel} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchResults;