import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App.jsx";
import ThemeProvider from "./context/ThemeContext";
import AuthProvider from "./context/AuthContext";
import WishlistProvider from "./context/WishlistContext";
import BookingProvider from "./context/BookingContext";

import "./styles/global.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <AuthProvider>
          <WishlistProvider>
            <BookingProvider>
              <App />
            </BookingProvider>
          </WishlistProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>
);