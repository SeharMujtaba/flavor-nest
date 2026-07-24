import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Bike,
  Clock,
  MapPin,
  Star,
} from "lucide-react";

type Restaurant = {
  id: number;
  name: string;
  image: string;
  rating: number;
  deliveryTime: string;
  cuisine: string;
  city: string;
};

type RestaurantCardProps = {
  restaurant: Restaurant;
};

export default function RestaurantCard({
  restaurant,
}: RestaurantCardProps) {
  return (
    <Link
      href={`/restaurants/${restaurant.id}`}
      className="group block"
    >
      <div
        className="
          overflow-hidden

          rounded-xl

          border
          border-slate-200

          bg-white

          shadow-sm

          transition-all
          duration-300

          hover:-translate-y-2
          hover:border-orange-200
          hover:shadow-xl
          hover:shadow-orange-100
        "
      >
        {/* Image */}
        <div
          className="
            relative
            h-44

            overflow-hidden

            rounded-t-xl
          "
        >
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width:768px)100vw,(max-width:1200px)50vw,33vw"
            className="
              object-cover

              transition-transform
              duration-500

              group-hover:scale-105
            "
          />

          {/* Rating */}
          <div
            className="
              absolute
              top-4
              right-4

              flex
              items-center
              gap-1

              rounded-full

              bg-white/95

              px-3
              py-1

              shadow-md
            "
          >
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm font-semibold text-slate-800">
              {restaurant.rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative px-5 pt-5 pb-5">

          {/* Floating Arrow */}
          <div
            className="
              absolute
              -top-7
              right-5

              flex
              h-12
              w-12
              items-center
              justify-center

              rounded-xl

              bg-orange-500

              text-white

              shadow-lg
              shadow-orange-200

              transition-all
              duration-300

              group-hover:translate-x-1
              group-hover:-translate-y-1
            "
          >
            <ArrowRight size={20} />
          </div>

          <div className="pr-14">
            <h3
              className="
                text-2xl
                font-bold
                leading-tight
                text-slate-900
              "
            >
              {restaurant.name}
            </h3>

            <p
              className="
                mt-2

                text-sm

                text-slate-500
              "
            >
              {restaurant.cuisine}
            </p>
          </div>

          {/* Location */}
          <div
            className="
              mt-4

              flex
              items-center
              gap-2

              text-sm

              text-slate-600
            "
          >
            <MapPin
              size={15}
              className="text-orange-500"
            />

            <span>{restaurant.city}</span>
          </div>

          {/* Bottom */}
          <div
            className="
              mt-5

              flex
              items-center
              justify-between

              border-t
              border-slate-100

              pt-4
            "
          >
            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <Clock
                size={15}
                className="text-orange-500"
              />

              <span className="text-sm text-slate-600">
                {restaurant.deliveryTime}
              </span>
            </div>

            <div
              className="
                flex
                items-center
                gap-2

                text-sm
                font-medium

                text-emerald-600
              "
            >
              <Bike size={15} />

              Free Delivery
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}