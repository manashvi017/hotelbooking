import { useEffect, useMemo, useState } from "react";
import {
  Search,
  MapPin,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import HotelCard from "../components/HotelCard";
import { getHotels } from "../services/api";

function Home() {
  // ================= STATES =================

  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Search
  const [search, setSearch] = useState("");

  // Filters
  const [priceFilter, setPriceFilter] = useState("all");
  const [cityFilter, setCityFilter] = useState("all");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);

  // 45 hotels per page
  const hotelsPerPage = 45;


  // ================= FETCH HOTELS =================

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        setLoading(true);
        setError("");

        const data = await getHotels();

        console.log("API DATA:", data);

        /*
          API different formats ko handle kar rahe hain
        */

        if (Array.isArray(data)) {
          setHotels(data);
        } else if (Array.isArray(data.hotels)) {
          setHotels(data.hotels);
        } else if (Array.isArray(data.data)) {
          setHotels(data.data);
        } else if (Array.isArray(data.results)) {
          setHotels(data.results);
        } else {
          setHotels([]);
          setError("Hotel data format is not correct.");
        }
      } catch (error) {
        console.error("API ERROR:", error);
        setError("Unable to load hotels.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotels();
  }, []);


  // ================= GET CITIES =================

  const cities = useMemo(() => {
    const cityList = hotels
      .map(
        (hotel) =>
          hotel.city ||
          hotel.location ||
          hotel.address ||
          ""
      )
      .filter(Boolean);

    return [...new Set(cityList)];
  }, [hotels]);


  // ================= FILTER HOTELS =================

  const filteredHotels = useMemo(() => {
    return hotels.filter((hotel) => {

      // Hotel name
      const hotelName = String(
        hotel.name ||
          hotel.hotel_name ||
          hotel.hotelName ||
          ""
      ).toLowerCase();

      // Location
      const hotelLocation = String(
        hotel.location ||
          hotel.city ||
          hotel.address ||
          ""
      ).toLowerCase();

      // Search value
      const searchValue = search.toLowerCase().trim();

      // Search matching
      const matchesSearch =
        hotelName.includes(searchValue) ||
        hotelLocation.includes(searchValue);


      // ================= PRICE =================

      const price = Number(
        hotel.price ||
          hotel.cost ||
          hotel.rate ||
          0
      );

      let matchesPrice = true;

      if (priceFilter === "under3000") {
        matchesPrice = price < 3000;
      }

      if (priceFilter === "3000to5000") {
        matchesPrice =
          price >= 3000 && price <= 5000;
      }

      if (priceFilter === "above5000") {
        matchesPrice = price > 5000;
      }


      // ================= CITY =================

      const hotelCity = String(
        hotel.city ||
          hotel.location ||
          hotel.address ||
          ""
      );

      const matchesCity =
        cityFilter === "all" ||
        hotelCity === cityFilter;


      // ================= FINAL RESULT =================

      return (
        matchesSearch &&
        matchesPrice &&
        matchesCity
      );
    });
  }, [
    hotels,
    search,
    priceFilter,
    cityFilter,
  ]);


  // ================= PAGINATION =================

  const totalPages = Math.ceil(
    filteredHotels.length / hotelsPerPage
  );

  const startIndex =
    (currentPage - 1) * hotelsPerPage;

  const endIndex =
    startIndex + hotelsPerPage;

  const currentHotels = filteredHotels.slice(
    startIndex,
    endIndex
  );


  // ================= RESET PAGE =================

  useEffect(() => {
    setCurrentPage(1);
  }, [
    search,
    priceFilter,
    cityFilter,
  ]);


  // ================= PREVIOUS PAGE =================

  const goToPreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(
        (previousPage) => previousPage - 1
      );
    }
  };


  // ================= NEXT PAGE =================

  const goToNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(
        (previousPage) => previousPage + 1
      );
    }
  };


  // ================= UI =================

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* ================================================= */}
      {/* HERO SECTION */}
      {/* ================================================= */}

      <section className="relative overflow-hidden bg-gray-900 px-6 py-24 text-white dark:bg-black">

        <div className="mx-auto max-w-7xl">

          {/* HERO TEXT */}

          <div className="max-w-3xl">

            <p className="mb-4 text-sm uppercase tracking-[4px] text-gray-400">
              Stay • Explore • Enjoy
            </p>

            <h1 className="text-4xl font-bold leading-tight sm:text-5xl lg:text-6xl">

              Find your perfect

              <span className="block text-gray-400">
                stay anywhere.
              </span>

            </h1>

            <p className="mt-6 max-w-2xl text-lg leading-8 text-gray-400">

              Discover beautiful hotels, explore new
              destinations, and book your next
              unforgettable stay with StaySphere.

            </p>

          </div>


          {/* ================================================= */}
          {/* SEARCH BAR */}
          {/* ================================================= */}

          <div className="mt-10 max-w-4xl rounded-2xl bg-white p-3 shadow-2xl">

            <div className="grid gap-3 md:grid-cols-[1fr_auto]">

              {/* SEARCH INPUT */}

              <div className="flex items-center gap-3 rounded-xl bg-gray-100 px-4 py-3 text-gray-900">

                <MapPin
                  size={20}
                  className="text-gray-500"
                />

                <input
                  type="text"
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  placeholder="Search hotel or destination..."
                  className="w-full bg-transparent text-sm outline-none"
                />

              </div>


              {/* SEARCH BUTTON */}

              <button
                onClick={() => setCurrentPage(1)}
                className="flex items-center justify-center gap-2 rounded-xl bg-gray-900 px-7 py-3 font-medium text-white transition hover:bg-gray-700"
              >

                <Search size={18} />

                Search

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* ================================================= */}
      {/* HOTELS SECTION */}
      {/* ================================================= */}

      <section className="px-6 py-16">

        <div className="mx-auto max-w-7xl">


          {/* ================================================= */}
          {/* SECTION HEADER */}
          {/* ================================================= */}

          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">

            <div>

              <p className="text-sm uppercase tracking-[3px] text-gray-500">
                Explore stays
              </p>

              <h2 className="mt-2 text-3xl font-bold">
                Popular Hotels
              </h2>

              <p className="mt-2 text-gray-500 dark:text-gray-400">
                Discover places worth staying at.
              </p>

            </div>


            {/* HOTEL COUNT */}

            {!loading && !error && (

              <p className="text-sm text-gray-500 dark:text-gray-400">

                {filteredHotels.length} hotels found

              </p>

            )}

          </div>


          {/* ================================================= */}
          {/* FILTER */}
          {/* ================================================= */}

          {!loading && !error && (

            <div className="mb-8 flex flex-col gap-5 rounded-2xl bg-white p-5 shadow-sm dark:bg-gray-900 sm:flex-row sm:items-center sm:justify-between">

              {/* FILTER TEXT */}

              <div>

                <p className="text-sm font-semibold">
                  Filter
                </p>

                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                  Find hotels according to your preference
                </p>

              </div>


              {/* FILTER DROPDOWNS */}

              <div className="flex flex-col gap-3 sm:flex-row">


                {/* ================= PRICE FILTER ================= */}

                <select
                  value={priceFilter}
                  onChange={(e) =>
                    setPriceFilter(e.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white"
                >

                  <option value="all">
                    All Prices
                  </option>

                  <option value="under3000">
                    Under ₹3,000
                  </option>

                  <option value="3000to5000">
                    ₹3,000 – ₹5,000
                  </option>

                  <option value="above5000">
                    Above ₹5,000
                  </option>

                </select>


                {/* ================= CITY FILTER ================= */}

                <select
                  value={cityFilter}
                  onChange={(e) =>
                    setCityFilter(e.target.value)
                  }
                  className="rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 text-sm outline-none transition focus:border-gray-900 dark:border-gray-700 dark:bg-gray-800 dark:focus:border-white"
                >

                  <option value="all">
                    All Cities
                  </option>

                  {cities.map((city) => (

                    <option
                      key={city}
                      value={city}
                    >
                      {city}
                    </option>

                  ))}

                </select>

              </div>

            </div>

          )}


          {/* ================================================= */}
          {/* LOADING */}
          {/* ================================================= */}

          {loading && (

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

              {[1, 2, 3, 4, 5, 6, 7, 8].map(
                (item) => (

                  <div
                    key={item}
                    className="h-96 animate-pulse rounded-2xl bg-gray-200 dark:bg-gray-800"
                  />

                )
              )}

            </div>

          )}


          {/* ================================================= */}
          {/* ERROR */}
          {/* ================================================= */}

          {!loading && error && (

            <div className="rounded-2xl bg-red-50 p-8 text-center dark:bg-red-950/30">

              <p className="font-medium text-red-600 dark:text-red-400">
                {error}
              </p>

            </div>

          )}


          {/* ================================================= */}
          {/* HOTEL CARDS */}
          {/* ================================================= */}

          {!loading &&
            !error &&
            currentHotels.length > 0 && (

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {currentHotels.map(
                  (hotel, index) => (

                    <HotelCard
                      key={
                        hotel.id || index
                      }
                      hotel={hotel}
                    />

                  )
                )}

              </div>

            )}


          {/* ================================================= */}
          {/* NO RESULTS */}
          {/* ================================================= */}

          {!loading &&
            !error &&
            currentHotels.length === 0 && (

              <div className="rounded-2xl bg-white p-10 text-center shadow-sm dark:bg-gray-900">

                <h3 className="text-xl font-semibold">
                  No hotels found
                </h3>

                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Try changing your search or filters.
                </p>

              </div>

            )}


          {/* ================================================= */}
          {/* PAGINATION */}
          {/* ================================================= */}

          {!loading &&
            !error &&
            totalPages > 1 && (

              <div className="mt-12 flex flex-wrap items-center justify-center gap-3">


                {/* PREVIOUS */}

                <button
                  onClick={goToPreviousPage}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                >

                  <ChevronLeft size={18} />

                  Previous

                </button>


                {/* PAGE NUMBERS */}

                <div className="flex flex-wrap items-center gap-2">

                  {Array.from(
                    { length: totalPages },
                    (_, index) => index + 1
                  ).map((page) => (

                    <button
                      key={page}
                      onClick={() =>
                        setCurrentPage(page)
                      }
                      className={`h-10 w-10 rounded-xl text-sm font-medium transition ${
                        currentPage === page
                          ? "bg-gray-900 text-white dark:bg-white dark:text-gray-900"
                          : "border border-gray-200 bg-white hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                      }`}
                    >
                      {page}
                    </button>

                  ))}

                </div>


                {/* NEXT */}

                <button
                  onClick={goToNextPage}
                  disabled={
                    currentPage === totalPages
                  }
                  className="flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium transition hover:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-40 dark:border-gray-700 dark:bg-gray-900 dark:hover:bg-gray-800"
                >

                  Next

                  <ChevronRight size={18} />

                </button>

              </div>

            )}

        </div>

      </section>

    </div>
  );
}

export default Home;