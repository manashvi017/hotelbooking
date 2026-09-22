import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  MapPin,
  Star,
} from "lucide-react";

import { getHotels } from "../services/api";
import { useWishlist } from "../context/WishlistContext";
import useAuth from "../hooks/useAuth";

function HotelDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
   const { user } = useAuth();

  const { toggleWishlist, isInWishlist } = useWishlist();

  const [hotel, setHotel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const fetchHotel = async () => {
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

        const selectedHotel = hotelList.find(
          (item) => String(item.id) === String(id)
        );

        if (!selectedHotel) {
          setError("Hotel not found.");
          return;
        }

        setHotel(selectedHotel);
      } catch (err) {
        console.error("Hotel Details Error:", err);
        setError("Unable to load hotel details.");
      } finally {
        setLoading(false);
      }
    };

    fetchHotel();
  }, [id]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 px-6 py-16 dark:bg-gray-950">
        <div className="mx-auto max-w-7xl">

          <div className="h-8 w-32 animate-pulse rounded bg-gray-200 dark:bg-gray-800" />

          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            <div className="h-[500px] animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="h-60 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-60 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-60 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
              <div className="h-60 animate-pulse rounded-3xl bg-gray-200 dark:bg-gray-800" />
            </div>
          </div>

        </div>
      </div>
    );
  }

  // Error
  if (error || !hotel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <div className="text-center">

          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {error || "Hotel not found"}
          </h1>

          <p className="mt-3 text-gray-500 dark:text-gray-400">
            We couldn't find the hotel you're looking for.
          </p>

          <Link
            to="/"
            className="mt-6 inline-flex rounded-xl bg-gray-900 px-6 py-3 font-medium text-white dark:bg-white dark:text-gray-900"
          >
            Back to Hotels
          </Link>

        </div>
      </div>
    );
  }

  // Hotel information
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

  const description =
    hotel.description ||
    hotel.about ||
    hotel.details ||
    "Enjoy a comfortable and memorable stay at this beautiful property.";

  // Get available images
  const mainImage =
    hotel.image ||
    hotel.image_url ||
    hotel.imageUrl ||
    hotel.photo ||
    hotel.photo_url ||
    hotel.thumbnail ||
    "";

  let images = [];

  if (Array.isArray(hotel.images)) {
    images = hotel.images.filter(Boolean);
  }

  if (images.length === 0 && mainImage) {
    images = [mainImage];
  }

  if (images.length === 0) {
    images = [""];
  }

  // If API has only one image, repeat it for the gallery
  if (images.length === 1 && images[0]) {
    images = [
      images[0],
      images[0],
      images[0],
      images[0],
    ];
  }

  const liked = isInWishlist(hotel.id);

  const nextImage = () => {
    setCurrentImage((previous) =>
      previous === images.length - 1
        ? 0
        : previous + 1
    );
  };

  const previousImage = () => {
    setCurrentImage((previous) =>
      previous === 0
        ? images.length - 1
        : previous - 1
    );
  };

  const handleBooking = () => {
  navigate("/booking", {
    state: {
      hotel: hotel,
    },
  });
};

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 dark:bg-gray-950 dark:text-white">

      {/* PAGE */}
      <div className="mx-auto max-w-7xl px-6 py-10">

        {/* BACK */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Back
        </button>

        {/* IMAGE GALLERY */}
        <div className="grid gap-4 lg:grid-cols-2">

          {/* MAIN IMAGE */}
          <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800 sm:h-[500px]">

            {images[currentImage] ? (
              <img
                src={images[currentImage]}
                alt={hotelName}
                className="h-full w-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = "none";
                }}
              />
            ) : (
              <div className="flex h-full items-center justify-center text-gray-400">
                No Image Available
              </div>
            )}

            {/* PREVIOUS */}
            {images.length > 1 && (
              <button
                onClick={previousImage}
                className="absolute left-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:scale-105"
              >
                <ArrowLeft size={20} />
              </button>
            )}

            {/* NEXT */}
            {images.length > 1 && (
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-gray-900 shadow-lg transition hover:scale-105"
              >
                <ArrowRight size={20} />
              </button>
            )}

            {/* WISHLIST */}
            <button
              onClick={() => toggleWishlist(hotel)}
              className="absolute right-5 top-5 flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-110"
            >
              <Heart
                size={21}
                className={
                  liked
                    ? "fill-red-500 text-red-500"
                    : "text-gray-700"
                }
              />
            </button>

          </div>

          {/* THUMBNAILS */}
          <div className="grid grid-cols-2 gap-4">

            {images.slice(0, 4).map((image, index) => (
              <button
                key={`${image}-${index}`}
                onClick={() => setCurrentImage(index)}
                className={`relative overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800 ${
                  currentImage === index
                    ? "ring-2 ring-gray-900 dark:ring-white"
                    : ""
                }`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={`${hotelName} ${index + 1}`}
                    className="h-full w-full object-cover transition duration-300 hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.style.display = "none";
                    }}
                  />
                ) : (
                  <div className="flex h-full items-center justify-center text-gray-400">
                    No Image
                  </div>
                )}
              </button>
            ))}

          </div>
        </div>

        {/* HOTEL INFORMATION */}
        <div className="mt-10 grid gap-10 lg:grid-cols-[1fr_360px]">

          {/* LEFT */}
          <div>

            {/* TITLE */}
            <div className="flex flex-col gap-5 sm:flex-row sm:items-start sm:justify-between">

              <div>

                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                  <MapPin size={17} />
                  {location}
                </div>

                <h1 className="mt-3 text-3xl font-bold sm:text-4xl">
                  {hotelName}
                </h1>

              </div>

              {/* RATING */}
              <div className="flex w-fit items-center gap-2 rounded-xl bg-gray-900 px-4 py-3 text-white dark:bg-white dark:text-gray-900">

                <Star
                  size={18}
                  fill="currentColor"
                />

                <span className="font-semibold">
                  {rating}
                </span>

              </div>

            </div>

            {/* DESCRIPTION */}
            <div className="mt-8">

              <h2 className="text-2xl font-bold">
                About this stay
              </h2>

              <p className="mt-4 max-w-3xl leading-7 text-gray-600 dark:text-gray-400">
                {description}
              </p>

            </div>

          </div>

          {/* BOOKING CARD */}
          <div>

            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <div className="flex items-end justify-between">

                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Starting from
                  </p>

                  <p className="mt-1 text-3xl font-bold">
                    ₹{price}
                  </p>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    / night
                  </p>
                </div>

              </div>

              <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

              {/* LOCATION */}
              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <MapPin size={18} />
                </div>

                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Location
                  </p>

                  <p className="text-sm font-medium">
                    {location}
                  </p>
                </div>

              </div>

              {/* BOOK NOW */}
              <button
                onClick={handleBooking}
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-2xl bg-gray-900 py-4 font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Book Now
                <ArrowRight size={18} />
              </button>

              {/* WISHLIST */}
              <button
                onClick={() => toggleWishlist(hotel)}
                className="mt-3 flex w-full items-center justify-center gap-2 rounded-2xl border border-gray-200 py-4 font-medium transition hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-800"
              >
                <Heart
                  size={18}
                  className={
                    liked
                      ? "fill-red-500 text-red-500"
                      : ""
                  }
                />

                {liked
                  ? "Saved to Wishlist"
                  : "Add to Wishlist"}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                You can review your booking details before payment.
              </p>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}

export default HotelDetails;