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
        Discover the best restaurants near you and enjoy
        fresh, delicious meals delivered to your doorstep in
        minutes. Fast delivery, trusted restaurants, and
        unforgettable taste.
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
          mt-7
          flex
          items-center
          gap-3
        "
      >
        {/* Order Now */}

        <Button
          className="
            h-10
            rounded-full
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            px-5
            text-sm
            font-bold
            text-white
            shadow-md
            shadow-orange-200
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            sm:h-11
            sm:px-6
          "
        >
          <Link href="/restaurants">
            Order Now →
          </Link>
        </Button>

        {/* Explore Menu */}

        <Button
          className="
            h-10
            rounded-full
            bg-gradient-to-r
            from-orange-500
            to-orange-600
            px-5
            text-sm
            font-bold
            text-white
            shadow-md
            shadow-orange-200
            transition-all
            duration-300
            hover:-translate-y-1
            hover:shadow-lg
            sm:h-11
            sm:px-6
          "
        >
          <Link href="/categories">
            Explore Menu →
          </Link>
        </Button>
      </div>

      {/* Statistics */}

      <div
        className="
          mt-12
          max-w-xl
        "
      >
        <HeroStats />
      </div>
    </div>
  );
}