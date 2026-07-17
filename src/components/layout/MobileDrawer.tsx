"use client";

import { X } from "lucide-react";

type MobileDrawerProps = {
  isOpen: boolean;
  onClose: () => void;
};

const links = [
  "Home",
  "Restaurants",
  "Categories",
  "Offers",
  "Contact",
];

export default function MobileDrawer({
  isOpen,
  onClose,
}: MobileDrawerProps) {
  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        className={`
          fixed inset-0
          bg-black/40
          transition-opacity
          duration-300
          ${
            isOpen
              ? "opacity-100 visible"
              : "opacity-0 invisible"
          }
        `}
      />

      {/* Drawer */}

      <aside
        className={`
          fixed
          top-0
          left-0
          h-screen
          w-72
          bg-white
          shadow-2xl
          transition-transform
          duration-300
          z-50

          ${
            isOpen
              ? "translate-x-0"
              : "-translate-x-full"
          }
        `}
      >

        <div className="flex items-center justify-between border-b p-5">

          <h2 className="text-xl font-bold">
            FlavorNest
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <ul className="space-y-6 p-6">

          {links.map((link) => (

            <li
              key={link}
              className="cursor-pointer text-lg font-medium text-slate-700 hover:text-[#0F766E]"
            >
              {link}
            </li>

          ))}

        </ul>

      </aside>
    </>
  );
}