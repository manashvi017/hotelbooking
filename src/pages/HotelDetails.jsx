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
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState("");
  const [reviews, setReviews] = useState([
    {
      name: "Aarav",
      stay: "Stayed 2 nights",
      rating: 5,
      comment: "Very clean room, friendly staff, and the location was perfect for sightseeing.",
    },
    {
      name: "Meher",
      stay: "Stayed 1 night",
      rating: 4,
      comment: "Comfortable bed and smooth check-in process. The breakfast spread was excellent.",
    },
    {
      name: "Rajat",
      stay: "Stayed 3 nights",
      rating: 5,
      comment: "Great ambience and the staff helped with every request. Definitely would return.",
    },
  ]);

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

  const normalizeImageEntry = (entry) => {
    if (!entry) return "";

    if (typeof entry === "string") {
      return entry.trim();
    }

    if (typeof entry === "object") {
      return [
        entry.url,
        entry.src,
        entry.image,
        entry.photo,
        entry.thumbnail,
      ]
        .filter(Boolean)
        .map((item) => String(item).trim())
        .find(Boolean) || "";
    }

    return "";
  };

  const galleryCandidates = [
    ...(Array.isArray(hotel?.photos) ? hotel.photos : []),
    ...(Array.isArray(hotel?.images) ? hotel.images : []),
    hotel?.image,
    hotel?.image_url,
    hotel?.imageUrl,
    hotel?.photo,
    hotel?.photo_url,
    hotel?.thumbnail,
  ]
    .map(normalizeImageEntry)
    .filter((url) => typeof url === "string" && url.length > 0)
    .filter((url) => /^https?:\/\//i.test(url));

  const images = [...new Set(galleryCandidates)].slice(0, 5);

  if (images.length === 0) {
    images.push("");
  }

  useEffect(() => {
    setCurrentImage((previous) =>
      previous >= images.length ? 0 : previous
    );
  }, [images.length]);

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

  const liked = isInWishlist(hotel.id);

  const handleSubmitReview = () => {
    const trimmedReview = reviewText.trim();

    if (!trimmedReview) {
      return;
    }

    const newReview = {
      name: user?.name || user?.firstName || "Guest",
      stay: "Just now",
      rating: reviewRating,
      comment: trimmedReview,
    };

    setReviews((previousReviews) => [newReview, ...previousReviews]);
    setReviewText("");
    setReviewRating(5);
  };

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
        <div className="grid gap-4 lg:grid-cols-[1.45fr_1fr] lg:auto-rows-[220px]">

          {/* MAIN IMAGE */}
          <div className="relative h-[420px] overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800 sm:h-[500px] lg:row-span-2 lg:h-full">

            {images[currentImage] ? (
              <img
                src={images[currentImage]}
                alt={hotelName}
                className="h-full w-full object-cover object-center"
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
          <div className="grid grid-cols-2 gap-4 lg:row-span-2">

            {images.slice(0, 4).map((image, index) => (
              <button
                key={`${image || "empty-image"}-${index}`}
                onClick={() => setCurrentImage(index)}
                className={`relative h-[190px] overflow-hidden rounded-3xl bg-gray-200 dark:bg-gray-800 sm:h-[220px] lg:h-full ${
                  currentImage === index
                    ? "ring-2 ring-gray-900 dark:ring-white"
                    : ""
                }`}
              >
                {image ? (
                  <img
                    src={image}
                    alt={`${hotelName} ${index + 1}`}
                    className="h-full w-full object-cover object-center transition duration-300 hover:scale-105"
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

            {/* GUEST FEEDBACK */}
            <div className="mt-10 rounded-3xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
              <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-sm font-medium uppercase tracking-[0.2em] text-gray-500 dark:text-gray-400">
                    Guest feedback
                  </p>
                  <h3 className="mt-2 text-2xl font-bold">
                    What guests say after their stay
                  </h3>
                </div>

                <div className="flex items-center gap-2 rounded-full bg-amber-50 px-3 py-2 text-amber-700 dark:bg-amber-500/10 dark:text-amber-300">
                  <Star size={16} fill="currentColor" />
                  <span className="text-sm font-semibold">{rating} / 5 guest rating</span>
                </div>
              </div>

              <div className="mt-6 grid gap-4 md:grid-cols-3">
                {reviews.map((review, index) => (
                  <div
                    key={`${review.name}-${review.stay}-${index}`}
                    className="rounded-2xl border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-800/70"
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold">{review.name}</p>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{review.stay}</p>
                      </div>

                      <div className="flex items-center gap-1 text-amber-500">
                        {Array.from({ length: 5 }).map((_, index) => (
                          <Star
                            key={`${review.name}-${index}`}
                            size={14}
                            fill={index < review.rating ? "currentColor" : "none"}
                          />
                        ))}
                      </div>
                    </div>

                    <p className="mt-3 text-sm leading-6 text-gray-600 dark:text-gray-300">
                      “{review.comment}”
                    </p>
                  </div>
                ))}
              </div>

              <div className="mt-8 rounded-2xl border border-dashed border-gray-300 bg-gray-50 p-5 dark:border-gray-700 dark:bg-gray-800/50">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-lg font-semibold">Rate your stay</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Tell other travellers what you experienced.</p>
                  </div>

                  <div className="flex items-center gap-1 rounded-full bg-white px-2 py-1 shadow-sm dark:bg-gray-900">
                    {Array.from({ length: 5 }).map((_, index) => (
                      <button
                        key={`rating-${index}`}
                        type="button"
                        onClick={() => setReviewRating(index + 1)}
                        className="p-1"
                      >
                        <Star
                          size={18}
                          fill={index < reviewRating ? "currentColor" : "none"}
                          className={index < reviewRating ? "text-amber-500" : "text-gray-300 dark:text-gray-600"}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <textarea
                  value={reviewText}
                  onChange={(event) => setReviewText(event.target.value)}
                  rows={4}
                  placeholder="Write about cleanliness, comfort, service, and your overall experience..."
                  className="mt-4 w-full rounded-2xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none ring-0 placeholder:text-gray-400 focus:border-gray-400 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-200 dark:placeholder:text-gray-500"
                />

                <div className="mt-4 flex items-center justify-between gap-3">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {reviewText.trim() ? "Your review is ready to share." : "Share your honest feedback for future travelers."}
                  </p>

                  <button
                    type="button"
                    onClick={handleSubmitReview}
                    className="rounded-xl bg-gray-900 px-4 py-2 text-sm font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                  >
                    Submit review
                  </button>
                </div>
              </div>
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