import Image from "next/image";
import { Heart, Plus, Star } from "lucide-react";

type MenuItem = {
  id: number;
  restaurantId: number;
  name: string;
  image: string;
  description: string;
  price: number;
  rating: number;
};

type MenuCardProps = {
  item: MenuItem;
};

export default function MenuCard({
  item,
}: MenuCardProps) {
  return (
    <div
      className="
        group

        overflow-hidden

        rounded-[28px]

        border
        border-slate-200

        bg-white

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-2
        hover:shadow-2xl
        hover:shadow-orange-100
      "
    >
      {/* Image */}

      <div className="relative h-60 overflow-hidden">

        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 25vw"
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
            left-4
            top-4

            flex
            items-center
            gap-1

            rounded-full

            bg-white

            px-3
            py-1.5

            shadow-lg
          "
        >
          <Star
            size={15}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-bold">
            {item.rating}
          </span>
        </div>

        {/* Favourite */}

        <button
          className="
            absolute
            right-4
            top-4

            flex
            h-11
            w-11
            items-center
            justify-center

            rounded-full

            bg-white

            shadow-lg

            transition-all
            duration-300

            hover:scale-110
            hover:bg-red-500
            hover:text-white
          "
        >
          <Heart size={18} />
        </button>

      </div>

      {/* Content */}

      <div className="p-6">

        <h3
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          {item.name}
        </h3>

        <p
          className="
            mt-3

            line-clamp-2

            text-sm
            leading-7

            text-slate-500
          "
        >
          {item.description}
        </p>

        {/* Bottom */}

        <div
          className="
            mt-8

            flex
            items-center
            justify-between

            border-t
            border-slate-100

            pt-5
          "
        >
          <div>

            <p className="text-sm text-slate-400">
              Starting From
            </p>

            <h2
              className="
                mt-1

                text-3xl
                font-extrabold

                text-orange-500
              "
            >
              Rs. {item.price}
            </h2>

          </div>

          <button
            className="
              flex
              items-center
              gap-2

              rounded-2xl

              bg-orange-500

              px-5
              py-3

              font-semibold

              text-white

              shadow-lg

              transition-all
              duration-300

              hover:-translate-y-1
              hover:bg-orange-600
              hover:shadow-xl
            "
          >
            <Plus size={18} />

            Add
          </button>

        </div>

      </div>
    </div>
  );
}