"use client";

import Link from "next/link";
import {
  Search,
  ShoppingCart,
  User,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

import Container from "../common/Container";
import Logo from "./Logo";
import NavLinks from "./NavLinks";
import MobileMenu from "./MobileMenu";
import MobileDrawer from "./MobileDrawer";
import { useState } from "react";

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { totalItems } = useCart();

  const iconButton = `
    relative
    flex
    h-10
    w-10
    shrink-0
    items-center
    justify-center
    rounded-full
    border
    border-slate-200
    bg-white
    text-slate-700
    shadow-sm
    transition-all
    duration-300
    hover:-translate-y-1
    hover:scale-105
    hover:border-orange-500
    hover:bg-orange-500
    hover:text-white
    hover:shadow-lg
    hover:shadow-orange-200
    sm:h-11
    sm:w-11
  `;

  return (
    <>
      <header
        className="
          sticky
          top-0
          z-50
          border-b
          border-slate-200/70
          bg-white/90
          shadow-sm
          backdrop-blur-xl
        "
      >
        <Container>
          <div
            className="
              flex
              min-h-16
              items-center
              justify-between
              gap-2
              py-2
              sm:min-h-20
              sm:gap-4
              sm:py-0
            "
          >
            {/* LEFT SIDE */}
            <div className="flex min-w-0 items-center gap-2 sm:gap-3">
              <MobileMenu
                onOpen={() => setIsDrawerOpen(true)}
              />

              <Logo />
            </div>

            {/* DESKTOP NAVIGATION */}
            <NavLinks />

            {/* RIGHT SIDE */}
            <div className="flex shrink-0 items-center gap-2 sm:gap-3">

              {/* SEARCH */}
              <Link
                href="/restaurants"
                className={iconButton}
                aria-label="Search Restaurants"
                title="Search Restaurants"
              >
                <Search size={19} />
              </Link>

              {/* CART */}
              <Link
                href="/cart"
                className={iconButton}
                aria-label="Shopping Cart"
                title="Shopping Cart"
              >
                <ShoppingCart size={19} />

                {totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-5
                      min-w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-500
                      px-1
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* ADMIN LOGIN */}
              <Link
                href="/admin/login"
                className={`${iconButton} hidden sm:flex`}
                aria-label="Admin Login"
                title="Admin Login"
              >
                <User size={19} />
              </Link>
            </div>
          </div>
        </Container>
      </header>

      {/* MOBILE DRAWER */}
      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}