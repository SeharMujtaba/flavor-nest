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
    <section
      className="
        relative
        overflow-hidden

        bg-gradient-to-b
        from-[#FFFDFB]
        to-white

        py-20
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          right-0
          top-10

          h-[260px]
          w-[260px]

          rounded-full

          bg-orange-200/30

          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span
            className="
              inline-flex
              items-center

              rounded-full

              bg-orange-100

              px-5
              py-2.5

              text-sm
              font-semibold

              uppercase
              tracking-wider

              text-orange-600
            "
          >
            🍽️ Popular Dishes
          </span>

          <h2
            className="
              mt-6

              text-4xl
              font-bold

              text-slate-900

              md:text-5xl
            "
          >
            Explore
            <span className="text-orange-500">
              {" "}
              {restaurant.name}
            </span>
          </h2>

          <p
            className="
              mx-auto
              mt-5

              max-w-2xl

              text-lg
              leading-8

              text-slate-500
            "
          >
            Freshly prepared meals made with premium ingredients and
            delivered hot and fresh to your doorstep.
          </p>

        </div>

        {/* Menu Grid */}

        {restaurantMenu.length > 0 ? (

          <div
            className="
              mt-16

              grid
              gap-8

              sm:grid-cols-2
              xl:grid-cols-4
            "
          >
            {restaurantMenu.map((item) => (
              <MenuCard
                key={item.id}
                item={item}
              />
            ))}
          </div>

        ) : (

          <div
            className="
              mx-auto
              mt-16

              max-w-xl

              rounded-xl

              border
              border-dashed
              border-orange-200

              bg-white

              p-14

              text-center

              shadow-sm
            "
          >
            <div className="text-5xl">
              🍽️
            </div>

            <h3
              className="
                mt-5

                text-2xl
                font-bold

                text-slate-900
              "
            >
              Menu Coming Soon
            </h3>

            <p
              className="
                mt-4

                leading-7

                text-slate-500
              "
            >
              This restaurant is currently updating its menu.
              Please visit again soon to explore delicious dishes.
            </p>

          </div>

        )}

      </div>
    </section>
  );
}