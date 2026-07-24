import Link from "next/link";
import { ArrowLeft, Upload } from "lucide-react";

export default function AddProductPage() {
  return (
    <div className="mx-auto max-w-5xl">

      {/* Header */}

      <div className="mb-10 flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Add Product
          </h1>

          <p className="mt-2 text-slate-500">
            Create a new menu item for your restaurant.
          </p>

        </div>

        <Link
          href="/admin/products"
          className="inline-flex items-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold transition hover:border-orange-400 hover:text-orange-500"
        >
          <ArrowLeft size={18} />
          Back
        </Link>

      </div>

      {/* Form */}

      <div className="rounded-3xl bg-white p-10 shadow-sm">

        <form className="space-y-8">

          {/* Product Name */}

          <div>

            <label className="mb-2 block font-semibold">
              Product Name
            </label>

            <input
              type="text"
              placeholder="Classic Burger"
              className="w-full rounded-xl border border-slate-200 px-5 py-3 outline-none focus:border-orange-500"
            />

          </div>

          {/* Description */}

          <div>

            <label className="mb-2 block font-semibold">
              Description
            </label>

            <textarea
              rows={5}
              placeholder="Write product description..."
              className="w-full rounded-xl border border-slate-200 px-5 py-3 outline-none focus:border-orange-500"
            />

          </div>

          {/* Two Columns */}

          <div className="grid gap-6 md:grid-cols-2">

            {/* Price */}

            <div>

              <label className="mb-2 block font-semibold">
                Price (Rs.)
              </label>

              <input
                type="number"
                placeholder="899"
                className="w-full rounded-xl border border-slate-200 px-5 py-3 outline-none focus:border-orange-500"
              />

            </div>

            {/* Rating */}

            <div>

              <label className="mb-2 block font-semibold">
                Rating
              </label>

              <input
                type="number"
                step="0.1"
                placeholder="4.8"
                className="w-full rounded-xl border border-slate-200 px-5 py-3 outline-none focus:border-orange-500"
              />

            </div>

          </div>

          {/* Category & Restaurant */}

          <div className="grid gap-6 md:grid-cols-2">

            <div>

              <label className="mb-2 block font-semibold">
                Category
              </label>

              <select className="w-full rounded-xl border border-slate-200 px-5 py-3">

                <option>Burgers</option>
                <option>Pizza</option>
                <option>Pakistani</option>
                <option>Chinese</option>
                <option>Italian</option>
                <option>BBQ</option>
                <option>Desserts</option>
                <option>Drinks</option>

              </select>

            </div>

            <div>

              <label className="mb-2 block font-semibold">
                Restaurant
              </label>

              <select className="w-full rounded-xl border border-slate-200 px-5 py-3">

                <option>Burger Hub</option>
                <option>Pizza Palace</option>
                <option>Chinese Wok</option>
                <option>Desi Kitchen</option>

              </select>

            </div>

          </div>

          {/* Image Upload */}

          <div>

            <label className="mb-3 block font-semibold">
              Product Image
            </label>

            <label
              className="
                flex
                cursor-pointer
                flex-col
                items-center
                justify-center
                rounded-2xl
                border-2
                border-dashed
                border-orange-300
                bg-orange-50
                py-16
                transition
                hover:bg-orange-100
              "
            >

              <Upload
                size={45}
                className="text-orange-500"
              />

              <span className="mt-5 text-lg font-semibold">
                Click to Upload Image
              </span>

              <span className="mt-2 text-sm text-slate-500">
                JPG, PNG or WEBP
              </span>

              <input
                type="file"
                className="hidden"
              />

            </label>

          </div>

          {/* Submit */}

          <button
            className="
              w-full
              rounded-xl
              bg-orange-500
              py-4
              text-lg
              font-bold
              text-white
              transition
              hover:bg-orange-600
            "
          >
            Save Product
          </button>

        </form>

      </div>

    </div>
  );
}