"use client";

import MenuCard from "./MenuCard";

import { menu } from "@/data/menu";

type Restaurant = {
  id: number;
  name: string;
};

type RestaurantMenuProps = {
  restaurant: Restaurant;
};

export default function RestaurantMenu({
  restaurant,
}: RestaurantMenuProps) {
  const restaurantMenu = menu.filter(
    (item) => item.restaurantId === restaurant.id
  );

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-[#FFFDFB] to-white py-12 sm:py-16 md:py-20">
      {/* Background Glow */}
      <div className="absolute right-0 top-10 h-[260px] w-[260px] rounded-full bg-orange-200/30 blur-[120px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6">
        {/* Heading */}
        <div className="mx-auto max-w-3xl text-center">
          <span className="inline-flex items-center rounded-full bg-orange-100 px-5 py-2.5 text-sm font-semibold uppercase tracking-wider text-orange-600">
            🍽️ Popular Dishes
          </span>

          <h2 className="mt-6 text-3xl font-bold text-slate-900 sm:text-4xl md:text-5xl">
            Explore{" "}
            <span className="text-orange-500">
              {restaurant.name}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            Freshly prepared meals made with premium
            ingredients and delivered hot and fresh to
            your doorstep.
          </p>
        </div>

        {/* Menu */}
        {restaurantMenu.length > 0 && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {restaurantMenu.map((item) => (
              <MenuCard
                key={item.id}
                item={{
                  id: item.id,
                  restaurantId: item.restaurantId.toString(),
                  category: item.category,
                  name: item.name,
                  image: item.image,
                  description: item.description,
                  price: item.price,
                  rating: item.rating,
                }}
              />
            ))}
          </div>
        )}

        {/* Empty State */}
        {restaurantMenu.length === 0 && (
          <div className="mx-auto mt-16 max-w-xl rounded-xl border border-dashed border-orange-200 bg-white p-10 text-center shadow-sm sm:p-14">
            <div className="text-5xl">🍽️</div>

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              Menu Coming Soon
            </h3>

            <p className="mt-4 leading-7 text-slate-500">
              This restaurant is currently updating its
              menu. Please visit again soon to explore
              delicious dishes.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}