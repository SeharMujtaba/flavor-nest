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
        flex
        h-full
        flex-col

        overflow-hidden

        rounded-xl

        border
        border-slate-200

        bg-white

        shadow-sm

        transition-all
        duration-300

        hover:-translate-y-2
        hover:shadow-xl
        hover:shadow-orange-100
      "
    >
      {/* Image */}

      <div className="relative h-52 overflow-hidden">

        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
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

            shadow-md
          "
        >
          <Star
            size={14}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="text-sm font-semibold">
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
            h-10
            w-10
            items-center
            justify-center

            rounded-full

            bg-white

            shadow-md

            transition-all
            duration-300

            hover:bg-red-500
            hover:text-white
            hover:scale-110
          "
        >
          <Heart size={18} />
        </button>

      </div>

      {/* Content */}

      <div className="flex flex-1 flex-col p-5">

        <h3
          className="
            text-xl
            font-bold
            text-slate-900
          "
        >
          {item.name}
        </h3>

        {/* Fixed Description Height */}

        <p
          className="
            mt-3

            h-12

            overflow-hidden

            text-sm
            leading-6

            text-slate-500
          "
        >
          {item.description}
        </p>

        {/* Bottom */}

        <div className="mt-auto">

          <div className="border-t border-slate-100 pt-5">

            <p className="text-xs uppercase tracking-wider text-slate-400">
              Starting From
            </p>

            <h2
              className="
                mt-1

                text-3xl
                font-bold

                text-orange-500
              "
            >
              Rs. {item.price}
            </h2>

            <button
              className="
                mt-5

                flex
                h-11
                w-full

                items-center
                justify-center
                gap-2

                rounded-lg

                bg-orange-500

                font-semibold

                text-white

                transition-all
                duration-300

                hover:bg-orange-600
                hover:shadow-lg
              "
            >
              <Plus size={18} />

              Add to Cart

            </button>

          </div>

        </div>

      </div>

    </div>
  );
}