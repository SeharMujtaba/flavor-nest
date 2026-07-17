import Hero from "@/components/home/Hero";
import Categories from "@/components/home/categories/Categories";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Restaurants from "@/components/restaurants/Restaurants";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-hidden">
        {/* Hero Section */}
        <Hero />

        {/* Restaurants Section */}
        <section className="mt-24 lg:mt-32">
          <Restaurants />
        </section>

        {/* Categories Section */}
        <section
          id="categories"
          className="mt-24 lg:mt-32"
        >
          <Categories />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </>
  );
}