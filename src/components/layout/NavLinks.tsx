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

export default function NavLinks() {
  const pathname = usePathname();

  return (
    <nav className="hidden lg:flex">
      <ul className="flex items-center gap-6 xl:gap-10">
        {links.map((link) => {
          const active =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <li
              key={link.name}
              className="group"
            >
              <Link
                href={link.href}
                className={`
                  relative
                  inline-flex
                  py-2
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
                    bottom-0
                    left-0
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
    </nav>
  );
}