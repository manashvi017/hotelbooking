import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

import { useBookings } from "../context/BookingContext";
import useAuth from "../hooks/useAuth";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { addBooking } = useBookings();

  const hotel = location.state?.hotel;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("card");

  useEffect(() => {
    if (user) {
      setGuestName(user.name || "");
      setGuestEmail(user.email || "");
    }
  }, [user]);

  if (!hotel) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50 px-6 dark:bg-gray-950">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Booking details not found
          </h1>

          <p className="mt-2 text-gray-500 dark:text-gray-400">
            Please select a hotel again.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-xl bg-gray-900 px-6 py-3 font-medium text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
          >
            Explore Hotels
          </button>
        </div>
      </div>
    );
  }

  const hotelName =
    hotel.name ||
    hotel.hotel_name ||
    hotel.hotelName ||
    "Beautiful Hotel";

  const hotelLocation =
    hotel.location ||
    hotel.city ||
    hotel.address ||
    "India";

  const image =
    hotel.image ||
    hotel.image_url ||
    hotel.imageUrl ||
    hotel.photo ||
    hotel.photo_url ||
    hotel.thumbnail ||
    "";

  const price = Number(
    hotel.price ||
      hotel.cost ||
      hotel.rate ||
      2999
  );

  const calculateNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);
    const difference = endDate.getTime() - startDate.getTime();
    const numberOfNights = Math.ceil(difference / (1000 * 60 * 60 * 24));

    return numberOfNights > 0 ? numberOfNights : 0;
  };

  const nights = calculateNights();
  const roomTotal = price * nights;
  const taxes = Math.round(roomTotal * 0.12);
  const total = roomTotal + taxes;
  const today = new Date().toISOString().split("T")[0];

  const handlePayment = () => {
    if (!checkIn || !checkOut) {
      alert("Please select check-in and check-out dates.");
      return;
    }

    if (nights <= 0) {
      alert("Check-out date must be after check-in date.");
      return;
    }

    if (!guestName || !guestEmail || !guestPhone) {
      alert("Please fill in all guest details.");
      return;
    }

    const bookingRecord = {
      id: `booking-${Date.now()}`,
      hotelId: hotel.id,
      hotelName,
      hotelLocation,
      image,
      price,
      total,
      checkIn,
      checkOut,
      guests,
      guestName,
      guestEmail,
      guestPhone,
      paymentMethod,
      bookedAt: new Date().toISOString(),
    };

    addBooking(bookingRecord);

    navigate("/my-bookings", {
      replace: true,
      state: { bookingSuccess: true },
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl">
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to hotel
        </button>

        <div className="mb-10">
          <p className="text-sm uppercase tracking-[3px] text-gray-500">
            Complete your booking
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Confirm & Pay
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
            Enter your trip details, guest information and payment method to complete your reservation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-6">
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">
              <div className="flex flex-col sm:flex-row">
                <div className="h-56 sm:h-auto sm:w-64">
                  {image ? (
                    <img src={image} alt={hotelName} className="h-full w-full object-cover" />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400 dark:bg-gray-800">
                      No Image Available
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} />
                    {hotelLocation}
                  </div>

                  <h2 className="mt-3 text-2xl font-bold">{hotelName}</h2>
                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    ₹{price.toLocaleString("en-IN")} / night
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <h2 className="text-xl font-bold">Your Trip</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select your dates and number of guests.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <CalendarDays size={17} />
                    Check-in
                  </label>
                  <input
                    type="date"
                    value={checkIn}
                    min={today}
                    onChange={(e) => {
                      setCheckIn(e.target.value);
                      if (checkOut && e.target.value >= checkOut) {
                        setCheckOut("");
                      }
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <CalendarDays size={17} />
                    Check-out
                  </label>
                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) => setCheckOut(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Users size={17} />
                    Guests
                  </label>
                  <select
                    value={guests}
                    onChange={(e) => setGuests(Number(e.target.value))}
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-500 dark:border-gray-800 dark:bg-gray-900"
                  >
                    {[1,2,3,4,5,6].map((value) => (
                      <option key={value} value={value}>{value} {value === 1 ? "Guest" : "Guests"}</option>
                    ))}
                  </select>
                </div>
              </div>

              {nights > 0 && (
                <div className="mt-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500">Your stay</p>
                      <p className="mt-1 font-semibold">
                        {nights} {nights === 1 ? "night" : "nights"} · {guests} {guests === 1 ? "guest" : "guests"}
                      </p>
                    </div>
                    <p className="font-semibold">₹{roomTotal.toLocaleString("en-IN")}</p>
                  </div>
                </div>
              )}
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <h2 className="text-xl font-bold">Guest Details</h2>
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter the details of the primary guest.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-2 block text-sm font-medium">Full Name</label>
                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) => setGuestName(e.target.value)}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                <div>
                  <label className="mb-2 block text-sm font-medium">Email Address</label>
                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) => setGuestEmail(e.target.value)}
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">Phone Number</label>
                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) => setGuestPhone(e.target.value)}
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <CreditCard size={21} />
                </div>
                <div>
                  <h2 className="text-xl font-bold">Payment Method</h2>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose how you want to pay.
                  </p>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${paymentMethod === "card" ? "border-gray-900 dark:border-white" : "border-gray-200 dark:border-gray-700"}`}>
                  <input type="radio" name="payment" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <CreditCard size={20} />
                  <div>
                    <p className="font-medium">Credit / Debit Card</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Visa, Mastercard, RuPay</p>
                  </div>
                </label>

                <label className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${paymentMethod === "upi" ? "border-gray-900 dark:border-white" : "border-gray-200 dark:border-gray-700"}`}>
                  <input type="radio" name="payment" value="upi" checked={paymentMethod === "upi"} onChange={(e) => setPaymentMethod(e.target.value)} />
                  <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900 text-xs font-bold text-white dark:bg-white dark:text-gray-900">
                    U
                  </div>
                  <div>
                    <p className="font-medium">UPI</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">Google Pay, PhonePe, Paytm</p>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div>
            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gray-100 dark:bg-gray-800">
                  <ShieldCheck size={22} />
                </div>
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400">Booking summary</p>
                  <h2 className="text-xl font-bold">Payment</h2>
                </div>
              </div>

              <div className="mt-6 space-y-4 text-sm text-gray-600 dark:text-gray-300">
                <div className="flex items-center justify-between">
                  <span>Room charges</span>
                  <span>₹{roomTotal.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>Taxes & fees</span>
                  <span>₹{taxes.toLocaleString("en-IN")}</span>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 pt-4 text-base font-semibold text-gray-900 dark:border-gray-700 dark:text-white">
                  <span>Total</span>
                  <span>₹{total.toLocaleString("en-IN")}</span>
                </div>
              </div>

              <button
                onClick={handlePayment}
                className="mt-8 w-full rounded-2xl bg-gray-900 px-5 py-4 text-base font-semibold text-white transition hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
              >
                Pay ₹{total.toLocaleString("en-IN")}
              </button>

              <p className="mt-4 text-center text-xs text-gray-500 dark:text-gray-400">
                Secure checkout with instant confirmation.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Booking;