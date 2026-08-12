import { Suspense } from "react";

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
          <Suspense
            fallback={
              <div className="min-h-[500px] bg-white py-20">
                <div className="mx-auto max-w-7xl px-6">
                  {/* Header skeleton */}
                  <div className="mx-auto h-8 w-52 animate-pulse rounded-lg bg-slate-200" />

                  <div className="mx-auto mt-4 h-5 w-80 max-w-full animate-pulse rounded bg-slate-100" />

                  {/* Cards skeleton */}
                  <div className="mt-12 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                      <div
                        key={item}
                        className="h-[380px] animate-pulse rounded-2xl bg-slate-100"
                      />
                    ))}
                  </div>
                </div>
              </div>
            }
          >
            <Restaurants />
          </Suspense>
        </section>
      </main>

      <Footer />
    </>
  );
}