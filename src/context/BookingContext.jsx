import { createContext, useContext, useEffect, useMemo, useState } from "react";

const BookingContext = createContext(null);
const BOOKINGS_KEY = "staySphereBookings";

function BookingProvider({ children }) {
  const [bookings, setBookings] = useState(() => {
    try {
      const savedBookings = localStorage.getItem(BOOKINGS_KEY);
      return savedBookings ? JSON.parse(savedBookings) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem(BOOKINGS_KEY, JSON.stringify(bookings));
  }, [bookings]);

  const addBooking = (booking) => {
    const nextBooking = {
      ...booking,
      id:
        booking.id ||
        `${Date.now()}-${Math.random().toString(16).slice(2)}`,
    };

    setBookings((current) => [nextBooking, ...current]);
    return nextBooking;
  };

  const removeBooking = (id) => {
    setBookings((current) =>
      current.filter((booking) => String(booking.id) !== String(id))
    );
  };

  const value = useMemo(
    () => ({
      bookings,
      addBooking,
      removeBooking,
    }),
    [bookings]
  );

  return (
    <BookingContext.Provider value={value}>
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  return useContext(BookingContext);
}

export default BookingProvider;