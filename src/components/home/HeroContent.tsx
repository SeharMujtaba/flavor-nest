import Link from "next/link";

import HeroSearch from "./HeroSearch";
import HeroStats from "./HeroStats";
import { Button } from "@/components/ui/button";

export default function HeroContent() {
  return (
    <div
      className="
        max-w-2xl
        px-2
        lg:px-0
      "
    >
      {/* Badge */}

      <div
        className="
          inline-flex
          items-center
          gap-2

          rounded-full

          border
          border-orange-200

          bg-white/80

          px-5
          py-2

          shadow-sm

          backdrop-blur
        "
      >
        <span className="text-lg">⭐</span>

        <span
          className="
            text-sm
            font-semibold
            text-orange-600
          "
        >
          Trusted by 50,000+ Happy Customers
        </span>
      </div>

      {/* Heading */}

      <h1
        className="
          mt-8

          text-5xl

          font-extrabold

          leading-[1.05]

          tracking-tight

          text-slate-900

          sm:text-6xl

          lg:text-7xl
        "
      >
        Fresh Food

        <br />

        <span className="text-orange-500">
          Delivered
        </span>

        <br />

        Fast.
      </h1>

      {/* Description */}

      <p
        className="
          mt-7

          max-w-xl

          text-lg

          leading-8

          text-slate-600
        "
      >
        Discover the best restaurants near you and enjoy fresh,
        delicious meals delivered to your doorstep in minutes.
        Fast delivery, trusted restaurants, and unforgettable taste.
      </p>

      {/* Search */}

      <div
        className="
          mt-10

          max-w-xl
        "
      >
        <HeroSearch />
      </div>

      {/* Buttons */}

      <div
        className="
          mt-10

          flex
          flex-col

          gap-5

          sm:flex-row
          sm:items-center
        "
      >
        {/* Order Now */}

        <Button
          className="
            h-14
            min-w-[170px]

            rounded-full

            bg-gradient-to-r
            from-orange-500
            to-orange-600

            px-8

            text-base
            font-bold

            text-white

            shadow-lg
            shadow-orange-200

            transition-all
            duration-300

            hover:-translate-y-1
            hover:shadow-xl
          "
        >
          <Link href="/restaurants">
            Order Now →
          </Link>
        </Button>

        {/* Explore Menu */}

        <Button
          variant="outline"
          className="
            h-14
            min-w-[170px]

            rounded-full

            border-0

            bg-gradient-to-r
            from-orange-500
            to-orange-600

            px-8

            text-base
            font-bold

            text-white

            shadow-lg
            shadow-orange-200

            transition-all
            duration-300

            hover:-translate-y-1
            hover:shadow-xl
            hover:text-white
          "
        >
          <Link href="/restaurants">
            Explore Menu
          </Link>
        </Button>
      </div>

      {/* Statistics */}

      <div
        className="
          mt-14

          max-w-xl
        "
      >
        <HeroStats />
      </div>
    </div>
  );
}