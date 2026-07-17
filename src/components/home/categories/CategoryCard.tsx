import Image from "next/image";
import { ArrowRight } from "lucide-react";

type CategoryCardProps = {
  title: string;
  image: string;
  description: string;
};

export default function CategoryCard({
  title,
  image,
  description,
}: CategoryCardProps) {
  return (
    <div
      className="
        group
        relative
        cursor-pointer
        overflow-hidden

        rounded-[28px]

        border
        border-slate-200/70

        bg-white/90

        backdrop-blur-sm

        shadow-md
        shadow-orange-100/40

        transition-all
        duration-500

        hover:-translate-y-3
        hover:border-orange-200
        hover:shadow-2xl
        hover:shadow-orange-200/50
      "
    >
      {/* Image */}
      <div
        className="
          relative
          h-56
          overflow-hidden
        "
      >
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width:768px) 100vw, (max-width:1200px) 50vw, 33vw"
          className="
            object-cover
            transition-transform
            duration-700
            group-hover:scale-110
          "
        />

        {/* Gradient Overlay */}
        <div
          className="
            absolute
            inset-0

            bg-gradient-to-t
            from-black/30
            via-transparent
            to-transparent
          "
        />
      </div>

      {/* Content */}
      <div className="relative p-6">
        <div
          className="
            absolute
            -top-7
            right-6

            flex
            h-14
            w-14
            items-center
            justify-center

            rounded-2xl

            bg-orange-500

            text-white

            shadow-lg
            shadow-orange-300

            transition-all
            duration-300

            group-hover:scale-110
            group-hover:rotate-12
          "
        >
          <ArrowRight size={22} />
        </div>

        <h3
          className="
            text-2xl
            font-bold
            text-slate-900

            transition-colors
            duration-300

            group-hover:text-orange-500
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3

            text-base
            leading-7

            text-slate-600
          "
        >
          {description}
        </p>

        <div
          className="
            mt-6

            inline-flex
            items-center
            gap-2

            font-semibold

            text-orange-500

            transition-all
            duration-300

            group-hover:gap-3
          "
        >
          Explore
          <ArrowRight
            size={18}
            className="
              transition-transform
              duration-300
              group-hover:translate-x-1
            "
          />
        </div>
      </div>
    </div>
  );
}