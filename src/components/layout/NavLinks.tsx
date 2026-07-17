"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const links = [
  {
    name: "Home",
    href: "/",
  },
  {
    name: "Restaurants",
    href: "/restaurants/1",
  },
  {
    name: "Categories",
    href: "#categories",
  },
  {
    name: "Offers",
    href: "#offers",
  },
  {
    name: "Contact",
    href: "#contact",
  },
];

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <ul className="hidden items-center gap-10 lg:flex">
      {links.map((link) => {
        const active =
          link.href === "/"
            ? pathname === "/"
            : link.name === "Restaurants"
            ? pathname.startsWith("/restaurants")
            : false;

        return (
          <li
            key={link.name}
            className="group"
          >
            <Link
              href={link.href}
              className={`
                relative

                text-[15px]
                font-semibold

                transition-all
                duration-300

                ${
                  active
                    ? "text-orange-500"
                    : "text-slate-600 hover:text-orange-500"
                }
              `}
            >
              {link.name}

              <span
                className={`
                  absolute
                  left-0
                  -bottom-2

                  h-[2px]

                  rounded-full

                  bg-orange-500

                  transition-all
                  duration-300

                  ${
                    active
                      ? "w-full"
                      : "w-0 group-hover:w-full"
                  }
                `}
              />
            </Link>
          </li>
        );
      })}
    </ul>
  );
}