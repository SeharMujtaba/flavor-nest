import Image from "next/image";
import { Clock, Bike, Star } from "lucide-react";

export default function HeroImage() {
  return (
    <div className="relative flex justify-center">

      {/* Soft Background Blur */}
      <div
        className="
          absolute
          h-[500px]
          w-[500px]
          rounded-full
          bg-orange-200/40
          blur-[130px]
        "
      />

      <div
        className="
          relative
          w-full
          max-w-[460px]

          rounded-[45px]

          bg-white/80
          backdrop-blur-xl

          border
          border-white

          p-8

          shadow-[0_25px_80px_rgba(0,0,0,0.08)]
        "
      >

        {/* Rating */}
        <div
          className="
            absolute
            right-8
            top-8

            flex
            items-center
            gap-2

            rounded-full
            bg-white

            px-5
            py-2

            shadow-md
          "
        >
          <Star
            size={18}
            className="fill-yellow-400 text-yellow-400"
          />

          <span className="font-semibold text-slate-800">
            4.9
          </span>
        </div>


        {/* Image Box */}
        <div
          className="
            flex
            h-[350px]

            items-center
            justify-center

            rounded-[35px]

            bg-gradient-to-br
            from-orange-50
            via-white
            to-yellow-50
          "
        >

          <Image
  src="/images/hero/hero-food.png"
  alt="Delicious Food"
  width={330}
  height={330}
  priority
  className="
    h-auto
    w-auto
    object-contain
  "
/>

        </div>


        {/* Content */}

        <h2
          className="
            mt-8
            text-3xl
            font-bold
            text-slate-900
          "
        >
          FlavorNest Special
        </h2>


        <p
          className="
            mt-2
            text-slate-500
          "
        >
          Fresh • Hot • Delicious
        </p>


        {/* Bottom Info */}

        <div
          className="
            mt-8
            grid
            grid-cols-2
            gap-4
          "
        >

          <div
            className="
              flex
              items-center
              gap-3
              rounded-2xl
              bg-orange-50
              p-4
            "
          >

            <Clock
              className="text-orange-500"
              size={24}
            />

            <div>
              <p className="text-xs text-slate-500">
                Delivery
              </p>

              <p className="font-bold text-slate-800">
                20-25 min
              </p>
            </div>

          </div>


          <div
            className="
              flex
              items-center
              gap-3

              rounded-2xl
              bg-emerald-50

              p-4
            "
          >

            <Bike
              className="text-emerald-600"
              size={24}
            />

            <div>
              <p className="text-xs text-slate-500">
                Shipping
              </p>

              <p className="font-bold text-slate-800">
                Free
              </p>
            </div>

          </div>

        </div>


      </div>


    </div>
  );
}