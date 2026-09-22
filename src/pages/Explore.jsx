import { useEffect, useMemo, useState } from "react";
import {
  ArrowRight,
  Building2,
  MapPin,
  Search,
  Star,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getHotels } from "../services/api";

function Explore() {
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
        console.error("Explore API Error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // Create unique destinations from hotel data
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

  // Featured hotels
  const featuredHotels = hotels.slice(0, 6);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* HERO */}
      <section className="relative overflow-hidden bg-gray-900 px-6 py-24 text-white dark:bg-black">

        <div className="mx-auto max-w-7xl">

          <div className="max-w-3xl">

            <p className="text-sm uppercase tracking-[4px] text-gray-400">
              Explore StaySphere
            </p>

            <h1 className="mt-4 text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">
              Discover places
              <span className="block text-gray-400">
                worth staying in.
              </span>
            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">
              Explore destinations, discover beautiful stays,
              and find inspiration for your next journey.
            </p>

          </div>

          {/* SEARCH */}
          <div className="mt-10 max-w-3xl">

            <div className="flex items-center gap-3 rounded-2xl bg-white px-5 py-4 text-gray-900 shadow-2xl">

              <Search
                size={21}
                className="shrink-0 text-gray-500"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search a city or destination..."
                className="w-full bg-transparent text-sm outline-none"
              />

            </div>

          </div>

        </div>
      </section>

      {/* DESTINATIONS */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="mb-8">
            <p className="text-sm uppercase tracking-[3px] text-gray-500">
              Start exploring
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Explore Destinations
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Find your next place to stay.
            </p>
          </div>

          {loading ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-72 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"
                />
              ))}

            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

              {filteredDestinations
                .slice(0, 6)
                .map((destination) => (
                  <Link
                    key={destination.name}
                    to={`/?city=${encodeURIComponent(
                      destination.name
                    )}`}
                    className="group relative h-72 overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800"
                  >

                    {destination.image ? (
                      <img
                        src={destination.image}
                        alt={destination.name}
                        className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <MapPin
                          size={50}
                          className="text-gray-400"
                        />
                      </div>
                    )}

                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                    <div className="absolute bottom-6 left-6 right-6 flex items-end justify-between">

                      <div className="text-white">

                        <h3 className="text-2xl font-bold">
                          {destination.name}
                        </h3>

                        <p className="mt-1 text-sm text-gray-300">
                          {destination.count}{" "}
                          {destination.count === 1
                            ? "hotel"
                            : "hotels"}
                        </p>

                      </div>

                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-gray-900 transition group-hover:translate-x-1">
                        <ArrowRight size={18} />
                      </div>

                    </div>

                  </Link>
                ))}

            </div>
          )}

          {!loading &&
            filteredDestinations.length === 0 && (
              <div className="rounded-3xl bg-white p-12 text-center dark:bg-gray-900">

                <MapPin
                  size={45}
                  className="mx-auto text-gray-300"
                />

                <h3 className="mt-5 text-xl font-semibold">
                  No destination found
                </h3>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Try searching for another city.
                </p>

              </div>
            )}

        </div>
      </section>

      {/* WHY STAYSPHERE */}
      <section className="bg-white px-6 py-16 dark:bg-gray-900">

        <div className="mx-auto max-w-7xl">

          <div className="mb-10 text-center">

            <p className="text-sm uppercase tracking-[3px] text-gray-500">
              Why StaySphere
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Everything you need for a better stay
            </h2>

          </div>

          <div className="grid gap-6 md:grid-cols-3">

            {/* CARD 1 */}
            <div className="rounded-2xl border border-gray-200 p-7 dark:border-gray-800">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <Building2 size={22} />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Discover stays
              </h3>

              <p className="mt-2 leading-6 text-gray-500 dark:text-gray-400">
                Explore hotels across different destinations
                and find a place that matches your trip.
              </p>

            </div>

            {/* CARD 2 */}
            <div className="rounded-2xl border border-gray-200 p-7 dark:border-gray-800">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <MapPin size={22} />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Explore locations
              </h3>

              <p className="mt-2 leading-6 text-gray-500 dark:text-gray-400">
                Search cities and discover available hotels
                in the places you want to visit.
              </p>

            </div>

            {/* CARD 3 */}
            <div className="rounded-2xl border border-gray-200 p-7 dark:border-gray-800">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                <Star
                  size={22}
                  fill="currentColor"
                />
              </div>

              <h3 className="mt-5 text-xl font-semibold">
                Save your favorites
              </h3>

              <p className="mt-2 leading-6 text-gray-500 dark:text-gray-400">
                Save hotels to your wishlist and keep your
                favorite stays ready for later.
              </p>

            </div>

          </div>

        </div>
      </section>

      {/* FEATURED HOTELS */}
      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">

          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>
              <p className="text-sm uppercase tracking-[3px] text-gray-500">
                Handpicked for you
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Featured Stays
              </h2>
            </div>

            <Link
              to="/"
              className="flex items-center gap-2 text-sm font-semibold transition hover:gap-3"
            >
              View all hotels
              <ArrowRight size={17} />
            </Link>

          </div>

          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {featuredHotels.map((hotel, index) => {

              const image =
                hotel.image ||
                hotel.image_url ||
                hotel.imageUrl ||
                hotel.photo ||
                hotel.photo_url ||
                hotel.thumbnail ||
                "";

              const name =
                hotel.name ||
                hotel.hotel_name ||
                hotel.hotelName ||
                "Hotel";

              const location =
                hotel.city ||
                hotel.location ||
                hotel.address ||
                "India";

              const price =
                hotel.price ||
                hotel.cost ||
                hotel.rate ||
                "—";

              const rating =
                hotel.rating ||
                hotel.stars ||
                "4.5";

              return (
                <Link
                  key={hotel.id || index}
                  to={`/hotel/${hotel.id}`}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
                >

                  <div className="relative h-60 overflow-hidden bg-gray-200 dark:bg-gray-800">

                    {image ? (
                      <img
                        src={image}
                        alt={name}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No Image
                      </div>
                    )}

                    <div className="absolute right-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow">
                      <Star
                        size={14}
                        fill="currentColor"
                      />
                      {rating}
                    </div>

                  </div>

                  <div className="p-5">

                    <h3 className="line-clamp-1 text-xl font-bold">
                      {name}
                    </h3>

                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">

                      <MapPin size={16} />

                      {location}

                    </div>

                    <div className="mt-5">

                      <span className="text-xl font-bold">
                        ₹{price}
                      </span>

                      <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                        / night
                      </span>

                    </div>

                  </div>

                </Link>
              );
            })}

          </div>

        </div>
      </section>

      {/* FINAL CTA */}
      <section className="px-6 pb-16">

        <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-gray-900 px-8 py-14 text-center text-white dark:bg-black">

          <h2 className="text-3xl font-bold sm:text-4xl">
            Ready to find your next stay?
          </h2>

          <p className="mx-auto mt-4 max-w-xl text-gray-400">
            Explore our collection of hotels and start
            planning your next trip.
          </p>

          <Link
            to="/"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-white px-7 py-3.5 font-semibold text-gray-900 transition hover:bg-gray-200"
          >
            Explore Hotels
            <ArrowRight size={18} />
          </Link>

        </div>

      </section>

    </div>
  );
}

export default Explore;