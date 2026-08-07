"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Save } from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function AddProductPage() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    description: "",
    price: "",
    rating: "",
    category: "",
    restaurant: "",
    image: "",
    available: true,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;

    setForm((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (
    e: FormEvent<HTMLFormElement>
  ) => {
    e.preventDefault();

    setError("");

    if (!form.name.trim()) {
      setError("Product name is required.");
      return;
    }

    if (!form.price || Number(form.price) < 0) {
      setError("Please enter a valid price.");
      return;
    }

    if (!form.category.trim()) {
      setError("Category is required.");
      return;
    }

    if (!form.restaurant.trim()) {
      setError("Restaurant is required.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: form.name.trim(),
            description: form.description.trim(),
            price: Number(form.price),
            rating: form.rating
              ? Number(form.rating)
              : 0,
            category: form.category.trim(),
            restaurant: form.restaurant.trim(),
            image: form.image.trim(),
            available: form.available,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to create product"
        );
      }

      alert("Product created successfully!");

      router.push("/admin/products");
      router.refresh();
    } catch (error) {
      console.error("Create product error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-4xl space-y-8">

      {/* Header */}

      <div className="flex items-center gap-4">

        <Link
          href="/admin/products"
          className="rounded-xl border border-slate-300 bg-white p-3 text-slate-700 transition hover:border-orange-500 hover:text-orange-500"
        >
          <ArrowLeft size={20} />
        </Link>

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Add Product
          </h1>

          <p className="mt-2 text-slate-500">
            Add a new food item to FlavorNest.
          </p>
        </div>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
          <p className="font-semibold">
            {error}
          </p>
        </div>
      )}

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl bg-white p-6 shadow-sm md:p-8"
      >

        {/* Name */}

        <div>
          <label
            htmlFor="name"
            className="mb-2 block font-semibold text-slate-800"
          >
            Product Name *
          </label>

          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            placeholder="e.g. Chicken Burger"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {/* Description */}

        <div>
          <label
            htmlFor="description"
            className="mb-2 block font-semibold text-slate-800"
          >
            Description
          </label>

          <textarea
            id="description"
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            placeholder="Describe the food item..."
            className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />
        </div>

        {/* Price + Rating */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label
              htmlFor="price"
              className="mb-2 block font-semibold text-slate-800"
            >
              Price (Rs.) *
            </label>

            <input
              id="price"
              name="price"
              type="number"
              min="0"
              step="0.01"
              value={form.price}
              onChange={handleChange}
              placeholder="899"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <div>
            <label
              htmlFor="rating"
              className="mb-2 block font-semibold text-slate-800"
            >
              Rating
            </label>

            <input
              id="rating"
              name="rating"
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={form.rating}
              onChange={handleChange}
              placeholder="4.8"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

        </div>

        {/* Category + Restaurant */}

        <div className="grid gap-6 md:grid-cols-2">

          <div>
            <label
              htmlFor="category"
              className="mb-2 block font-semibold text-slate-800"
            >
              Category *
            </label>

            <input
              id="category"
              name="category"
              type="text"
              value={form.category}
              onChange={handleChange}
              placeholder="Burgers"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

          <div>
            <label
              htmlFor="restaurant"
              className="mb-2 block font-semibold text-slate-800"
            >
              Restaurant *
            </label>

            <input
              id="restaurant"
              name="restaurant"
              type="text"
              value={form.restaurant}
              onChange={handleChange}
              placeholder="Burger Hub"
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />
          </div>

        </div>

        {/* Image */}

        <div>
          <label
            htmlFor="image"
            className="mb-2 block font-semibold text-slate-800"
          >
            Image URL
          </label>

          <input
            id="image"
            name="image"
            type="text"
            value={form.image}
            onChange={handleChange}
            placeholder="/images/burger.jpg"
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
          />

          <p className="mt-2 text-sm text-slate-500">
            Example: /images/burger.jpg
          </p>
        </div>

        {/* Availability */}

        <div className="rounded-xl bg-slate-50 p-4">

          <label className="flex cursor-pointer items-center gap-3">

            <input
              type="checkbox"
              checked={form.available}
              onChange={(e) =>
                setForm((current) => ({
                  ...current,
                  available: e.target.checked,
                }))
              }
              className="h-5 w-5 accent-orange-500"
            />

            <span className="font-semibold text-slate-800">
              Product is available
            </span>

          </label>

        </div>

        {/* Buttons */}

        <div className="flex flex-col-reverse gap-3 border-t border-slate-200 pt-6 sm:flex-row sm:justify-end">

          <Link
            href="/admin/products"
            className="rounded-xl border border-slate-300 px-6 py-3 text-center font-semibold text-slate-700 transition hover:bg-slate-100"
          >
            Cancel
          </Link>

          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-50"
          >
            <Save size={19} className="mr-2" />

            {loading
              ? "Saving..."
              : "Save Product"}
          </button>

        </div>

      </form>

    </div>
  );
}