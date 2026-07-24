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
    discount: "50%",
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

      {/* Hero */}

      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-24">

        <div className="mx-auto max-w-7xl px-6">

          {/* Navigation */}

          <Link
            href="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/20
              px-6
              py-3
              font-semibold
              text-white
              backdrop-blur-md
              transition
              hover:bg-white
              hover:text-orange-500
            "
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="max-w-3xl">

            <div className="inline-flex items-center gap-3 rounded-full bg-white/20 px-5 py-2 text-white backdrop-blur-md">

              <Gift size={20} />

              Exclusive Deals

            </div>

            <h1 className="mt-8 text-6xl font-extrabold text-white">
              Special Offers
            </h1>

            <p className="mt-6 text-xl leading-9 text-orange-100">
              Save more on every meal with exclusive discounts,
              combo deals and limited-time promotions.
            </p>

            <Link
              href="/restaurants"
              className="
                mt-10
                inline-flex
                items-center
                gap-3
                rounded-xl
                bg-white
                px-8
                py-4
                font-bold
                text-orange-600
                transition
                hover:scale-105
              "
            >
              Order Now

              <ArrowRight size={20} />
            </Link>

          </div>

        </div>

      </section>

      {/* Offers */}

      <section className="py-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="mb-16 text-center">

            <h2 className="text-5xl font-extrabold text-slate-900">
              Today&apos;s Best Deals
            </h2>

            <p className="mt-5 text-lg text-slate-500">
              Don&apos;t miss these amazing discounts.
            </p>

          </div>

          <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

            {offers.map((offer) => (

              <div
                key={offer.id}
                className="
                  overflow-hidden
                  rounded-3xl
                  bg-white
                  shadow-lg
                  transition-all
                  duration-300
                  hover:-translate-y-2
                  hover:shadow-2xl
                "
              >

                <div className="relative h-72">

                  <Image
                    src={offer.image}
                    alt={offer.title}
                    fill
                    className="object-cover"
                  />

                  <div className="absolute left-5 top-5 rounded-full bg-red-500 px-5 py-2 font-bold text-white">

                    {offer.discount}

                  </div>

                </div>

                <div className="p-8">

                  <h3 className="text-2xl font-bold text-slate-900">
                    {offer.title}
                  </h3>

                  <p className="mt-4 leading-8 text-slate-500">
                    {offer.description}
                  </p>

                  <div className="mt-8 flex items-center justify-between">

                    <div className="rounded-xl bg-orange-100 px-5 py-3 font-bold text-orange-600">
                      {offer.code}
                    </div>

                    <button
                      className="
                        rounded-xl
                        bg-orange-500
                        px-6
                        py-3
                        font-semibold
                        text-white
                        transition
                        hover:bg-orange-600
                      "
                    >
                      Redeem
                    </button>

                  </div>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* Promo Code */}

      <section className="bg-slate-900 py-24">

        <div className="mx-auto max-w-5xl px-6 text-center">

          <Ticket
            size={70}
            className="mx-auto text-orange-500"
          />

          <h2 className="mt-8 text-5xl font-extrabold text-white">
            Promo Code
          </h2>

          <p className="mt-6 text-lg leading-8 text-slate-300">
            Use this promo code during checkout and enjoy
            additional savings.
          </p>

          <div className="mx-auto mt-10 max-w-md rounded-2xl border-2 border-dashed border-orange-500 bg-slate-800 py-6 text-center text-4xl font-extrabold tracking-widest text-orange-400">

            FLAVOR25

          </div>

        </div>

      </section>

      {/* Limited Offer */}

      <section className="py-24">

        <div className="mx-auto max-w-6xl px-6">

          <div className="rounded-3xl bg-gradient-to-r from-orange-500 to-red-500 px-10 py-16 text-center text-white shadow-xl">

            <Clock3
              size={70}
              className="mx-auto"
            />

            <h2 className="mt-8 text-5xl font-extrabold">
              Limited Time Offer
            </h2>

            <p className="mx-auto mt-6 max-w-3xl text-lg leading-8 text-orange-100">
              Hurry! These offers expire soon.
              Order today and enjoy massive savings.
            </p>

            <div className="mt-10 inline-flex items-center gap-3 rounded-xl bg-white px-8 py-4 font-bold text-orange-600">

              <Percent size={22} />

              Save Up To 50%

            </div>

          </div>

        </div>

      </section>

    </main>
  );
}