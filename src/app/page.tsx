import Hero from "@/components/home/Hero";
import Categories from "@/components/home/categories/Categories";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Restaurants from "@/components/restaurants/Restaurants";

export default function Home() {
  return (
    <>
      <Navbar />

      <main className="overflow-x-hidden">

        {/* Hero */}
        <Hero />

        {/* Food Categories */}
        <section
          id="categories"
          className="pt-24 lg:pt-28"
        >
          <Categories />
        </section>

        {/* Restaurants */}
        <section
          id="restaurants"
          className="pt-24 pb-24 lg:pt-28 lg:pb-32"
        >
          <Restaurants />
        </section>

      </main>

      <Footer />
    </>
  );
}