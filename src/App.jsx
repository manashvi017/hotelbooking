import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import TravelBot from "./components/TravelBot";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <>
      <Navbar />

      <AppRoutes />

      <Footer />
      <TravelBot />
    </>
  );
}

export default App;