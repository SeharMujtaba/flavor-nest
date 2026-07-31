"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Search } from "lucide-react";

export default function HeroSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const value = query.trim();

    if (value) {
      router.push(
        `/restaurants?search=${encodeURIComponent(value)}`
      );
    } else {
      router.push("/restaurants");
    }
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
          flex-1
          items-center
          px-5
        "
      >
        <Search
          size={24}
          className="mr-4 text-orange-400"
        />

        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search restaurants, dishes..."
          className="
            w-full
            bg-transparent
            py-4
            text-lg
            text-slate-700
            placeholder:text-slate-400
            outline-none
          "
        />
      </div>

      {/* Button */}

      <button
        onClick={handleSearch}
        className="
          flex
          h-14
          min-w-[150px]
          items-center
          justify-center
          rounded-2xl
          bg-gradient-to-r
          from-orange-500
          to-orange-600
          px-8
          text-base
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
          max-sm:min-w-[110px]
        "
      >
        Search
      </button>
    </div>
  );
}