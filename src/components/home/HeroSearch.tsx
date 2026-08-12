"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const value = query.trim();

    if (!value) {
      router.push("/restaurants");
      return;
    }

    router.push(
      `/restaurants?search=${encodeURIComponent(value)}`
    );
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div
      className="
        flex
        w-full
        max-w-xl
        items-center
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-2
        shadow-[0_15px_40px_rgba(15,23,42,0.08)]
        transition-all
        duration-300
        focus-within:border-orange-300
        focus-within:shadow-[0_20px_50px_rgba(249,115,22,0.15)]
      "
    >
      {/* Input */}

      <div
        className="
          flex
          min-w-0
          flex-1
          items-center
          px-3
          sm:px-5
        "
      >
        <Search
          size={22}
          className="mr-3 shrink-0 text-orange-400 sm:mr-4"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search restaurants, dishes..."
          className="
            w-full
            min-w-0
            bg-transparent
            py-4
            text-base
            text-slate-700
            placeholder:text-slate-400
            outline-none
            sm:text-lg
          "
        />
      </div>

      {/* Search Button */}

      <button
        type="button"
        onClick={handleSearch}
        className="
          flex
          h-12
          min-w-[105px]
          shrink-0
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-orange-500
          to-orange-600
          px-5
          text-sm
          font-bold
          text-white
          shadow-md
          shadow-orange-200
          transition-all
          duration-300
          hover:-translate-y-1
          hover:shadow-xl
          hover:from-orange-600
          hover:to-orange-700
          active:scale-95
          sm:h-14
          sm:min-w-[130px]
          sm:px-6
          sm:text-base
        "
      >
        Search
      </button>
    </div>
  );
}