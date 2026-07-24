import Link from "next/link";
import CategoryCard from "./CategoryCard";
import { categories } from "@/data/categories";

export default function Categories() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-gradient-to-b
        from-[#FFFDFB]
        to-white

        py-24
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -left-32
          top-20

          h-72
          w-72

          rounded-full

          bg-orange-200/30

          blur-[120px]
        "
      />

      <div
        className="
          absolute
          -right-32
          bottom-10

          h-72
          w-72

          rounded-full

          bg-yellow-200/30

          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Heading */}

        <div className="mx-auto max-w-3xl text-center">

          <span
            className="
              inline-flex
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
            Browse Categories
          </span>

          <h2
            className="
              mt-6

              text-5xl
              font-extrabold

              text-slate-900
            "
          >
            Explore by
            <span className="text-orange-500">
              {" "}Cuisine
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
            Choose your favourite cuisine and discover delicious meals
            prepared by top-rated restaurants.
          </p>

        </div>

        {/* Categories Grid */}

        <div
          className="
            mt-20

            grid

            gap-8

            sm:grid-cols-2

            lg:grid-cols-4
          "
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

        {/* View All */}

        <div className="mt-16 text-center">

          <Link
            href="/categories"
            className="
              inline-flex
              items-center
              justify-center

              rounded-xl

              bg-orange-500

              px-8
              py-4

              text-lg
              font-semibold

              text-white

              transition-all
              duration-300

              hover:bg-orange-600
              hover:shadow-xl
            "
          >
            View All Categories
          </Link>

        </div>

      </div>
    </section>
  );
}