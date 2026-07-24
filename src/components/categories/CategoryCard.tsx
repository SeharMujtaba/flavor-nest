import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Category } from "@/data/categories";

type CategoryCardProps = {
  category: Category;
};

export default function CategoryCard({
  category,
}: CategoryCardProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="group block h-full"
    >
      <article
        className="
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
          hover:border-orange-200
          hover:shadow-xl
          hover:shadow-orange-100/70
        "
      >
        {/* Image */}

        <div className="relative h-56 overflow-hidden">

          <Image
            src={category.image}
            alt={category.name}
            fill
            sizes="(max-width:768px)100vw,(max-width:1200px)50vw,25vw"
            className="
              object-cover

              transition-transform
              duration-500

              group-hover:scale-110
            "
          />

          {/* Overlay */}

          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

          {/* Badge */}

          <div
            className="
              absolute
              top-4
              left-4

              rounded-full

              bg-white/95

              px-4
              py-2

              text-sm
              font-semibold

              text-orange-600

              shadow-md
            "
          >
            {category.items} Dishes
          </div>

          {/* Category Name */}

          <div className="absolute bottom-5 left-5 right-5">

            <h3
              className="
                text-3xl
                font-bold

                text-white
              "
            >
              {category.name}
            </h3>

          </div>

        </div>

        {/* Content */}

        <div
          className="
            flex
            flex-1
            flex-col

            p-6
          "
        >

          <p
            className="
              flex-1

              text-sm
              leading-7

              text-slate-500
            "
          >
            {category.description}
          </p>

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

            <span
              className="
                text-sm
                font-semibold

                text-orange-500
              "
            >
              Explore Category
            </span>

            <div
              className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                bg-orange-100

                text-orange-500

                transition-all
                duration-300

                group-hover:translate-x-1
                group-hover:bg-orange-500
                group-hover:text-white
              "
            >
              <ArrowRight size={18} />
            </div>

          </div>

        </div>

      </article>
    </Link>
  );
}