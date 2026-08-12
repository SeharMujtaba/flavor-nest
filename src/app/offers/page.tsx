import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Percent,
  Clock3,
  Gift,
  ArrowRight,
  Ticket,
} from "lucide-react";

const offers = [
  {
    id: 1,
    title: "50% OFF Burgers",
    description:
      "Enjoy delicious burgers with an amazing 50% discount.",
    image: "/images/offers/burger-offer.jpg",
    discount: "50% OFF",
    code: "BURGER50",
  },
  {
    id: 2,
    title: "Buy 1 Get 1 Pizza",
    description:
      "Order one large pizza and get another absolutely free.",
    image: "/images/offers/pizza-offer.jpg",
    discount: "BOGO",
    code: "PIZZAFREE",
  },
  {
    id: 3,
    title: "Free Dessert",
    description:
      "Get a free dessert on orders above Rs. 3000.",
    image: "/images/offers/dessert-offer.jpg",
    discount: "FREE",
    code: "SWEET",
  },
];

export default function OffersPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* =====================================================
          HERO
      ===================================================== */}

      <section className="w-full bg-gradient-to-r from-orange-500 via-orange-600 to-red-500">
        <div className="mx-auto w-full max-w-7xl px-4 py-10 sm:px-6 lg:px-8">

          {/* Back Button */}
          <Link
            href="/"
            className="
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/15
              px-4
              py-2
              text-sm
              font-semibold
              text-white
              backdrop-blur-sm
              transition-all
              duration-200
              hover:bg-white
              hover:text-orange-600
            "
          >
            <ArrowLeft size={16} />
            Back to Home
          </Link>

          {/* Hero Content */}
          <div className="mt-8 max-w-2xl">

            {/* Badge */}
            <div
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                bg-white/15
                px-4
                py-2
                text-xs
                font-bold
                text-white
                backdrop-blur-sm
              "
            >
              <Gift size={16} />
              Exclusive Deals
            </div>

            <h1
              className="
                mt-4
                text-4xl
                font-extrabold
                tracking-tight
                text-white
                sm:text-5xl
              "
            >
              Special Offers
            </h1>

            <p
              className="
                mt-3
                max-w-xl
                text-sm
                leading-6
                text-orange-100
                sm:text-base
              "
            >
              Save more on every meal with exclusive discounts,
              combo deals and limited-time promotions.
            </p>

            <Link
              href="/restaurants"
              className="
                mt-6
                inline-flex
                items-center
                gap-2
                rounded-lg
                bg-white
                px-5
                py-2.5
                text-sm
                font-bold
                text-orange-600
                shadow-md
                transition-all
                duration-200
                hover:-translate-y-0.5
                hover:shadow-lg
              "
            >
              Order Now
              <ArrowRight size={16} />
            </Link>

          </div>
        </div>
      </section>


      {/* =====================================================
          OFFERS
      ===================================================== */}

      <section className="w-full bg-[#FAFAF7] py-14">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Heading */}
          <div className="mx-auto mb-10 max-w-2xl text-center">

            <span
              className="
                inline-flex
                rounded-full
                bg-orange-100
                px-4
                py-1.5
                text-xs
                font-bold
                uppercase
                tracking-wider
                text-orange-600
              "
            >
              Best Deals
            </span>

            <h2
              className="
                mt-3
                text-3xl
                font-extrabold
                tracking-tight
                text-slate-900
                sm:text-4xl
              "
            >
              Today&apos;s Best Deals
            </h2>

            <p
              className="
                mx-auto
                mt-3
                max-w-lg
                text-sm
                leading-6
                text-slate-500
              "
            >
              Grab your favourite meals at special prices before
              these offers disappear.
            </p>

          </div>


          {/* Offer Cards */}
          <div
            className="
              grid
              gap-6
              sm:grid-cols-2
              lg:grid-cols-3
            "
          >
            {offers.map((offer) => (
              <article
                key={offer.id}
                className="
                  group
                  overflow-hidden
                  rounded-2xl
                  border
                  border-slate-200
                  bg-white
                  shadow-sm
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:border-orange-200
                  hover:shadow-lg
                "
              >

                {/* Image */}
                <div className="relative h-40 overflow-hidden">

                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    sizes="
                      (max-width: 640px) 100vw,
                      (max-width: 1024px) 50vw,
                      33vw
                    "
                    className="
                      object-cover
                      transition-transform
                      duration-500
                      group-hover:scale-105
                    "
                  />

                  {/* Image Overlay */}
                  <div
                    className="
                      absolute
                      inset-0
                      bg-gradient-to-t
                      from-black/40
                      via-transparent
                      to-transparent
                    "
                  />

                  {/* Discount Badge */}
                  <div
                    className="
                      absolute
                      left-4
                      top-4
                      rounded-full
                      bg-red-500
                      px-3
                      py-1.5
                      text-xs
                      font-bold
                      text-white
                      shadow-md
                    "
                  >
                    {offer.discount}
                  </div>

                </div>


                {/* Card Content */}
                <div className="p-5">

                  <h3
                    className="
                      text-lg
                      font-bold
                      text-slate-900
                    "
                  >
                    {offer.title}
                  </h3>

                  <p
                    className="
                      mt-2
                      min-h-[44px]
                      text-sm
                      leading-6
                      text-slate-500
                    "
                  >
                    {offer.description}
                  </p>


                  {/* Bottom Row */}
                  <div
                    className="
                      mt-5
                      flex
                      items-center
                      justify-between
                      gap-3
                      border-t
                      border-slate-100
                      pt-4
                    "
                  >

                    {/* Promo Code */}
                    <div
                      className="
                        flex
                        min-w-0
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-orange-50
                        px-3
                        py-2
                        text-xs
                        font-bold
                        tracking-wide
                        text-orange-600
                      "
                    >
                      <Ticket
                        size={14}
                        className="shrink-0"
                      />

                      <span className="truncate">
                        {offer.code}
                      </span>
                    </div>


                    {/* Redeem */}
                    <Link
                      href="/restaurants"
                      className="
                        inline-flex
                        shrink-0
                        items-center
                        gap-1.5
                        rounded-lg
                        bg-orange-500
                        px-4
                        py-2
                        text-xs
                        font-bold
                        text-white
                        transition-all
                        duration-200
                        hover:bg-orange-600
                      "
                    >
                      Redeem
                      <ArrowRight size={14} />
                    </Link>

                  </div>

                </div>
              </article>
            ))}
          </div>

        </div>
      </section>


      {/* =====================================================
          PROMO CODE
      ===================================================== */}

      <section className="w-full bg-slate-900 py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <div
            className="
              mx-auto
              flex
              max-w-4xl
              flex-col
              items-center
              justify-between
              gap-6
              rounded-2xl
              border
              border-slate-700
              bg-slate-800
              px-6
              py-7
              text-center
              shadow-lg
              md:flex-row
              md:text-left
            "
          >

            {/* Left */}
            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-11
                  w-11
                  shrink-0
                  items-center
                  justify-center
                  rounded-xl
                  bg-orange-500/10
                "
              >
                <Ticket
                  size={23}
                  className="text-orange-500"
                />
              </div>

              <div>
                <h2
                  className="
                    text-xl
                    font-extrabold
                    text-white
                  "
                >
                  Extra Savings
                </h2>

                <p
                  className="
                    mt-1
                    text-sm
                    text-slate-400
                  "
                >
                  Use this promo code during checkout.
                </p>
              </div>

            </div>


            {/* Code */}
            <div
              className="
                rounded-xl
                border-2
                border-dashed
                border-orange-500
                bg-slate-900
                px-6
                py-3
                text-xl
                font-extrabold
                tracking-[0.18em]
                text-orange-400
              "
            >
              FLAVOR25
            </div>

          </div>

        </div>
      </section>


      {/* =====================================================
          LIMITED OFFER
      ===================================================== */}

      <section className="w-full bg-[#FAFAF7] py-12">
        <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">

          <div
            className="
              relative
              overflow-hidden
              bg-gradient-to-r
              from-orange-500
              to-red-500
              px-6
              py-9
              text-center
              text-white
              shadow-lg
              sm:px-10
            "
          >

            {/* Decorative Glow */}
            <div
              className="
                pointer-events-none
                absolute
                -right-20
                -top-20
                h-48
                w-48
                rounded-full
                bg-white/10
                blur-3xl
              "
            />

            <div
              className="
                relative
                mx-auto
                flex
                max-w-3xl
                flex-col
                items-center
              "
            >

              {/* Icon */}
              <div
                className="
                  flex
                  h-11
                  w-11
                  items-center
                  justify-center
                  rounded-xl
                  bg-white/15
                "
              >
                <Clock3 size={23} />
              </div>

              <h2
                className="
                  mt-4
                  text-2xl
                  font-extrabold
                  sm:text-3xl
                "
              >
                Limited Time Offer
              </h2>

              <p
                className="
                  mt-2
                  max-w-xl
                  text-sm
                  leading-6
                  text-orange-100
                "
              >
                Hurry! These offers expire soon. Order today
                and enjoy massive savings.
              </p>

              <Link
                href="/restaurants"
                className="
                  mt-5
                  inline-flex
                  items-center
                  gap-2
                  rounded-lg
                  bg-white
                  px-5
                  py-2.5
                  text-sm
                  font-bold
                  text-orange-600
                  shadow-md
                  transition-all
                  duration-200
                  hover:-translate-y-0.5
                  hover:shadow-lg
                "
              >
                <Percent size={16} />
                Save Up To 50%
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </div>
      </section>

    </main>
  );
}