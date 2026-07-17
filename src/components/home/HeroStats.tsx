import {
  Store,
  ShoppingBag,
  Star,
} from "lucide-react";

const stats = [
  {
    number: "200+",
    title: "Restaurants",
    icon: Store,
  },
  {
    number: "20K+",
    title: "Orders Delivered",
    icon: ShoppingBag,
  },
  {
    number: "4.9",
    title: "Customer Rating",
    icon: Star,
  },
];

export default function HeroStats() {
  return (
    <div
      className="
        mt-14

        grid
        grid-cols-1

        gap-5

        sm:grid-cols-3

        lg:gap-6
      "
    >

      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.title}
            className="
              group

              flex
              items-center
              gap-4

              rounded-3xl

              border
              border-slate-100

              bg-white/90

              p-5

              shadow-[0_10px_35px_rgba(15,23,42,0.06)]

              transition-all
              duration-300

              hover:-translate-y-2
              hover:shadow-[0_20px_45px_rgba(249,115,22,0.15)]
            "
          >

            {/* Icon Box */}
            <div
              className="
                flex
                h-14
                w-14

                shrink-0

                items-center
                justify-center

                rounded-2xl

                bg-gradient-to-br
                from-orange-100
                to-orange-50

                text-orange-500

                transition-all
                duration-300

                group-hover:scale-110
              "
            >
              <Icon size={26} />
            </div>


            {/* Content */}
            <div>

              <h3
                className="
                  text-3xl
                  font-extrabold

                  tracking-tight

                  text-slate-900
                "
              >
                {item.number}
              </h3>


              <p
                className="
                  mt-1

                  text-sm

                  font-medium

                  text-slate-500
                "
              >
                {item.title}
              </p>

            </div>

          </div>
        );
      })}

    </div>
  );
}