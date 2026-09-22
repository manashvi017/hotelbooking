import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  CalendarDays,
  CreditCard,
  MapPin,
  ShieldCheck,
  Users,
} from "lucide-react";

function Booking() {
  const location = useLocation();
  const navigate = useNavigate();

  const hotel = location.state?.hotel;

  const [checkIn, setCheckIn] = useState("");
  const [checkOut, setCheckOut] = useState("");
  const [guests, setGuests] = useState(2);

  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [guestPhone, setGuestPhone] = useState("");

  const [paymentMethod, setPaymentMethod] = useState("card");

  // If hotel data is not available
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

  // Hotel information
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

  // Calculate nights
  const calculateNights = () => {
    if (!checkIn || !checkOut) {
      return 0;
    }

    const startDate = new Date(checkIn);
    const endDate = new Date(checkOut);

    const difference =
      endDate.getTime() - startDate.getTime();

    const numberOfNights = Math.ceil(
      difference / (1000 * 60 * 60 * 24)
    );

    return numberOfNights > 0 ? numberOfNights : 0;
  };

  const nights = calculateNights();

  // Bill calculation
  const roomTotal = price * nights;

  const taxes = Math.round(roomTotal * 0.12);

  const total = roomTotal + taxes;

  // Today's date
  const today = new Date()
    .toISOString()
    .split("T")[0];

  // Payment
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

    alert(
      `Payment of ₹${total.toLocaleString(
        "en-IN"
      )} initiated!`
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-12 text-gray-900 dark:bg-gray-950 dark:text-white">
      <div className="mx-auto max-w-6xl">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="mb-8 flex items-center gap-2 text-sm font-medium text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
        >
          <ArrowLeft size={18} />
          Back to hotel
        </button>

        {/* PAGE HEADING */}
        <div className="mb-10">
          <p className="text-sm uppercase tracking-[3px] text-gray-500">
            Complete your booking
          </p>

          <h1 className="mt-2 text-3xl font-bold sm:text-4xl">
            Confirm & Pay
          </h1>

          <p className="mt-3 max-w-2xl text-gray-500 dark:text-gray-400">
            Enter your trip details, guest information and
            payment method to complete your reservation.
          </p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[1fr_380px]">

          {/* ================================= */}
          {/* LEFT SIDE */}
          {/* ================================= */}

          <div className="space-y-6">

            {/* HOTEL CARD */}
            <div className="overflow-hidden rounded-3xl bg-white shadow-sm dark:bg-gray-900">

              <div className="flex flex-col sm:flex-row">

                {/* IMAGE */}
                <div className="h-56 sm:h-auto sm:w-64">
                  {image ? (
                    <img
                      src={image}
                      alt={hotelName}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full items-center justify-center bg-gray-200 text-gray-400 dark:bg-gray-800">
                      No Image Available
                    </div>
                  )}
                </div>

                {/* HOTEL INFO */}
                <div className="p-6">

                  <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <MapPin size={16} />
                    {hotelLocation}
                  </div>

                  <h2 className="mt-3 text-2xl font-bold">
                    {hotelName}
                  </h2>

                  <p className="mt-3 text-sm text-gray-500 dark:text-gray-400">
                    ₹{price.toLocaleString("en-IN")} / night
                  </p>

                </div>
              </div>
            </div>

            {/* ================================= */}
            {/* TRIP DETAILS */}
            {/* ================================= */}

            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <h2 className="text-xl font-bold">
                Your Trip
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Select your dates and number of guests.
              </p>

              <div className="mt-6 grid gap-5 sm:grid-cols-3">

                {/* CHECK IN */}
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

                      if (
                        checkOut &&
                        e.target.value >= checkOut
                      ) {
                        setCheckOut("");
                      }
                    }}
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                {/* CHECK OUT */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <CalendarDays size={17} />
                    Check-out
                  </label>

                  <input
                    type="date"
                    value={checkOut}
                    min={checkIn || today}
                    onChange={(e) =>
                      setCheckOut(e.target.value)
                    }
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 text-sm outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                {/* GUESTS */}
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium">
                    <Users size={17} />
                    Guests
                  </label>

                  <select
                    value={guests}
                    onChange={(e) =>
                      setGuests(Number(e.target.value))
                    }
                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm outline-none transition focus:border-gray-500 dark:border-gray-800 dark:bg-gray-900"
                  >
                    <option value="1">
                      1 Guest
                    </option>

                    <option value="2">
                      2 Guests
                    </option>

                    <option value="3">
                      3 Guests
                    </option>

                    <option value="4">
                      4 Guests
                    </option>

                    <option value="5">
                      5 Guests
                    </option>

                    <option value="6">
                      6 Guests
                    </option>
                  </select>
                </div>

              </div>

              {/* STAY INFORMATION */}
              {nights > 0 && (
                <div className="mt-6 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">

                  <div className="flex flex-wrap items-center justify-between gap-3">

                    <div>
                      <p className="text-xs uppercase tracking-wider text-gray-500">
                        Your stay
                      </p>

                      <p className="mt-1 font-semibold">
                        {nights}{" "}
                        {nights === 1
                          ? "night"
                          : "nights"}{" "}
                        · {guests}{" "}
                        {guests === 1
                          ? "guest"
                          : "guests"}
                      </p>
                    </div>

                    <p className="font-semibold">
                      ₹{roomTotal.toLocaleString("en-IN")}
                    </p>

                  </div>
                </div>
              )}

            </div>

            {/* ================================= */}
            {/* GUEST DETAILS */}
            {/* ================================= */}

            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <h2 className="text-xl font-bold">
                Guest Details
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Enter the details of the primary guest.
              </p>

              <div className="mt-6 grid gap-4 sm:grid-cols-2">

                {/* NAME */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Full Name
                  </label>

                  <input
                    type="text"
                    value={guestName}
                    onChange={(e) =>
                      setGuestName(e.target.value)
                    }
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                {/* EMAIL */}
                <div>
                  <label className="mb-2 block text-sm font-medium">
                    Email Address
                  </label>

                  <input
                    type="email"
                    value={guestEmail}
                    onChange={(e) =>
                      setGuestEmail(e.target.value)
                    }
                    placeholder="Enter your email"
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

                {/* PHONE */}
                <div className="sm:col-span-2">
                  <label className="mb-2 block text-sm font-medium">
                    Phone Number
                  </label>

                  <input
                    type="tel"
                    value={guestPhone}
                    onChange={(e) =>
                      setGuestPhone(e.target.value)
                    }
                    placeholder="Enter your phone number"
                    className="w-full rounded-xl border border-gray-200 bg-transparent px-4 py-3 outline-none transition focus:border-gray-500 dark:border-gray-700"
                  />
                </div>

              </div>
            </div>

            {/* ================================= */}
            {/* PAYMENT METHOD */}
            {/* ================================= */}

            <div className="rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <div className="flex items-center gap-3">

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-100 dark:bg-gray-800">
                  <CreditCard size={21} />
                </div>

                <div>
                  <h2 className="text-xl font-bold">
                    Payment Method
                  </h2>

                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Choose how you want to pay.
                  </p>
                </div>

              </div>

              <div className="mt-6 space-y-3">

                {/* CARD */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                    paymentMethod === "card"
                      ? "border-gray-900 dark:border-white"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="card"
                    checked={paymentMethod === "card"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <CreditCard size={20} />

                  <div>
                    <p className="font-medium">
                      Credit / Debit Card
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Visa, Mastercard, RuPay
                    </p>
                  </div>
                </label>

                {/* UPI */}
                <label
                  className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition ${
                    paymentMethod === "upi"
                      ? "border-gray-900 dark:border-white"
                      : "border-gray-200 dark:border-gray-700"
                  }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    value="upi"
                    checked={paymentMethod === "upi"}
                    onChange={(e) =>
                      setPaymentMethod(e.target.value)
                    }
                  />

                  <div className="flex h-6 w-6 items-center justify-center rounded bg-gray-900 text-xs font-bold text-white dark:bg-white dark:text-gray-900">
                    U
                  </div>

                  <div>
                    <p className="font-medium">
                      UPI
                    </p>

                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Google Pay, PhonePe, Paytm
                    </p>
                  </div>
                </label>

              </div>
            </div>
          </div>

          {/* ================================= */}
          {/* RIGHT SIDE - BILL */}
          {/* ================================= */}

          <div>

            <div className="sticky top-28 rounded-3xl bg-white p-6 shadow-sm dark:bg-gray-900">

              <h2 className="text-xl font-bold">
                Booking Summary
              </h2>

              <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                Your complete price breakdown.
              </p>

              {/* BILL */}
              <div className="mt-6 space-y-4">

                {/* ROOM */}
                <div className="flex items-start justify-between gap-4">

                  <div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      Room
                    </p>

                    <p className="mt-1 text-sm font-medium">
                      ₹{price.toLocaleString("en-IN")} ×{" "}
                      {nights || "—"}{" "}
                      {nights === 1 ? "night" : "nights"}
                    </p>
                  </div>

                  <p className="font-medium">
                    {nights > 0
                      ? `₹${roomTotal.toLocaleString("en-IN")}`
                      : "—"}
                  </p>

                </div>

                {/* GUESTS */}
                <div className="flex justify-between">

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Guests
                  </span>

                  <span className="text-sm font-medium">
                    {guests}
                  </span>

                </div>

                {/* TAX */}
                <div className="flex justify-between">

                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Taxes & fees
                  </span>

                  <span className="text-sm font-medium">
                    {nights > 0
                      ? `₹${taxes.toLocaleString("en-IN")}`
                      : "—"}
                  </span>

                </div>

              </div>

              {/* DIVIDER */}
              <div className="my-6 border-t border-gray-200 dark:border-gray-800" />

              {/* TOTAL */}
              <div className="flex items-center justify-between">

                <div>
                  <p className="text-lg font-semibold">
                    Total
                  </p>

                  <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    Including taxes & fees
                  </p>
                </div>

                <span className="text-2xl font-bold">
                  {nights > 0
                    ? `₹${total.toLocaleString("en-IN")}`
                    : "—"}
                </span>

              </div>

              {/* PAY BUTTON */}
              <button
                onClick={handlePayment}
                disabled={nights === 0}
                className={`mt-7 flex w-full items-center justify-center gap-2 rounded-2xl py-4 font-semibold transition ${
                  nights === 0
                    ? "cursor-not-allowed bg-gray-200 text-gray-400 dark:bg-gray-800 dark:text-gray-500"
                    : "bg-gray-900 text-white hover:bg-gray-700 dark:bg-white dark:text-gray-900 dark:hover:bg-gray-200"
                }`}
              >
                <CreditCard size={19} />

                {nights === 0
                  ? "Select Dates"
                  : `Pay ₹${total.toLocaleString("en-IN")}`}
              </button>

              {/* SECURITY */}
              <div className="mt-5 flex items-start gap-3 rounded-2xl bg-gray-50 p-4 dark:bg-gray-800">

                <ShieldCheck
                  size={20}
                  className="mt-0.5 shrink-0"
                />

                <p className="text-xs leading-5 text-gray-500 dark:text-gray-400">
                  Your payment information is securely
                  processed. Your booking details will be
                  available after payment.
                </p>

              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  );
}

export default Booking;