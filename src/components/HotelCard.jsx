import {
  MapPin,
  Star,
  ArrowRight,
  Heart,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";

function HotelCard({ hotel }) {
  const { toggleWishlist, isInWishlist } = useWishlist();

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

  const liked = isInWishlist(hotel.id);

  return (
    <div className="hotel-card group overflow-hidden rounded-[28px] border border-slate-200/80 bg-white/80 shadow-[0_18px_35px_rgba(15,23,42,0.08)] transition duration-300 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(30,41,59,0.18)] dark:border-slate-800 dark:bg-slate-900/80">

      <div className="relative h-60 overflow-hidden bg-slate-200 dark:bg-slate-800">

        {image ? (
          <img
            src={image}
            alt={hotelName}
            className="h-full w-full object-cover transition duration-700 group-hover:scale-110"
            onError={(e) => {
              e.currentTarget.style.display = "none";
            }}
          />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-400">
            No Image Available
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/60 via-slate-900/10 to-transparent" />

        <button
          onClick={() => toggleWishlist(hotel)}
          className="absolute left-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 shadow-lg backdrop-blur-sm transition hover:scale-110"
        >
          <Heart
            size={20}
            className={
              liked
                ? "fill-red-500 text-red-500"
                : "text-slate-700"
            }
          />
        </button>

        <div className="absolute right-4 top-4 z-20 flex items-center gap-1 rounded-full bg-white/90 px-3 py-1.5 text-sm font-semibold text-slate-900 shadow-md backdrop-blur-sm">
          <Star
            size={15}
            fill="currentColor"
          />
          {rating}
        </div>
      </div>

      <div className="p-5">

        <h3 className="line-clamp-1 text-xl font-bold text-slate-900 dark:text-white">
          {hotelName}
        </h3>

        <div className="mt-2 flex items-center gap-1.5 text-sm text-slate-500 dark:text-slate-400">
          <MapPin size={16} className="text-sky-500" />
          <span>{location}</span>
        </div>

        <div className="mt-5 flex items-center justify-between">

          <div>
            <span className="text-xl font-black text-slate-900 dark:text-white">
              ₹{price}
            </span>

            <span className="ml-1 text-sm text-slate-500 dark:text-slate-400">
              / night
            </span>
          </div>

          <Link
            to={`/hotel/${hotel.id}`}
            className="flex items-center gap-2 rounded-full bg-gradient-to-r from-slate-900 to-sky-600 px-4 py-2.5 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:-translate-y-0.5 dark:from-white dark:to-sky-200 dark:text-slate-900"
          >
            View
            <ArrowRight size={16} />
          </Link>

        </div>
      </div>
    </div>
  );
}

export default HotelCard;