"use client";

import { Menu } from "lucide-react";

type MobileMenuProps = {
  onOpen: () => void;
};

export default function MobileMenu({
  onOpen,
}: MobileMenuProps) {
  return (
    <button
      onClick={onOpen}
      className="
        rounded-xl
        p-3
        text-slate-700
        transition-all
        duration-300
        hover:bg-[#0F766E]
        hover:text-white
        lg:hidden
      "
      aria-label="Open Menu"
    >
      <Menu size={24} />
    </button>
  );
}