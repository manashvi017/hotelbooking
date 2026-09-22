import { useEffect, useMemo, useState } from "react";
import { MapPin, Search, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

import { getHotels } from "../services/api";

function Destinations() {
  const [hotels, setHotels] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const data = await getHotels();

        let hotelList = [];

        if (Array.isArray(data)) {
          hotelList = data;
        } else if (Array.isArray(data.hotels)) {
          hotelList = data.hotels;
        } else if (Array.isArray(data.data)) {
          hotelList = data.data;
        } else if (Array.isArray(data.results)) {
          hotelList = data.results;
        }

        setHotels(hotelList);
      } catch (error) {
        console.error("Destination API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Create destination list from API hotel locations
  const destinations = useMemo(() => {
    const cityMap = {};

    hotels.forEach((hotel) => {
      const city =
        hotel.city ||
        hotel.location ||
        hotel.address ||
        "";

      if (!city) return;

      if (!cityMap[city]) {
        cityMap[city] = {
          name: city,
          count: 0,
          image:
            hotel.image ||
            hotel.image_url ||
            hotel.imageUrl ||
            hotel.photo ||
            hotel.photo_url ||
            hotel.thumbnail ||
            "",
        };
      }

      cityMap[city].count += 1;
    });

    return Object.values(cityMap);
  }, [hotels]);

  const filteredDestinations = destinations.filter(
    (destination) =>
      destination.name
        .toLowerCase()
        .includes(search.toLowerCase().trim())
  );

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* HERO */}
      <section className="bg-gray-900 px-6 py-20 text-white dark:bg-black">
        <div className="mx-auto max-w-7xl">

          <p className="text-sm uppercase tracking-[4px] text-gray-400">
            Explore the world
          </p>

          <h1 className="mt-4 max-w-3xl text-4xl font-bold leading-tight sm:text-5xl">
            Discover your next
            <span className="block text-gray-400">
              destination.
            </span>
          </h1>

          <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
            Explore destinations and find the perfect
            stay for your next adventure.
          </p>

          {/* SEARCH */}
          <div className="mt-10 max-w-2xl">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-xl">

              <Search
                size={20}
                className="shrink-0 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search destinations..."
                className="w-full bg-transparent outline-none"
              />

            </div>
          </div>

        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-sm uppercase tracking-[3px] text-gray-500">
                Places to explore
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Popular Destinations
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Choose a destination and discover available stays.
              </p>
            </div>

            {!loading && (
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {filteredDestinations.length} destinations
              </p>
            )}

          </div>

          {/* LOADING */}
          {loading && (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (
                  <div
                    key={item}
                    className="h-80 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"
                  />
                )
              )}

            </div>
          )}

          {/* DESTINATION CARDS */}
          {!loading &&
            filteredDestinations.length > 0 && (
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {filteredDestinations.map(
                  (destination) => (
                    <div
                      key={destination.name}
                      className="group overflow-hidden rounded-3xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
                    >

                      {/* IMAGE */}
                      <div className="relative h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">

                        {destination.image ? (
                          <img
                            src={destination.image}
                            alt={destination.name}
                            className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center text-gray-400">
                            <MapPin size={40} />
                          </div>
                        )}

                        {/* OVERLAY */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                        <div className="absolute bottom-5 left-5 text-white">

                          <h3 className="text-2xl font-bold">
                            {destination.name}
                          </h3>

                          <div className="mt-1 flex items-center gap-1.5 text-sm text-gray-200">
                            <MapPin size={15} />
                            <span>
                              {destination.count}{" "}
                              {destination.count === 1
                                ? "hotel"
                                : "hotels"}
                            </span>
                          </div>

                        </div>

                      </div>

                      {/* CARD FOOTER */}
                      <div className="flex items-center justify-between p-5">

                        <div>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            Explore stays in
                          </p>

                          <p className="mt-1 font-semibold">
                            {destination.name}
                          </p>
                        </div>

                        <Link
                          to={`/?city=${encodeURIComponent(
                            destination.name
                          )}`}
                          className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-900 text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                        >
                          <ArrowRight size={18} />
                        </Link>

                      </div>

                    </div>
                  )
                )}

              </div>
            )}

          {/* NO RESULTS */}
          {!loading &&
            filteredDestinations.length === 0 && (
              <div className="rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">

                <MapPin
                  size={45}
                  className="mx-auto text-gray-300"
                />

                <h3 className="mt-5 text-xl font-semibold">
                  No destinations found
                </h3>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Try searching for another destination.
                </p>

              </div>
            )}

        </div>

      </section>

    </div>
  );
}

export default Destinations;