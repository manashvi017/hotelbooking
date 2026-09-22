import { createContext, useContext, useEffect, useState } from "react";

const WishlistContext = createContext();

function WishlistProvider({ children }) {
  const [wishlist, setWishlist] = useState(() => {
    const savedWishlist = localStorage.getItem("staySphereWishlist");

    return savedWishlist
      ? JSON.parse(savedWishlist)
      : [];
  });

  // Save wishlist in localStorage whenever wishlist changes
  useEffect(() => {
    localStorage.setItem(
      "staySphereWishlist",
      JSON.stringify(wishlist)
    );
  }, [wishlist]);

  // Add or remove hotel from wishlist
  const toggleWishlist = (hotel) => {
    setWishlist((previousWishlist) => {
      const alreadyAdded = previousWishlist.some(
        (item) => String(item.id) === String(hotel.id)
      );

      if (alreadyAdded) {
        return previousWishlist.filter(
          (item) => String(item.id) !== String(hotel.id)
        );
      }

      return [...previousWishlist, hotel];
    });
  };

  // Check whether hotel is already in wishlist
  const isInWishlist = (hotelId) => {
    return wishlist.some(
      (item) => String(item.id) === String(hotelId)
    );
  };

  return (
    <WishlistContext.Provider
      value={{
        wishlist,
        toggleWishlist,
        isInWishlist,
      }}
    >
      {children}
    </WishlistContext.Provider>
  );
}

// Custom hook
export function useWishlist() {
  return useContext(WishlistContext);
}

export default WishlistProvider;