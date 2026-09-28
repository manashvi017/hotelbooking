import { useEffect, useState } from "react";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import HotelCard from "../components/HotelCard";
import { getHotels } from "../services/api";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [filteredHotels, setFilteredHotels] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search and filters
  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [priceFilter, setPriceFilter] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // Hero slider
  const [sliderImages, setSliderImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const hotelsPerPage = 45;

  // --------------------------------
  // FETCH HOTELS
  // --------------------------------

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getHotels();

        let hotelList = [];

        // API can return different structures
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
        setFilteredHotels(hotelList);
      } catch (err) {
        console.error("Home API Error:", err);
        setError("Unable to load hotels. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // --------------------------------
  // GET 5 RANDOM IMAGES FOR SLIDER
  // --------------------------------

  useEffect(() => {
    if (hotels.length === 0) return;

    const images = hotels
      .map(
        (hotel) =>
          hotel.image ||
          hotel.image_url ||
          hotel.imageUrl ||
          hotel.photo ||
          hotel.photo_url ||
          hotel.thumbnail
      )
      .filter(Boolean);

    // Remove duplicate images
    const uniqueImages = [...new Set(images)];

    // Shuffle images randomly
    const randomImages = [...uniqueImages]
      .sort(() => Math.random() - 0.5)
      .slice(0, 5);

    setSliderImages(randomImages);
    setCurrentSlide(0);
  }, [hotels]);

  // --------------------------------
  // AUTO SLIDER
  // --------------------------------

  useEffect(() => {
    if (sliderImages.length <= 1) return;

    const interval = setInterval(() => {
      setCurrentSlide((previous) =>
        previous === sliderImages.length - 1
          ? 0
          : previous + 1
      );
    }, 4000);

    return () => clearInterval(interval);
  }, [sliderImages]);

  // --------------------------------
  // GET CITIES
  // --------------------------------

  const cities = [
    ...new Set(
      hotels
        .map(
          (hotel) =>
            hotel.city ||
            hotel.location ||
            hotel.address
        )
        .filter(Boolean)
    ),
  ];

  // --------------------------------
  // SEARCH + FILTER
  // --------------------------------

  useEffect(() => {
    let result = [...hotels];

    // Search
    if (search.trim()) {
      const searchValue = search.toLowerCase();

      result = result.filter((hotel) => {
        const hotelName = (
          hotel.name ||
          hotel.hotel_name ||
          hotel.hotelName ||
          ""
        ).toLowerCase();

        const hotelCity = (
          hotel.city ||
          hotel.location ||
          hotel.address ||
          ""
        ).toLowerCase();

        return (
          hotelName.includes(searchValue) ||
          hotelCity.includes(searchValue)
        );
      });
    }

    // City filter
    if (city) {
      result = result.filter((hotel) => {
        const hotelCity =
          hotel.city ||
          hotel.location ||
          hotel.address ||
          "";

        return hotelCity === city;
      });
    }

    // Price filter
    if (priceFilter) {
      result = result.filter((hotel) => {
        const rawPrice =
          hotel.price ||
          hotel.cost ||
          hotel.rate ||
          0;

        const price = Number(
          String(rawPrice).replace(/[^0-9.]/g, "")
        );

        if (priceFilter === "under3000") {
          return price < 3000;
        }

        if (priceFilter === "3000to5000") {
          return price >= 3000 && price <= 5000;
        }

        if (priceFilter === "above5000") {
          return price > 5000;
        }

        return true;
      });
    }

    setFilteredHotels(result);
    setCurrentPage(1);
  }, [search, city, priceFilter, hotels]);

  // --------------------------------
  // PAGINATION
  // --------------------------------

  const totalPages = Math.ceil(
    filteredHotels.length / hotelsPerPage
  );

  const startIndex =
    (currentPage - 1) * hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    startIndex,
    startIndex + hotelsPerPage
  );

  // --------------------------------
  // SLIDER FUNCTIONS
  // --------------------------------

  const previousSlide = () => {
    setCurrentSlide((previous) =>
      previous === 0
        ? sliderImages.length - 1
        : previous - 1
    );
  };

  const nextSlide = () => {
    setCurrentSlide((previous) =>
      previous === sliderImages.length - 1
        ? 0
        : previous + 1
    );
  };

  // --------------------------------
  // LOADING
  // --------------------------------

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl px-6 py-12">

          <div className="h-[450px] animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map(
              (_, index) => (
                <div
                  key={index}
                  className="h-80 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
                />
              )
            )}
          </div>

        </div>
      </div>
    );
  }

  // --------------------------------
  // ERROR
  // --------------------------------

  if (error) {
    return (
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <div className="text-center">

          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Something went wrong
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            {error}
          </p>

          <button
            onClick={() => window.location.reload()}
            className="mt-6 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white dark:bg-white dark:text-gray-900"
          >
            Try Again
          </button>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent text-slate-900 dark:text-white">

      <section className="mx-auto max-w-7xl px-6 pt-8">

        <div className="relative min-h-[540px] overflow-hidden rounded-[32px] bg-slate-900 shadow-[0_30px_80px_rgba(15,23,42,0.20)] ring-1 ring-white/10">

          <div className="soft-grid absolute inset-0 opacity-30" />
          <div className="hero-orb left-10 top-14 h-32 w-32 bg-cyan-400/35 animate-float" />
          <div className="hero-orb right-14 top-12 h-40 w-40 bg-sky-500/25 animate-float-delay" />
          <div className="hero-orb bottom-8 left-1/3 h-36 w-36 bg-emerald-400/20 animate-float" />

          {sliderImages.length > 0 ? (
            <img
              key={sliderImages[currentSlide]}
              src={sliderImages[currentSlide]}
              alt="StaySphere Hotel"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out"
              style={{ transform: "scale(1.08)" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b,_#020817_60%)]" />
          )}

          <div className="absolute inset-0 bg-[linear-gradient(110deg,rgba(2,6,23,0.78),rgba(15,23,42,0.38),rgba(15,23,42,0.68))]" />

          <div className="relative z-10 flex min-h-[540px] items-center px-8 py-16 sm:px-12 lg:px-16">

            <div className="max-w-2xl text-white">

              <p className="mb-4 text-sm font-semibold uppercase tracking-[0.38rem] text-cyan-100 animate-fade-up">
                Welcome to StaySphere
              </p>

              <h1 className="animate-fade-up text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Find your perfect
                <br />
                stay anywhere.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg animate-slide-in-right">
                Discover beautiful hotels, explore amazing
                destinations, and book your next unforgettable
                stay.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/90">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                  4.9 guest rating
                </div>
                <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/90">
                  12k+ premium stays
                </div>
              </div>

            </div>

          </div>

          {sliderImages.length > 1 && (
            <button
              onClick={previousSlide}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:scale-110"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {sliderImages.length > 1 && (
            <button
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-slate-900 shadow-lg transition hover:scale-110"
            >
              <ChevronRight size={22} />
            </button>
          )}

          {sliderImages.length > 1 && (
            <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2">

              {sliderImages.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`h-2.5 rounded-full transition-all ${
                    currentSlide === index
                      ? "w-8 bg-white"
                      : "w-2.5 bg-white/50"
                  }`}
                />
              ))}

            </div>
          )}

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 py-10">

        <div className="rounded-[30px] border border-slate-200/80 bg-white/80 p-5 shadow-[0_18px_35px_rgba(15,23,42,0.06)] backdrop-blur-sm dark:border-slate-800 dark:bg-slate-900/80">

          <div className="grid gap-4 md:grid-cols-3">

            <div className="relative">

              <Search
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <input
                type="text"
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                placeholder="Search hotel or city..."
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition duration-300 focus:border-sky-500 focus:shadow-[0_10px_25px_rgba(59,130,246,0.12)] dark:border-slate-700 dark:bg-slate-800 dark:text-white dark:focus:border-sky-400"
              />

            </div>

            <div className="relative">

              <MapPin
                size={19}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
              />

              <select
                value={city}
                onChange={(e) =>
                  setCity(e.target.value)
                }
                className="w-full appearance-none rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-slate-900 outline-none transition dark:border-slate-700 dark:bg-slate-800 dark:text-white"
              >
                <option value="">
                  All Cities
                </option>

                {cities.map((item, index) => (
                  <option
                    key={`${item}-${index}`}
                    value={item}
                  >
                    {item}
                  </option>
                ))}

              </select>

            </div>

            <select
              value={priceFilter}
              onChange={(e) =>
                setPriceFilter(e.target.value)
              }
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3.5 text-slate-900 outline-none transition dark:border-slate-700 dark:bg-slate-800 dark:text-white"
            >
              <option value="">
                All Prices
              </option>

              <option value="under3000">
                Under ₹3,000
              </option>

              <option value="3000to5000">
                ₹3,000 - ₹5,000
              </option>

              <option value="above5000">
                Above ₹5,000
              </option>

            </select>

          </div>

        </div>

      </section>

      <section className="mx-auto max-w-7xl px-6 pb-16">

        <div className="mb-8 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-slate-500 dark:text-slate-400">
              Discover
            </p>

            <h2 className="mt-2 text-3xl font-black tracking-tight">
              Popular stays
            </h2>
          </div>

          <p className="text-sm font-medium text-slate-500 dark:text-slate-400">
            {filteredHotels.length} hotels found
          </p>

        </div>

        {currentHotels.length === 0 ? (
          <div className="rounded-[30px] border border-slate-200 bg-white py-20 text-center shadow-[0_18px_35px_rgba(15,23,42,0.06)] dark:border-slate-800 dark:bg-slate-900">

            <h3 className="text-xl font-semibold">
              No hotels found
            </h3>

            <p className="mt-2 text-slate-500 dark:text-slate-400">
              Try changing your search or filters.
            </p>

            <button
              onClick={() => {
                setSearch("");
                setCity("");
                setPriceFilter("");
              }}
              className="mt-5 rounded-xl bg-gradient-to-r from-slate-900 to-sky-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 dark:from-white dark:to-sky-200 dark:text-slate-900"
            >
              Clear Filters
            </button>

          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {currentHotels.map((hotel, index) => (
              <HotelCard
                key={hotel.id || index}
                hotel={hotel}
              />
            ))}

          </div>
        )}

        {totalPages > 1 && (
          <div className="mt-12 flex flex-wrap items-center justify-center gap-2">

            <button
              disabled={currentPage === 1}
              onClick={() =>
                setCurrentPage((prev) => prev - 1)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Previous
            </button>

            {Array.from(
              { length: totalPages },
              (_, index) => index + 1
            )
              .slice(
                Math.max(0, currentPage - 3),
                Math.min(totalPages, currentPage + 2)
              )
              .map((page) => (
                <button
                  key={page}
                  onClick={() =>
                    setCurrentPage(page)
                  }
                  className={`h-10 w-10 rounded-xl text-sm font-medium transition ${
                    currentPage === page
                      ? "bg-gradient-to-r from-slate-900 to-sky-600 text-white shadow-lg shadow-sky-500/20 dark:from-white dark:to-sky-200 dark:text-slate-900"
                      : "border border-slate-200 bg-white hover:bg-slate-100 dark:border-slate-700 dark:bg-slate-900 dark:hover:bg-slate-800"
                  }`}
                >
                  {page}
                </button>
              ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() =>
                setCurrentPage((prev) => prev + 1)
              }
              className="rounded-xl border border-slate-200 bg-white px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
            >
              Next
            </button>

          </div>
        )}

      </section>

    </div>
  );
}

export default Home;