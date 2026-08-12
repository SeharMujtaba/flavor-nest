import { Suspense } from "react";

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Restaurants from "@/components/restaurants/Restaurants";

function RestaurantsLoading() {
  return (
    <section className="min-h-[60vh] bg-[#FAFAF7] px-6 py-20">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mx-auto h-8 w-48 animate-pulse rounded-lg bg-slate-200" />

          <div className="mx-auto mt-6 h-12 w-3/4 animate-pulse rounded-lg bg-slate-200" />

          <div className="mx-auto mt-4 h-5 w-full max-w-2xl animate-pulse rounded-lg bg-slate-100" />
        </div>

        <div className="mt-16 grid gap-8 md:grid-cols-2 xl:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-[420px] animate-pulse rounded-2xl bg-white shadow-sm"
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default function RestaurantsPage() {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[#FAFAF7] pt-8">
        <Suspense fallback={<RestaurantsLoading />}>
          <Restaurants />
        </Suspense>
      </main>

      <Footer />
    </>
  );
}