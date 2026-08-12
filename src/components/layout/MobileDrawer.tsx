"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  X,
  Home,
  Utensils,
  Grid2X2,
  Tag,
  Mail,
  User,
  ShoppingCart,
} from "lucide-react";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const links = [
  {
    name: "Home",
    href: "/",
    icon: Home,
  },
  {
    name: "Restaurants",
    href: "/restaurants",
    icon: Utensils,
  },
  {
    name: "Categories",
    href: "/categories",
    icon: Grid2X2,
  },
  {
    name: "Offers",
    href: "/offers",
    icon: Tag,
  },
  {
    name: "Contact",
    href: "/contact",
    icon: Mail,
  },
];

export default function MobileDrawer({
  isOpen,
  onClose,
}: MobileDrawerProps) {
  const pathname = usePathname();

  return (
    <>
      {/* OVERLAY */}
      <div
        aria-hidden={!isOpen}
        onClick={onClose}
        className={`
          fixed
          inset-0
          z-[60]
          bg-black/40
          backdrop-blur-[2px]
          transition-all
          duration-300
          ${
            isOpen
              ? "visible opacity-100"
              : "invisible opacity-0"
          }
        `}
      />

      {/* DRAWER */}
      <aside
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
        className={`
          fixed
          left-0
          top-0
          z-[70]
          flex
          h-dvh
          w-[min(86vw,340px)]
          flex-col
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          ease-out
          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >
        {/* DRAWER HEADER */}
        <div
          className="
            flex
            shrink-0
            items-center
            justify-between
            border-b
            border-slate-200
            px-5
            py-5
          "
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-orange-500">
              Welcome to
            </p>

            <h2 className="mt-1 text-xl font-extrabold text-slate-900">
              FlavorNest
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-full
              border
              border-slate-200
              text-slate-600
              transition
              hover:border-orange-500
              hover:bg-orange-500
              hover:text-white
            "
            aria-label="Close navigation menu"
          >
            <X size={21} />
          </button>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 overflow-y-auto px-4 py-6">
          <ul className="space-y-2">
            {links.map((link) => {
              const Icon = link.icon;

              const active =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);

              return (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    onClick={onClose}
                    className={`
                      flex
                      items-center
                      gap-4
                      rounded-xl
                      px-4
                      py-3.5
                      text-base
                      font-semibold
                      transition-all
                      duration-200
                      ${
                        active
                          ? "bg-orange-50 text-orange-500"
                          : "text-slate-700 hover:bg-orange-50 hover:text-orange-500"
                      }
                    `}
                  >
                    <Icon
                      size={20}
                      className="shrink-0"
                    />

                    <span>{link.name}</span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* EXTRA LINKS */}
          <div className="mt-8 border-t border-slate-200 pt-6">
            <p className="px-4 text-xs font-bold uppercase tracking-wider text-slate-400">
              Quick Access
            </p>

            <div className="mt-3 space-y-2">
              <Link
                href="/cart"
                onClick={onClose}
                className="
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3.5
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-orange-50
                  hover:text-orange-500
                "
              >
                <ShoppingCart size={20} />

                <span>Shopping Cart</span>
              </Link>

              <Link
                href="/admin/login"
                onClick={onClose}
                className="
                  flex
                  items-center
                  gap-4
                  rounded-xl
                  px-4
                  py-3.5
                  font-semibold
                  text-slate-700
                  transition
                  hover:bg-orange-50
                  hover:text-orange-500
                "
              >
                <User size={20} />

                <span>Admin Login</span>
              </Link>
            </div>
          </div>
        </nav>

        {/* DRAWER FOOTER */}
        <div className="shrink-0 border-t border-slate-200 px-5 py-5">
          <p className="text-center text-xs text-slate-400">
            Delicious food, delivered with care.
          </p>
        </div>
      </aside>
    </>
  );
}