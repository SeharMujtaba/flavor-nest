import Link from "next/link";

import {
  Globe,
  MapPin,
  Phone,
  Mail,
  Heart,
} from "lucide-react";

import Container from "../common/Container";
import Logo from "./Logo";

const quickLinks = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Restaurants",
    href: "/restaurants",
  },
  {
    name: "Categories",
    href: "/categories",
  },
  {
    name: "Offers",
    href: "/offers",
  },
  {
    name: "Contact",
    href: "/contact",
  },
];

const categories = [
  {
    name: "Burgers",
    href: "/categories?category=Burgers",
  },
  {
    name: "Pizza",
    href: "/categories?category=Pizza",
  },
  {
    name: "Biryani",
    href: "/categories?category=Biryani",
  },
  {
    name: "Chinese",
    href: "/categories?category=Chinese",
  },
  {
    name: "Desserts",
    href: "/categories?category=Desserts",
  },
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="
        relative
        overflow-hidden
        bg-slate-700
        pt-16
        text-white
        sm:pt-20
        lg:pt-24
      "
    >
      {/* BACKGROUND GLOW */}
      <div
        className="
          pointer-events-none
          absolute
          -right-20
          -top-32
          h-72
          w-72
          rounded-full
          bg-orange-500/10
          blur-[100px]
          sm:-right-10
          sm:h-80
          sm:w-80
        "
      />

      <Container>
        <div
          className="
            grid
            gap-12
            sm:gap-14
            md:grid-cols-2
            lg:grid-cols-4
            lg:gap-10
            xl:gap-14
          "
        >
          {/* LOGO / ABOUT */}
          <div className="md:col-span-2 lg:col-span-1">
            <Logo />

            <p
              className="
                mt-5
                max-w-md
                text-sm
                leading-7
                text-slate-400
                sm:mt-6
                sm:text-base
                sm:leading-8
              "
            >
              FlavorNest helps you discover Pakistan&apos;s
              best restaurants and enjoy delicious meals
              delivered fresh to your doorstep.
            </p>

            <div className="mt-7 flex gap-3 sm:mt-8 sm:gap-4">
              <button
                type="button"
                aria-label="Website"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-900
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-orange-500
                  sm:h-11
                  sm:w-11
                "
              >
                <Globe size={18} />
              </button>

              <button
                type="button"
                aria-label="Favorite"
                className="
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  rounded-full
                  bg-slate-900
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  hover:bg-orange-500
                  sm:h-11
                  sm:w-11
                "
              >
                <Heart size={18} />
              </button>
            </div>
          </div>

          {/* QUICK LINKS */}
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              Quick Links
            </h3>

            <ul className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
              {quickLinks.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="
                      inline-block
                      text-sm
                      text-slate-400
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:text-orange-400
                      sm:text-base
                    "
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CATEGORIES */}
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              Categories
            </h3>

            <ul className="mt-5 space-y-3 sm:mt-8 sm:space-y-4">
              {categories.map((item) => (
                <li key={item.name}>
                  <Link
                    href={item.href}
                    className="
                      inline-block
                      text-sm
                      text-slate-400
                      transition-all
                      duration-200
                      hover:translate-x-1
                      hover:text-orange-400
                      sm:text-base
                    "
                  >
                    {item.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CONTACT */}
          <div>
            <h3 className="text-lg font-bold sm:text-xl">
              Contact
            </h3>

            <div className="mt-5 space-y-5 sm:mt-8 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin
                  className="mt-1 shrink-0 text-orange-500"
                  size={19}
                />

                <span className="text-sm leading-6 text-slate-400 sm:text-base">
                  Islamabad, Pakistan
                </span>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <Phone
                  className="mt-1 shrink-0 text-orange-500"
                  size={19}
                />

                <a
                  href="tel:+923001234567"
                  className="
                    text-sm
                    text-slate-400
                    transition
                    hover:text-orange-400
                    sm:text-base
                  "
                >
                  +92 300 1234567
                </a>
              </div>

              <div className="flex items-start gap-3 sm:gap-4">
                <Mail
                  className="mt-1 shrink-0 text-orange-500"
                  size={19}
                />

                <a
                  href="mailto:info@flavornest.pk"
                  className="
                    break-all
                    text-sm
                    text-slate-400
                    transition
                    hover:text-orange-400
                    sm:text-base
                  "
                >
                  info@flavornest.pk
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* BOTTOM */}
        <div
          className="
            mt-14
            border-t
            border-slate-600
            py-7
            text-center
            sm:mt-20
            sm:py-8
          "
        >
          <p className="text-xs text-slate-500 sm:text-sm">
            © 2026 FlavorNest. All Rights Reserved.
          </p>
        </div>
      </Container>
    </footer>
  );
}