"use client";

import { useState } from "react";
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

export default function Navbar() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { totalItems } = useCart();

  const iconButton = `
    relative
    flex
    h-11
    w-11
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
          bg-white/80
          backdrop-blur-xl
          shadow-sm
        "
      >
        <Container>
          <div
            className="
              flex
              h-20
              items-center
              justify-between
            "
          >
            {/* Left */}
            <div className="flex items-center gap-3">
              <MobileMenu
                onOpen={() => setIsDrawerOpen(true)}
              />

              <Logo />
            </div>

            {/* Center */}
            <NavLinks />

            {/* Right */}
            <div className="flex items-center gap-3">

              {/* Search */}
              <Link
                href="/restaurants"
                className={iconButton}
                aria-label="Search Restaurants"
              >
                <Search size={20} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className={iconButton}
                aria-label="Shopping Cart"
              >
                <ShoppingCart size={20} />

                {totalItems > 0 && (
                  <span
                    className="
                      absolute
                      -right-1
                      -top-1
                      flex
                      h-5
                      w-5
                      items-center
                      justify-center
                      rounded-full
                      bg-orange-500
                      text-[10px]
                      font-bold
                      text-white
                    "
                  >
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Admin Login */}
              <Link
                href="/admin/login"
                className={iconButton}
                aria-label="Admin Login"
                title="Admin Login"
              >
                <User size={20} />
              </Link>

            </div>
          </div>
        </Container>
      </header>

      <MobileDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </>
  );
}