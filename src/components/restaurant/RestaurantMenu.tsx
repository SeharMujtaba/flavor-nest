"use client";

import { useEffect, useState } from "react";

import MenuCard from "./MenuCard";

type Restaurant = {
  id: number;
  name: string;
};

type Product = {
  _id: string | number;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  category?: string;
  restaurant?: string;
  image?: string;
};

type RestaurantMenuProps = {
  restaurant: Restaurant;
};

export default function RestaurantMenu({
  restaurant,
}: RestaurantMenuProps) {
  const [products, setProducts] = useState<Product[]>(
    []
  );

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError("");

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/products`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message ||
              "Failed to fetch products"
          );
        }

        setProducts(data.products || []);
      } catch (err) {
        console.error(
          "Restaurant products error:",
          err
        );

        setError(
          "Unable to load restaurant menu."
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const restaurantMenu = products.filter(
    (product) =>
      product.restaurant?.toLowerCase().trim() ===
      restaurant.name.toLowerCase().trim()
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
            Explore
            <span className="text-orange-500">
              {" "}
              {restaurant.name}
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-2xl text-base leading-7 text-slate-500 sm:text-lg sm:leading-8">
            Freshly prepared meals made with premium
            ingredients and delivered hot and fresh to
            your doorstep.
          </p>
        </div>

        {/* Loading */}

        {loading && (
          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {[1, 2, 3, 4].map((item) => (
              <div
                key={item}
                className="h-[360px] animate-pulse rounded-2xl bg-slate-100"
              />
            ))}
          </div>
        )}

        {/* Error */}

        {!loading && error && (
          <div className="mx-auto mt-16 max-w-xl rounded-xl border border-red-200 bg-red-50 p-8 text-center">
            <h3 className="text-xl font-bold text-red-600">
              Menu unavailable
            </h3>

            <p className="mt-3 text-red-500">
              {error}
            </p>
          </div>
        )}

        {/* Menu */}

        {!loading &&
          !error &&
          restaurantMenu.length > 0 && (
            <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {restaurantMenu.map((product) => (
                <MenuCard
                  key={product._id}
                  item={{
                    id: product._id,
                    restaurantId: restaurant.id.toString(),
                    category:
                      product.category || "",
                    name: product.name,
                    image:
                      product.image ||
                      "/images/placeholder.jpg",
                    description:
                      product.description || "",
                    price: product.price,
                    rating: product.rating || 0,
                  }}
                />
              ))}
            </div>
          )}

        {/* Empty */}

        {!loading &&
          !error &&
          restaurantMenu.length === 0 && (
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