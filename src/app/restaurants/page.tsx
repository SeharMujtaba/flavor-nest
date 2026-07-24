import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Restaurants from "@/components/restaurants/Restaurants";

export default function RestaurantsPage() {
  return (
    <>
      <Navbar />

      <main
        className="
          min-h-screen
          bg-[#FAFAF7]
          pt-8
        "
      >
        <Restaurants />
      </main>

      <Footer />
    </>
  );
}