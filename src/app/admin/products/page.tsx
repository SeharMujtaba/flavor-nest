"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Plus, Pencil, Trash2 } from "lucide-react";

import { menu } from "@/data/menu";

export default function ProductsPage() {
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState(menu);

  const handleSearch = () => {
    const value = search.toLowerCase().trim();

    if (!value) {
      setFilteredProducts(menu);
      return;
    }

    const filtered = menu.filter(
      (item) =>
        item.name.toLowerCase().includes(value) ||
        item.category.toLowerCase().includes(value)
    );

    setFilteredProducts(filtered);
  };

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Products
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all food items available on FlavorNest.
          </p>
        </div>

        <Link
          href="/admin/products/add"
          className="inline-flex items-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          <Plus size={20} className="mr-2" />
          Add Product
        </Link>

      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 md:flex-row">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSearch();
          }}
          placeholder="Search by product or category..."
          className="w-full max-w-lg rounded-xl border border-slate-300 bg-white px-5 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />

        <button
          onClick={handleSearch}
          className="rounded-xl bg-orange-500 px-8 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          Search
        </button>

      </div>

      {/* Products Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>
              <th className="p-5 text-left">Image</th>
              <th className="p-5 text-left">Product</th>
              <th className="p-5 text-left">Category</th>
              <th className="p-5 text-left">Price</th>
              <th className="p-5 text-left">Rating</th>
              <th className="p-5 text-center">Actions</th>
            </tr>

          </thead>

          <tbody>

            {filteredProducts.length > 0 ? (

              filteredProducts.map((item) => (

                <tr
                  key={item.id}
                  className="border-t border-slate-200 transition hover:bg-slate-50"
                >

                  <td className="p-4">

                    <div className="relative h-16 w-16 overflow-hidden rounded-xl">

                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />

                    </div>

                  </td>

                  <td className="p-4 font-semibold">
                    {item.name}
                  </td>

                  <td className="p-4 capitalize">
                    {item.category}
                  </td>

                  <td className="p-4">
                    Rs. {item.price}
                  </td>

                  <td className="p-4">
                    ⭐ {item.rating}
                  </td>

                  <td className="p-4">

                    <div className="flex justify-center gap-3">

                      <button
                        className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                      >
                        <Pencil size={18} />
                      </button>

                      <button
                        className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-600 hover:text-white"
                      >
                        <Trash2 size={18} />
                      </button>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="py-10 text-center text-lg font-medium text-slate-500"
                >
                  No products found.
                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}