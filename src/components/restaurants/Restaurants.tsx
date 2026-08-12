"use client";

import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";

import Container from "@/components/common/Container";
import RestaurantCard from "./RestaurantCard";
import MenuCard from "@/components/restaurant/MenuCard";
import { restaurants } from "@/data/restaurants";

type Product = {
  _id: string | number;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  category?: string;
  restaurantId?: number;
  image?: string;
  available?: boolean;
};

export default function Restaurants() {
  const searchParams = useSearchParams();
  const searchQuery = searchParams.get("search")?.trim() || "";

  const [products, setProducts] = useState<Product[]>([]);
  const [loadingProducts, setLoadingProducts] = useState(false);
  const [productError, setProductError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoadingProducts(true);
        setProductError("");

        const API_URL =
          process.env.NEXT_PUBLIC_API_URL ||
          "http://localhost:5000";

        const response = await fetch(
          `${API_URL}/api/products`
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch products"
          );
        }

        setProducts(data.products || []);
      } catch (error) {
        console.error("Search products error:", error);

        setProductError(
          "Unable to load food items right now."
        );
      } finally {
        setLoadingProducts(false);
      }
    };

    fetchProducts();
  }, []);

  const matchingProducts = useMemo(() => {
    if (!searchQuery) {
      return [];
    }

    const query = searchQuery.toLowerCase();

    return products.filter((product) => {
      const name =
        product.name?.toLowerCase() || "";

      const description =
        product.description?.toLowerCase() || "";

      const category =
        product.category?.toLowerCase() || "";

      return (
        name.includes(query) ||
        description.includes(query) ||
        category.includes(query)
      );
    });
  }, [products, searchQuery]);

  const matchingRestaurants = useMemo(() => {
    if (!searchQuery) {
      return restaurants;
    }

    const query = searchQuery.toLowerCase();

    return restaurants.filter((restaurant) => {
      return (
        restaurant.name.toLowerCase().includes(query) ||
        restaurant.city.toLowerCase().includes(query) ||
        restaurant.cuisine.toLowerCase().includes(query)
      );
    });
  }, [searchQuery]);

  const isSearching = Boolean(searchQuery);

  return (
    <section
      id="restaurants"
      className="
        relative
        overflow-hidden
        bg-gradient-to-b
        from-white
        via-orange-50/20
        to-orange-100/20
        py-20
        sm:py-24
        md:py-32
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -left-40
          top-20
          h-[320px]
          w-[320px]
          rounded-full
          bg-orange-200/30
          blur-[140px]
        "
      />

      <div
        className="
          absolute
          -right-40
          bottom-20
          h-[320px]
          w-[320px]
          rounded-full
          bg-orange-100/40
          blur-[150px]
        "
      />

      <Container>
        {/* ================= HEADER ================= */}

        <div className="mx-auto mb-16 max-w-6xl text-center sm:mb-20">

          <span
            className="
              inline-flex
              items-center
              gap-2
              rounded-[5px]
              border
              border-orange-400
              bg-orange-400
              px-4
              py-2
              text-sm
              font-bold
              uppercase
              tracking-[0.14em]
              text-white
              sm:px-5
              sm:py-2
              sm:text-lg
              sm:tracking-[0.18em]
            "
          >
            {isSearching
              ? "🔎 Search Results"
              : "🍴 Featured Restaurants"}
          </span>

          <h2
            className="
              mt-6
              text-4xl
              font-extrabold
              leading-tight
              text-slate-900
              sm:text-5xl
              lg:text-6xl
            "
          >
            {isSearching ? (
              <>
                Results for{" "}
                <span className="text-orange-500">
                  &quot;{searchQuery}&quot;
                </span>
              </>
            ) : (
              <>
                Discover Amazing

                <span className="block text-orange-500">
                  Restaurants
                </span>
              </>
            )}
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-4xl
              text-base
              leading-7
              text-slate-600
              sm:text-lg
              sm:leading-8
            "
          >
            {isSearching
              ? "Find dishes, categories and food items matching your search."
              : "Explore Pakistan's favourite restaurants serving burgers, pizzas, biryani, desserts and much more with premium quality, lightning-fast delivery and unforgettable flavours."}
          </p>
        </div>

        {/* ================= SEARCH RESULTS ================= */}

        {isSearching ? (
          <>
            {/* Loading */}

            {loadingProducts && (
              <div
                className="
                  grid
                  gap-6
                  sm:grid-cols-2
                  lg:grid-cols-3
                  xl:grid-cols-4
                "
              >
                {[1, 2, 3, 4].map((item) => (
                  <div
                    key={item}
                    className="
                      h-[430px]
                      animate-pulse
                      rounded-2xl
                      bg-slate-100
                    "
                  />
                ))}
              </div>
            )}

            {/* Error */}

            {!loadingProducts && productError && (
              <div
                className="
                  mx-auto
                  max-w-xl
                  rounded-2xl
                  border
                  border-red-200
                  bg-red-50
                  p-8
                  text-center
                "
              >
                <h3 className="text-xl font-bold text-red-600">
                  Search unavailable
                </h3>

                <p className="mt-3 text-red-500">
                  {productError}
                </p>
              </div>
            )}

            {/* Matching Products */}

            {!loadingProducts &&
              !productError &&
              matchingProducts.length > 0 && (
                <>
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Food Items
                    </h3>

                    <p className="mt-1 text-slate-500">
                      {matchingProducts.length} matching{" "}
                      {matchingProducts.length === 1
                        ? "item"
                        : "items"}{" "}
                      found
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      gap-6
                      sm:grid-cols-2
                      lg:grid-cols-3
                      xl:grid-cols-4
                    "
                  >
                    {matchingProducts.map((product) => (
                      <MenuCard
                        key={product._id}
                        item={{
                          id: product._id,
                          restaurantId:
                            product.restaurantId?.toString() || "",
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
                </>
              )}

            {/* Matching Restaurants */}

            {!loadingProducts &&
              !productError &&
              matchingRestaurants.length > 0 && (
                <div className="mt-20">
                  <div className="mb-8">
                    <h3 className="text-2xl font-bold text-slate-900">
                      Matching Restaurants
                    </h3>

                    <p className="mt-1 text-slate-500">
                      Restaurants related to your search
                    </p>
                  </div>

                  <div
                    className="
                      grid
                      gap-8
                      md:grid-cols-2
                      xl:grid-cols-3
                    "
                  >
                    {matchingRestaurants.map(
                      (restaurant) => (
                        <RestaurantCard
                          key={restaurant.id}
                          restaurant={restaurant}
                        />
                      )
                    )}
                  </div>
                </div>
              )}

            {/* Nothing Found */}

            {!loadingProducts &&
              !productError &&
              matchingProducts.length === 0 &&
              matchingRestaurants.length === 0 && (
                <div
                  className="
                    mx-auto
                    max-w-xl
                    rounded-2xl
                    border
                    border-dashed
                    border-orange-200
                    bg-white
                    p-10
                    text-center
                    shadow-sm
                    sm:p-14
                  "
                >
                  <div className="text-5xl">🍽️</div>

                  <h3 className="mt-5 text-2xl font-bold text-slate-900">
                    No Results Found
                  </h3>

                  <p className="mt-4 leading-7 text-slate-500">
                    We couldn&apos;t find any food or
                    restaurant matching &quot;{searchQuery}&quot;.
                    Try another dish, category or restaurant
                    name.
                  </p>
                </div>
              )}
          </>
        ) : (
          /* ================= NORMAL RESTAURANTS ================= */

          <div
            className="
              grid
              gap-8
              md:grid-cols-2
              xl:grid-cols-3
            "
          >
            {restaurants.map((restaurant) => (
              <RestaurantCard
                key={restaurant.id}
                restaurant={restaurant}
              />
            ))}
          </div>
        )}
      </Container>
    </section>
  );
}