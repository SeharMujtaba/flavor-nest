import Container from "@/components/common/Container";
import RestaurantCard from "./RestaurantCard";
import { restaurants } from "@/data/restaurants";

export default function Restaurants() {
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

        py-32
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

        <div className="mx-auto mb-20 max-w-6.5xl text-center">

          <span
            className="
              inline-flex
              items-center
              gap-2

              rounded-[5px]

              border
              border-orange-400

              bg-orange-400

              px-5
              py-2

              text-lg
              font-bold
              uppercase
              tracking-[0.18em]

              text-white
            "
          >
            🍴 Featured Restaurants
          </span>

          <h2
            className="
              mt-6

              text-5xl
              font-extrabold
              leading-tight

              text-slate-900

              lg:text-6xl
            "
          >
            Discover Amazing

            <span className="block text-orange-500">
              Restaurants
            </span>
          </h2>

          <p
            className="
              mx-auto

              mt-6

              max-w-6.5xl

              text-lg
              leading-8

              text-slate-600
            "
          >
            Explore Pakistan&apos;s favourite restaurants serving burgers,
            pizzas, biryani, desserts and much more with premium quality,
            lightning-fast delivery and unforgettable flavours.
          </p>

        </div>

        {/* ================= CARDS ================= */}

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

      </Container>
    </section>
  );
}