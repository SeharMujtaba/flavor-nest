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
      type="button"
      onClick={onOpen}
      className="
        flex
        h-10
        w-10
        shrink-0
        items-center
        justify-center
        rounded-xl
        border
        border-slate-200
        bg-white
        text-slate-700
        shadow-sm
        transition-all
        duration-300
        hover:border-orange-500
        hover:bg-orange-500
        hover:text-white
        sm:h-11
        sm:w-11
        lg:hidden
      "
      aria-label="Open navigation menu"
      aria-haspopup="dialog"
    >
      <Menu size={23} />
    </button>
  );
}