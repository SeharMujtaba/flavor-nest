import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  Clock3,
  Heart,
  MapPin,
  Star,
  Bike,
  Phone,
} from "lucide-react";

type Restaurant = {
  id: number;
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
    <section className="relative overflow-hidden">

      {/* Cover Image */}

      <div className="relative h-[420px] w-full">

        <Image
          src={restaurant.cover || restaurant.image}
          alt={restaurant.name}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/50" />

      </div>

      {/* Card */}

      <div className="relative z-10 mx-auto -mt-32 max-w-7xl px-6">

        <div
          className="
            rounded-[36px]
            border
            border-slate-100
            bg-white
            p-8
            shadow-[0_20px_60px_rgba(15,23,42,0.12)]
          "
        >

          <div className="flex flex-col gap-10 lg:flex-row lg:justify-between">

            {/* Left */}

            <div className="flex flex-col gap-6 md:flex-row">

              {/* Restaurant Logo */}

              <div
                className="
                  relative
                  h-40
                  w-40
                  overflow-hidden
                  rounded-3xl
                  border-4
                  border-white
                  shadow-xl
                  shrink-0
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

              {/* Information */}

              <div>

                <Link
                  href="/"
                  className="
                    inline-flex
                    items-center
                    gap-2

                    rounded-full

                    bg-orange-50

                    px-5
                    py-2

                    font-semibold

                    text-orange-500

                    transition

                    hover:bg-orange-500
                    hover:text-white
                  "
                >
                  <ArrowLeft size={18} />

                  Back to Home

                </Link>

                <h1
                  className="
                    mt-6

                    text-4xl
                    font-extrabold

                    text-slate-900

                    lg:text-5xl
                  "
                >
                  {restaurant.name}
                </h1>

                <p className="mt-3 text-lg text-slate-500">
                  {restaurant.cuisine}
                </p>

                {/* Chips */}

                <div className="mt-8 flex flex-wrap gap-4">

                  <div className="flex items-center gap-2 rounded-full bg-yellow-50 px-4 py-2">

                    <Star
                      size={18}
                      className="fill-yellow-400 text-yellow-400"
                    />

                    <span className="font-semibold">
                      {restaurant.rating}
                    </span>

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-orange-50 px-4 py-2">

                    <Clock3
                      size={18}
                      className="text-orange-500"
                    />

                    <span>{restaurant.deliveryTime}</span>

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-emerald-50 px-4 py-2">

                    <Bike
                      size={18}
                      className="text-emerald-600"
                    />

                    <span>{restaurant.delivery}</span>

                  </div>

                  <div className="flex items-center gap-2 rounded-full bg-red-50 px-4 py-2">

                    <MapPin
                      size={18}
                      className="text-red-500"
                    />

                    <span>{restaurant.city}</span>

                  </div>

                </div>

                {/* Address */}

                <div className="mt-8 flex items-start gap-3">

                  <MapPin
                    size={20}
                    className="mt-1 text-orange-500"
                  />

                  <div>

                    <p className="font-semibold text-slate-900">
                      Address
                    </p>

                    <p className="text-slate-500">
                      {restaurant.address}
                    </p>

                  </div>

                </div>

                {/* Phone */}

                <div className="mt-5 flex items-start gap-3">

                  <Phone
                    size={20}
                    className="mt-1 text-emerald-500"
                  />

                  <div>

                    <p className="font-semibold text-slate-900">
                      Contact
                    </p>

                    <p className="text-slate-500">
                      {restaurant.phone}
                    </p>

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

              <Heart size={26} />

            </button>

          </div>

        </div>

      </div>

    </section>
  );
}