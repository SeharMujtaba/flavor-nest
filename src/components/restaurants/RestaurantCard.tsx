import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Bike, Clock, MapPin, Star } from "lucide-react";

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
    <Link href={`/restaurants/${restaurant.id}`}>
      <div
        className="
          group
          relative
          overflow-hidden

          rounded-[30px]

          border
          border-slate-200

          bg-white

          shadow-sm

          transition-all
          duration-300

          hover:-translate-y-2
          hover:shadow-2xl
          hover:shadow-orange-100

          cursor-pointer
        "
      >
        {/* Image */}
        <div className="relative h-60 overflow-hidden rounded-t-[30px]">
          <Image
            src={restaurant.image}
            alt={restaurant.name}
            fill
            sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
            className="
              object-cover
              transition-transform
              duration-500
              group-hover:scale-110
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
              py-1.5

              shadow-lg
            "
          >
            <Star
              size={14}
              className="fill-yellow-400 text-yellow-400"
            />

            <span className="text-sm font-bold">
              {restaurant.rating}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="relative p-6">
          {/* Arrow Button */}
          <div
            className="
              absolute
              -top-9
              right-6

              flex
              h-14
              w-14
              items-center
              justify-center

              rounded-2xl

              bg-orange-500

              text-white

              shadow-xl
              shadow-orange-200

              transition-all
              duration-300

              group-hover:scale-110
              group-hover:-translate-y-1
            "
          >
            <ArrowRight size={24} />
          </div>

          <h3
            className="
              pr-16

              text-2xl
              font-bold

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

          {/* Location */}
          <div
            className="
              mt-5

              flex
              items-center
              gap-2

              text-sm
              text-slate-600
            "
          >
            <MapPin
              size={16}
              className="text-orange-500"
            />

            {restaurant.city}
          </div>

          {/* Bottom */}
          <div
            className="
              mt-6

              flex
              items-center
              justify-between

              border-t
              border-slate-100

              pt-5
            "
          >
            <div
              className="
                flex
                items-center
                gap-2

                text-sm

                text-slate-600
              "
            >
              <Clock
                size={16}
                className="text-orange-500"
              />

              {restaurant.deliveryTime}
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
              <Bike size={16} />

              Free Delivery
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}