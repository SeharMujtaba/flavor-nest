import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import CategoryCard from "@/components/categories/CategoryCard";
import { categories } from "@/data/categories";

export default function CategoriesPage() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-gradient-to-b
        from-white
        via-[#FFFDFB]
        to-[#FFF7F2]

        py-16
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -left-32
          top-20

          h-80
          w-80

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

          h-80
          w-80

          rounded-full

          bg-yellow-200/30

          blur-[120px]
        "
      />

      <div className="relative mx-auto max-w-7xl px-6">

        {/* Back Navigation */}

        <div className="mb-12">

          <Link
            href="/"
            className="
              group

              inline-flex
              items-center

              gap-4

              rounded-[5px]

              border
              border-slate-300

              bg-white

              px-5
              py-4

              shadow-md

              transition-all
              duration-300

              hover:-translate-y-1
              hover:border-orange-300
              hover:shadow-xl
              hover:shadow-orange-100
            "
          >
            {/* Icon */}

            <div
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-[5px]

                bg-orange-200

                transition-all
                duration-300

                group-hover:bg-orange-500
              "
            >
              <ArrowLeft
                size={18}
                className="
                  text-orange-500

                  transition-colors
                  duration-300

                  group-hover:text-white
                "
              />
            </div>

            {/* Text */}

            <div className="flex flex-col">

              <span
                className="
                  text-md
                  font-bold

                  text-slate-900
                "
              >
                Back to Home
              </span>

            </div>

          </Link>

        </div>

        {/* Hero */}

        <div className="mx-auto max-w-6.5xl text-center">

          <span
            className="
              inline-flex
              items-center

              rounded-[5px]

              bg-orange-500

              px-6
              py-3

              text-lg
              font-bold

              uppercase

              text-white
            "
          >
            🍽️ Food Categories
          </span>

          <h1
            className="
              mt-7

              text-5xl
              font-extrabold

              leading-tight
              tracking-tight

              text-slate-900

              md:text-6xl
            "
          >
            Discover Delicious
            <span className="text-orange-500">
              {" "}Categories
            </span>
          </h1>

          <p
            className="
              mx-auto

              mt-6

              max-w-6xl

              text-lg
              leading-8

              text-slate-500
            "
          >
            Browse your favourite cuisines and explore hundreds of
            freshly prepared dishes from the best restaurants across
            Pakistan.
          </p>

        </div>

        {/* Categories Grid */}

        <div
          className="
            mt-20

            grid

            gap-8

            sm:grid-cols-2

            lg:grid-cols-3

            xl:grid-cols-4

            pb-10
          "
        >
          {categories.map((category) => (
            <CategoryCard
              key={category.id}
              category={category}
            />
          ))}
        </div>

      </div>

    </section>
  );
}