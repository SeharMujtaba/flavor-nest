import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Bike,
  Clock3,
  Heart,
  MapPin,
  Phone,
  Star,
} from "lucide-react";

type Restaurant = {
  id: string | number;
  name: string;
  image: string;
  cover: string;
  cuisine: string;
  city: string;
  rating: number;
  deliveryTime: string;
  delivery: string;
  address: string;
  phone: string;
};

type RestaurantHeaderProps = {
  restaurant: Restaurant;
};

export default function RestaurantHeader({
  restaurant,
}: RestaurantHeaderProps) {
  return (
    <section className="bg-[#FAFAF7] pb-14">

      {/* Premium Back Navigation */}

<div className="mx-auto max-w-7xl px-6 pt-8 pb-6">

  <Link
    href="/restaurants"
    className="
      group

      inline-flex
      items-center

      gap-5

      rounded-2xl

      border
      border-slate-200

      bg-white

      px-6
      py-4

      shadow-sm

      transition-all
      duration-300

      hover:-translate-y-1
      hover:border-orange-300
      hover:shadow-2xl
      hover:shadow-orange-300
    "
  >

    {/* Arrow Box */}

    <div
      className="
        flex
        h-12
        w-12

        items-center
        justify-center

        rounded-xl

        bg-orange-100

        transition-all
        duration-300

        group-hover:bg-orange-500
      "
    >

      <ArrowLeft
        size={20}
        className="
          text-orange-500
          transition
          duration-300
          group-hover:text-white
        "
      />

    </div>

    {/* Text */}

    <div className="flex flex-col">

      <span
        className="
          text-xs
          font-bold
          uppercase
          tracking-[0.2em]

          text-slate-900
        "
      >
        Back To
      </span>

      <span
        className="
          text-lg
          font-bold

          text-orange-500
        "
      >
        Restaurants
      </span>

    </div>
  </Link>

</div>

      {/* Cover */}

      <div className="relative h-[360px] w-full overflow-hidden">

        <Image
          src={restaurant.cover || restaurant.image}
          alt={restaurant.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-black/20" />

      </div>

      {/* Main Card */}

      <div className="mx-auto -mt-24 max-w-7xl px-6">

        <div
          className="
            overflow-hidden

            rounded-3xl

            border
            border-slate-200

            bg-white

            shadow-[0_20px_60px_rgba(15,23,42,0.12)]
          "
        >

          <div className="p-8">

            <div className="flex flex-col gap-8 lg:flex-row lg:justify-between">

              {/* Left */}

              <div className="flex flex-col gap-7 md:flex-row">

                {/* Logo */}

                <div
                  className="
                    relative

                    h-40
                    w-40

                    shrink-0

                    overflow-hidden

                    rounded-2xl

                    border-4
                    border-white

                    shadow-xl
                  "
                >
                  <Image
                    src={restaurant.image}
                    alt={restaurant.name}
                    fill
                    sizes="160px"
                    className="object-cover"
                  />
                </div>

                {/* Info */}

                <div>

                  <h1
                    className="
                      text-5xl
                      font-extrabold
                      tracking-tight
                      text-slate-900
                    "
                  >
                    {restaurant.name}
                  </h1>

                  <p className="mt-3 text-xl text-slate-500">
                    {restaurant.cuisine}
                  </p>

                  {/* Chips */}

                  <div className="mt-7 flex flex-wrap gap-3">

                    <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-5 py-2.5">

                      <Star
                        size={16}
                        className="fill-yellow-400 text-yellow-400"
                      />

                      <span className="font-semibold">
                        {restaurant.rating}
                      </span>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-orange-50 px-5 py-2.5">

                      <Clock3
                        size={16}
                        className="text-orange-500"
                      />

                      <span>{restaurant.deliveryTime}</span>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-5 py-2.5">

                      <Bike
                        size={16}
                        className="text-emerald-600"
                      />

                      <span>{restaurant.delivery}</span>

                    </div>

                    <div className="flex items-center gap-2 rounded-full bg-red-50 px-5 py-2.5">

                      <MapPin
                        size={16}
                        className="text-red-500"
                      />

                      <span>{restaurant.city}</span>

                    </div>

                  </div>

                </div>

              </div>

              {/* Favourite */}

              <button
                className="
                  flex
                  h-16
                  w-16

                  items-center
                  justify-center

                  self-start

                  rounded-full

                  bg-orange-100

                  text-orange-500

                  shadow-lg

                  transition-all
                  duration-300

                  hover:scale-110
                  hover:bg-orange-500
                  hover:text-white
                "
              >
                <Heart size={24} />
              </button>

            </div>

          </div>

          {/* Bottom Contact */}

          <div
            className="
              grid

              gap-6

              border-t
              border-slate-200

              bg-slate-50

              p-8

              md:grid-cols-2
            "
          >

            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-orange-100 p-3">

                <MapPin className="text-orange-500" />

              </div>

              <div>

                <h4 className="font-semibold text-slate-900">
                  Restaurant Address
                </h4>

                <p className="mt-1 text-slate-500 leading-7">
                  {restaurant.address}
                </p>

              </div>

            </div>

            <div className="flex items-start gap-4">

              <div className="rounded-xl bg-emerald-100 p-3">

                <Phone className="text-emerald-600" />

              </div>

              <div>

                <h4 className="font-semibold text-slate-900">
                  Contact Number
                </h4>

                <p className="mt-1 text-slate-500">
                  {restaurant.phone}
                </p>

              </div>

            </div>

          </div>

        </div>

      </div>

    </section>
  );
}