"use client";

import Image from "next/image";
import { Heart, Plus, Star } from "lucide-react";
import { toast } from "react-hot-toast";

import { useCart } from "@/context/CartContext";

type MenuItem = {
  id: string | number;
  restaurantId:string  ;
  category?: string;
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
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart({
      id: item.id,
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
    });

    toast.success(`${item.name} added to cart!`, {
      duration: 2000,
      position: "top-right",
    });
  };

  return (
    <article
      className="
        group
        flex
        h-full
        flex-col
        overflow-hidden
        rounded-2xl
        border
        border-slate-100
        bg-white
        shadow-sm
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
      "
    >
      {/* Image */}
      <div className="relative h-52 overflow-hidden bg-slate-100">
        <Image
          src={
            item.image || "/images/placeholder.jpg"
          }
          alt={item.name}
          fill
          sizes="
            (max-width: 640px) 100vw,
            (max-width: 1024px) 50vw,
            25vw
          "
          className="
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        {/* Dark overlay */}
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black/20
            via-transparent
            to-transparent
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

          <span className="text-sm font-semibold text-slate-800">
            {item.rating > 0
              ? item.rating.toFixed(1)
              : "New"}
          </span>
        </div>

        {/* Wishlist */}
        <button
          type="button"
          aria-label={`Add ${item.name} to wishlist`}
          title="Add to wishlist"
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
            text-slate-700
            shadow-md
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
      <div className="flex flex-1 flex-col p-5">
        {/* Category */}
        {item.category && (
          <p className="mb-2 text-xs font-semibold uppercase tracking-wider text-orange-500">
            {item.category}
          </p>
        )}

        {/* Name */}
        <h3 className="line-clamp-1 text-xl font-bold text-slate-900">
          {item.name}
        </h3>

        {/* Description */}
        <p
          className="
            mt-3
            min-h-[48px]
            overflow-hidden
            text-sm
            leading-6
            text-slate-500
          "
        >
          {item.description ||
            "Delicious food prepared fresh for you."}
        </p>

        {/* Bottom */}
        <div className="mt-auto pt-5">
          <div className="border-t border-slate-100 pt-5">
            <p className="text-xs uppercase tracking-wider text-slate-400">
              Starting From
            </p>

            <h2 className="mt-1 text-3xl font-bold text-orange-500">
              Rs. {item.price.toLocaleString()}
            </h2>

            {/* Add to Cart */}
            <button
              type="button"
              onClick={handleAddToCart}
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
                active:scale-[0.98]
              "
            >
              <Plus size={18} />
              Add to Cart
            </button>
          </div>
        </div>
      </div>
    </article>
  );
}