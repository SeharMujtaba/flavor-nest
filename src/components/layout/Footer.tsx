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
  "Home",
  "Restaurants",
  "Categories",
  "Offers",
  "Contact",
];

const categories = [
  "Burgers",
  "Pizza",
  "Biryani",
  "Chinese",
  "Desserts",
];

export default function Footer() {
  return (
    <footer
      id="contact"
      className="
        relative
        overflow-hidden

        bg-slate-700

        text-white

        pt-24
        pb-10
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          -top-32
          right-0

          h-80
          w-80

          rounded-full

          bg-orange-500/10

          blur-[120px]
        "
      />

      <Container>
        <div
          className="
            grid
            gap-14

            md:grid-cols-2
            lg:grid-cols-4
          "
        >
          {/* Logo */}

          <div>
            <Logo />

            <p
              className="
                mt-6

                leading-8

                text-slate-400
              "
            >
              FlavorNest helps you discover Pakistan&apos;s best restaurants
              and enjoy delicious meals delivered fresh to your doorstep.
            </p>

            <div className="mt-8 flex gap-4">
              {[Globe, Heart].map((Icon, index) => (
                <button
                  key={index}
                  className="
                    flex
                    h-11
                    w-11

                    items-center
                    justify-center

                    rounded-full

                    bg-slate-900

                    transition-all
                    duration-300

                    hover:-translate-y-1
                    hover:bg-orange-500
                  "
                >
                  <Icon size={18} />
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}

          <div>
            <h3 className="text-xl font-bold">
              Quick Links
            </h3>

            <ul className="mt-8 space-y-4">
              {quickLinks.map((item) => (
                <li key={item}>
                  <Link
                    href="/"
                    className="
                      text-slate-400

                      transition

                      hover:pl-2
                      hover:text-orange-400
                    "
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}

          <div>
            <h3 className="text-xl font-bold">
              Categories
            </h3>

            <ul className="mt-8 space-y-4">
              {categories.map((item) => (
                <li
                  key={item}
                  className="
                    text-slate-400

                    transition

                    hover:pl-2
                    hover:text-orange-400
                  "
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}

          <div>
            <h3 className="text-xl font-bold">
              Contact
            </h3>

            <div className="mt-8 space-y-6">
              <div className="flex gap-4">
                <MapPin
                  className="mt-1 text-orange-500"
                  size={20}
                />

                <span className="text-slate-400">
                  Islamabad, Pakistan
                </span>
              </div>

              <div className="flex gap-4">
                <Phone
                  className="text-orange-500"
                  size={20}
                />

                <span className="text-slate-400">
                  +92 300 1234567
                </span>
              </div>

              <div className="flex gap-4">
                <Mail
                  className="text-orange-500"
                  size={20}
                />

                <span className="text-slate-400">
                  info@flavornest.pk
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom */}

        <div
          className="
            mt-20

            border-t
            border-slate-800

            pt-8

            text-center

            text-slate-500
          "
        >
          © 2026 FlavorNest. All Rights Reserved.
        </div>
      </Container>
    </footer>
  );
}