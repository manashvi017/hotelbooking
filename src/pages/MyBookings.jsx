import { CalendarDays, CreditCard, MapPin, Trash2 } from "lucide-react";
import { Link, useLocation } from "react-router-dom";

import { useBookings } from "../context/BookingContext";

function formatDate(value) {
  if (!value) return "Not selected";

  return new Date(`${value}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

function MyBookings() {
  const { bookings, removeBooking } = useBookings();
  const location = useLocation();
  const bookingSuccess = location.state?.bookingSuccess;

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <div className="mb-8">
          <p className="text-sm uppercase tracking-[3px] text-gray-500">Trips</p>
          <h1 className="mt-2 text-3xl font-bold">My Bookings</h1>
          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Manage your confirmed stays and upcoming travel plans.
          </p>
        </div>

        {bookingSuccess && (
          <div className="mb-6 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-700 dark:border-emerald-900/50 dark:bg-emerald-950/20 dark:text-emerald-300">
            Booking confirmed successfully. Your reservation is now in your trips.
          </div>
        )}

        {bookings.length === 0 ? (
          <div className="rounded-[30px] bg-white p-12 text-center shadow-sm dark:bg-gray-900">
            <CalendarDays size={52} className="mx-auto text-gray-300" />
            <h2 className="mt-5 text-xl font-semibold">No bookings yet</h2>
            <p className="mt-2 text-gray-500 dark:text-gray-400">
              Your upcoming trips will appear here after you book.
            </p>
            <Link
              to="/"
              className="mt-6 inline-flex rounded-xl bg-gray-900 px-6 py-3 font-medium text-white dark:bg-white dark:text-gray-900"
            >
              Explore Hotels
            </Link>
          </div>
        ) : (
          <div className="space-y-5">
            {bookings.map((booking) => (
              <div
                key={booking.id}
                className="overflow-hidden rounded-[30px] border border-gray-200 bg-white shadow-sm dark:border-gray-800 dark:bg-gray-900"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="h-56 md:w-72">
                    {booking.image ? (
                      <img src={booking.image} alt={booking.hotelName} className="h-full w-full object-cover" />
                    ) : (
                      <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400 dark:bg-gray-800">
                        No Image
                      </div>
                    )}
                  </div>

                  <div className="flex flex-1 flex-col justify-between p-6">
                    <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                          <MapPin size={16} />
                          {booking.hotelLocation || "India"}
                        </div>

                        <h2 className="mt-2 text-2xl font-bold">{booking.hotelName}</h2>
                      </div>

                      <span className="inline-flex w-fit rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold text-emerald-700 dark:bg-emerald-900/30 dark:text-emerald-300">
                        Confirmed
                      </span>
                    </div>

                    <div className="mt-5 grid gap-4 sm:grid-cols-3">
                      <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Check-in</p>
                        <p className="mt-1 font-semibold">{formatDate(booking.checkIn)}</p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Check-out</p>
                        <p className="mt-1 font-semibold">{formatDate(booking.checkOut)}</p>
                      </div>

                      <div className="rounded-2xl bg-gray-50 p-3 dark:bg-gray-800">
                        <p className="text-xs text-gray-500 dark:text-gray-400">Guests</p>
                        <p className="mt-1 font-semibold">{booking.guests} guest(s)</p>
                      </div>
                    </div>

                    <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                        <CreditCard size={16} />
                        {booking.paymentMethod === "upi" ? "UPI" : "Card"}
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="text-right">
                          <p className="text-xs text-gray-500 dark:text-gray-400">Total</p>
                          <p className="text-xl font-bold">₹{Number(booking.total || 0).toLocaleString("en-IN")}</p>
                        </div>

                        <Link
                          to={`/hotel/${booking.hotelId}`}
                          className="rounded-full bg-gray-900 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-gray-900"
                        >
                          View hotel
                        </Link>

                        <button
                          onClick={() => removeBooking(booking.id)}
                          className="flex items-center gap-2 rounded-full border border-red-200 px-4 py-2 text-sm font-medium text-red-500 hover:bg-red-50 dark:border-red-900/40 dark:hover:bg-red-950/20"
                        >
                          <Trash2 size={16} />
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default MyBookings;