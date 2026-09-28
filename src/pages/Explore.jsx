import { useEffect, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  MapPin,
  Search,
  Sparkles,
} from "lucide-react";
import { Link } from "react-router-dom";

import { getHotels } from "../services/api";

function Explore() {
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [destinationSearch, setDestinationSearch] = useState("");

  // Hero slider
  const [sliderImages, setSliderImages] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

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
      } catch (err) {
        console.error("Explore API Error:", err);
        setError("Unable to load destinations.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);

  // --------------------------------
  // CREATE RANDOM 5 IMAGE SLIDER
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

    const uniqueImages = [...new Set(images)];

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
  // DESTINATIONS
  // --------------------------------

  const destinationMap = {};

  hotels.forEach((hotel) => {
    const destination =
      hotel.city ||
      hotel.location ||
      hotel.address ||
      "India";

    if (!destinationMap[destination]) {
      destinationMap[destination] = {
        name: destination,
        image:
          hotel.image ||
          hotel.image_url ||
          hotel.imageUrl ||
          hotel.photo ||
          hotel.photo_url ||
          hotel.thumbnail ||
          "",
        count: 0,
      };
    }

    destinationMap[destination].count += 1;
  });

  const destinations = Object.values(destinationMap);

  const filteredDestinations = destinations.filter((destination) =>
    destination.name
      .toLowerCase()
      .includes(destinationSearch.toLowerCase())
  );

  // --------------------------------
  // SLIDER CONTROLS
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
        <div className="mx-auto max-w-7xl px-6 py-10">

          <div className="h-[500px] animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <div
                key={index}
                className="h-64 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800"
              />
            ))}
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
      <div className="flex min-h-[70vh] items-center justify-center bg-gray-50 dark:bg-gray-950">
        <div className="text-center">

          <h1 className="text-2xl font-bold">
            Something went wrong
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            {error}
          </p>

        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* =====================================
          EXPLORE HERO SLIDER
      ====================================== */}

      <section className="mx-auto max-w-7xl px-6 pt-8">

        <div className="relative min-h-[540px] overflow-hidden rounded-[32px] bg-gray-900 shadow-[0_30px_80px_rgba(15,23,42,0.22)] ring-1 ring-white/10">

          <div className="soft-grid absolute inset-0 opacity-30" />

          <div className="hero-orb left-10 top-14 h-32 w-32 bg-cyan-400/35 animate-float" />
          <div className="hero-orb right-16 top-16 h-40 w-40 bg-violet-500/25 animate-float-delay" />
          <div className="hero-orb bottom-14 left-1/3 h-32 w-32 bg-emerald-400/20 animate-float" />

          {sliderImages.length > 0 ? (
            <img
              key={sliderImages[currentSlide]}
              src={sliderImages[currentSlide]}
              alt="Explore destinations"
              className="absolute inset-0 h-full w-full object-cover transition-all duration-1000 ease-out"
              style={{ transform: "scale(1.08)" }}
              onError={(e) => {
                e.currentTarget.style.display = "none";
              }}
            />
          ) : (
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_#1e293b,_#020817_60%)]" />
          )}

          <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(2,6,23,0.82),rgba(15,23,42,0.34),rgba(15,23,42,0.72))]" />

          <div className="relative z-10 flex min-h-[540px] items-center px-8 py-16 sm:px-12 lg:px-16">

            <div className="max-w-2xl text-white">

              <div className="mb-5 flex items-center gap-2 text-sm font-semibold uppercase tracking-[4px] text-cyan-100 animate-fade-up">
                <Sparkles size={17} className="text-cyan-300" />
                Explore StaySphere
              </div>

              <h1 className="animate-fade-up text-4xl font-black leading-[1.05] tracking-tight sm:text-5xl lg:text-6xl">
                Discover places
                <br />
                worth staying in.
              </h1>

              <p className="mt-5 max-w-xl text-base leading-7 text-slate-200 sm:text-lg animate-slide-in-right">
                Explore beautiful destinations, discover unique
                stays, and find the perfect place for your next
                journey.
              </p>

              <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center">
                <Link
                  to="/"
                  className="hero-cta inline-flex items-center gap-2 rounded-full bg-white px-6 py-3.5 font-semibold text-slate-900 shadow-[0_12px_30px_rgba(255,255,255,0.25)] transition hover:-translate-y-0.5 hover:bg-slate-100"
                >
                  Explore Hotels
                  <ArrowRight size={18} />
                </Link>

                <div className="glass-panel inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm text-white/90">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />
                  4.9 guest rating
                </div>
              </div>

              <div className="mt-10 grid max-w-lg grid-cols-3 gap-3 text-left">
                {[
                  { label: "12k+", sub: "stays" },
                  { label: "120", sub: "cities" },
                  { label: "24/7", sub: "support" },
                ].map((item, index) => (
                  <div
                    key={item.label}
                    className="glass-panel animate-fade-up rounded-2xl p-3"
                    style={{ animationDelay: `${index * 120}ms` }}
                  >
                    <div className="text-xl font-bold text-white">{item.label}</div>
                    <div className="text-xs uppercase tracking-[0.2em] text-slate-300">{item.sub}</div>
                  </div>
                ))}
              </div>

            </div>

          </div>

          {sliderImages.length > 1 && (
            <button
              onClick={previousSlide}
              aria-label="Previous image"
              className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:scale-110"
            >
              <ChevronLeft size={22} />
            </button>
          )}

          {sliderImages.length > 1 && (
            <button
              onClick={nextSlide}
              aria-label="Next image"
              className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:scale-110"
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

      {/* =====================================
          DESTINATION SEARCH
      ====================================== */}

      <section className="mx-auto max-w-7xl px-6 py-12">

        <div className="mb-8 animate-fade-up">

          <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
            Destinations
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Where do you want to stay?
          </h2>

        </div>

        <div className="relative max-w-xl animate-fade-up">

          <Search
            size={19}
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
          />

          <input
            type="text"
            value={destinationSearch}
            onChange={(e) =>
              setDestinationSearch(e.target.value)
            }
            placeholder="Search destinations..."
            className="w-full rounded-2xl border border-gray-200 bg-white/80 py-4 pl-11 pr-4 text-gray-900 shadow-[0_10px_25px_rgba(15,23,42,0.05)] outline-none transition duration-300 focus:border-sky-500 focus:shadow-[0_10px_30px_rgba(59,130,246,0.15)] dark:border-gray-700 dark:bg-gray-900/80 dark:text-white dark:focus:border-sky-400"
          />

        </div>

      </section>

      {/* =====================================
          DESTINATION CARDS
      ====================================== */}

      <section className="mx-auto max-w-7xl px-6 pb-16">

        {filteredDestinations.length === 0 ? (
          <div className="rounded-3xl bg-white py-16 text-center dark:bg-gray-900">

            <h3 className="text-xl font-semibold">
              No destinations found
            </h3>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Try another destination.
            </p>

          </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

            {filteredDestinations
              .slice(0, 6)
              .map((destination, index) => (
                <Link
                  key={destination.name}
                  to={`/?city=${encodeURIComponent(
                    destination.name
                  )}`}
                  className="destination-card group relative h-72 overflow-hidden rounded-[28px] shadow-[0_20px_40px_rgba(15,23,42,0.12)] transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_55px_rgba(15,23,42,0.18)] animate-fade-up"
                  style={{ animationDelay: `${index * 120}ms` }}
                >

                  {destination.image ? (
                    <img
                      src={destination.image}
                      alt={destination.name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="h-full w-full bg-[radial-gradient(circle_at_top,_#475569,_#0f172a_70%)]" />
                  )}

                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <div className="absolute bottom-0 left-0 right-0 p-6 text-white">

                    <div className="flex items-center gap-2">

                      <MapPin size={17} className="text-cyan-300" />

                      <h3 className="text-2xl font-bold">
                        {destination.name}
                      </h3>

                    </div>

                    <p className="mt-2 text-sm text-gray-200">
                      {destination.count}{" "}
                      {destination.count === 1
                        ? "hotel"
                        : "hotels"}{" "}
                      available
                    </p>

                  </div>

                </Link>
              ))}

          </div>
        )}

      </section>

      {/* =====================================
          WHY STAYSPHERE
      ====================================== */}

      <section className="bg-white py-20 dark:bg-gray-900">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mx-auto max-w-2xl text-center">

            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Why StaySphere
            </p>

            <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
              Travel made simple
            </h2>

            <p className="mt-4 leading-7 text-gray-500 dark:text-gray-400">
              Everything you need to discover, compare, and
              book your perfect stay.
            </p>

          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">

            {[
              {
                icon: Search,
                title: "Easy Discovery",
                text: "Find hotels and destinations quickly with powerful search and filters.",
              },
              {
                icon: MapPin,
                title: "Beautiful Destinations",
                text: "Explore different cities and discover stays that match your travel plans.",
              },
              {
                icon: Sparkles,
                title: "Simple Booking",
                text: "Select your stay, choose your dates, and book your trip with ease.",
              },
            ].map(({ icon: Icon, title, text }, index) => (
              <div
                key={title}
                className="feature-card shimmer-card rounded-[28px] border border-slate-200/80 bg-white/70 p-8 dark:border-slate-700 dark:bg-slate-800/80"
                style={{ animationDelay: `${index * 120}ms` }}
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-slate-900 to-slate-700 text-white shadow-lg dark:from-white dark:to-slate-200 dark:text-slate-900">
                  <Icon size={22} />
                </div>

                <h3 className="mt-6 text-xl font-bold">
                  {title}
                </h3>

                <p className="mt-3 leading-7 text-gray-500 dark:text-gray-400">
                  {text}
                </p>
              </div>
            ))}

          </div>

        </div>

      </section>

      {/* =====================================
          FEATURED STAYS
      ====================================== */}

      <section className="mx-auto max-w-7xl px-6 py-20">

        <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">

          <div>

            <p className="text-sm font-semibold uppercase tracking-widest text-gray-500 dark:text-gray-400">
              Featured
            </p>

            <h2 className="mt-2 text-3xl font-bold">
              Featured stays
            </h2>

          </div>

          <Link
            to="/"
            className="flex items-center gap-2 text-sm font-semibold hover:underline"
          >
            View all
            <ArrowRight size={16} />
          </Link>

        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">

          {hotels.slice(0, 6).map((hotel, index) => {
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
              "Beautiful Hotel";

            const location =
              hotel.city ||
              hotel.location ||
              hotel.address ||
              "India";

            return (
              <Link
                key={hotel.id || index}
                to={`/hotel/${hotel.id}`}
                className="group animate-fade-up overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_18px_35px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_24px_46px_rgba(15,23,42,0.14)] dark:border-slate-800 dark:bg-slate-900"
                style={{ animationDelay: `${index * 110}ms` }}
              >

                <div className="h-64 overflow-hidden bg-gray-200 dark:bg-gray-800">

                  {image ? (
                    <img
                      src={image}
                      alt={name}
                      className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
                      onError={(e) => {
                        e.currentTarget.style.display = "none";
                      }}
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center text-gray-400">
                      No Image
                    </div>
                  )}

                </div>

                <div className="p-5">

                  <h3 className="text-xl font-bold">
                    {name}
                  </h3>

                  <div className="mt-2 flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} className="text-cyan-500" />
                    {location}
                  </div>

                </div>

              </Link>
            );
          })}

        </div>

      </section>

    </div>
  );
}

export default Explore;