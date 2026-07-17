import Container from "@/components/common/Container";
import RestaurantCard from "./RestaurantCard";
import { restaurants } from "@/data/restaurants";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function Restaurants() {
  return (
    <section
      id="restaurants"
      className="
        relative
        overflow-hidden

        bg-gradient-to-b
        from-white
        via-[#FFFDFB]
        to-[#FFF7F2]

        py-36
      "
    >
      {/* Left Glow */}
      <div
        className="
          absolute
          -left-40
          top-16

          h-[340px]
          w-[340px]

          rounded-full

          bg-orange-200/30

          blur-[140px]
        "
      />

      {/* Right Glow */}
      <div
        className="
          absolute
          -right-40
          bottom-10

          h-[320px]
          w-[320px]

          rounded-full

          bg-yellow-200/30

          blur-[140px]
        "
      />

      <Container>
        {/* Heading */}

        <div className="mx-auto max-w-4xl text-center">

          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-full

              border
              border-orange-200

              bg-orange-50

              px-6
              py-3

              text-2xl
              font-bold

              uppercase

              text-orange-600
            "
          >
            🍴 Top Restaurants
          </span>

          <h2
            className="
              mt-8

              text-4xl
              font-extrabold

              leading-tight

              text-slate-900

              md:text-5xl
            "
          >
            Discover the Best
            <span className="text-orange-500">
              {" "}Restaurants
            </span>
          </h2>

          <p
            className="
              mx-auto

              mt-6

              max-w-3xl

              text-lg
              leading-8

              text-slate-500
            "
          >
            From juicy burgers and authentic pizzas to spicy biryani,
            explore Pakistan&apos;s most loved restaurants with quick
            delivery, premium quality, and unforgettable taste.
          </p>

        </div>

        {/* Cards */}

        <div
          className="
            mt-20

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

        {/* View All */}

        <div className="mt-20 flex justify-center">

          <Link
            href="/restaurants"
            className="
              group

              inline-flex
              items-center
              gap-3

              rounded-full

              bg-orange-500

              px-8
              py-4

              font-semibold

              text-white

              shadow-lg
              shadow-orange-200

              transition-all
              duration-300

              hover:-translate-y-1
              hover:bg-orange-600
              hover:shadow-xl
            "
          >
            View All Restaurants

            <ArrowRight
              size={20}
              className="
                transition-transform
                duration-300

                group-hover:translate-x-1
              "
            />

          </Link>

        </div>

      </Container>
    </section>
  );
}