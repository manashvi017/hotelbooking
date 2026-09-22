import {
  Heart,
  MapPin,
  Star,
  ArrowRight,
} from "lucide-react";

import { Link } from "react-router-dom";

import { useWishlist } from "../context/WishlistContext";

function Favorites() {
  const { wishlist, toggleWishlist } = useWishlist();

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-gray-900 dark:bg-gray-950 dark:text-white">

      <div className="mx-auto max-w-7xl">

        {/* HEADER */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[3px] text-gray-500">
            Your saved stays
          </p>

          <h1 className="mt-2 text-3xl font-bold">
            My Wishlist
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Hotels you saved for your next trip.
          </p>
        </div>

        {/* EMPTY WISHLIST */}
        {wishlist.length === 0 && (
          <div className="rounded-3xl bg-white p-12 text-center shadow-sm dark:bg-gray-900">

            <Heart
              size={50}
              className="mx-auto text-gray-300"
            />

            <h2 className="mt-5 text-xl font-semibold">
              Your wishlist is empty
            </h2>

            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Start saving hotels you love.
            </p>

            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-gray-900 px-6 py-3 font-medium text-white dark:bg-white dark:text-gray-900"
            >
              Explore Hotels
            </Link>

          </div>
        )}

        {/* WISHLIST HOTELS */}
        {wishlist.length > 0 && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

            {wishlist.map((hotel) => {

              const image =
                hotel.image ||
                hotel.image_url ||
                hotel.imageUrl ||
                hotel.photo ||
                hotel.photo_url ||
                hotel.thumbnail ||
                "";

              const hotelName =
                hotel.name ||
                hotel.hotel_name ||
                hotel.hotelName ||
                "Beautiful Hotel";

              const location =
                hotel.location ||
                hotel.city ||
                hotel.address ||
                "India";

              const price =
                hotel.price ||
                hotel.cost ||
                hotel.rate ||
                "2,999";

              const rating =
                hotel.rating ||
                hotel.stars ||
                "4.5";

              return (
                <div
                  key={hotel.id}
                  className="group overflow-hidden rounded-2xl bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl dark:bg-gray-900"
                >

                  {/* IMAGE */}
                  <div className="relative h-56 overflow-hidden bg-gray-200 dark:bg-gray-800">

                    {image ? (
                      <img
                        src={image}
                        alt={hotelName}
                        className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-gray-400">
                        No Image Available
                      </div>
                    )}

                    {/* HEART */}
                    <button
                      onClick={() => toggleWishlist(hotel)}
                      className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition hover:scale-110"
                    >
                      <Heart
                        size={20}
                        className="fill-red-500 text-red-500"
                      />
                    </button>

                    {/* RATING */}
                    <div className="absolute left-4 top-4 flex items-center gap-1 rounded-full bg-white px-3 py-1.5 text-sm font-semibold text-gray-900 shadow-md">
                      <Star
                        size={15}
                        fill="currentColor"
                      />

                      {rating}
                    </div>

                  </div>

                  {/* HOTEL DETAILS */}
                  <div className="p-5">

                    <h3 className="line-clamp-1 text-xl font-bold text-gray-900 dark:text-white">
                      {hotelName}
                    </h3>

                    {/* LOCATION */}
                    <div className="mt-2 flex items-center gap-1.5 text-sm text-gray-500 dark:text-gray-400">

                      <MapPin size={16} />

                      <span>
                        {location}
                      </span>

                    </div>

                    {/* PRICE + VIEW */}
                    <div className="mt-5 flex items-center justify-between">

                      <div>
                        <span className="text-xl font-bold text-gray-900 dark:text-white">
                          ₹{price}
                        </span>

                        <span className="ml-1 text-sm text-gray-500 dark:text-gray-400">
                          / night
                        </span>
                      </div>

                      <Link
                        to={`/hotel/${hotel.id}`}
                        className="flex items-center gap-2 rounded-full bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                      >
                        View

                        <ArrowRight size={16} />
                      </Link>

                    </div>

                  </div>

                </div>
              );
            })}

          </div>
        )}

      </div>
    </div>
  );
}

export default Favorites;