"use client";

import Image from "next/image";
import Link from "next/link";

import {
  Minus,
  Plus,
  Trash2,
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Truck,
  BadgePercent,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CartPage() {
  const {
    cart,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    subtotal,
    totalItems,
  } = useCart();

  const deliveryFee = 250;

  const tax = Math.round(subtotal * 0.05);

  const grandTotal =
    subtotal + deliveryFee + tax;

  // ==========================================
  // EMPTY CART
  // ==========================================

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAF7]">
        <div className="mx-auto flex min-h-screen max-w-7xl items-center justify-center px-6 py-20">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-8 text-center shadow-[0_25px_60px_rgba(15,23,42,0.08)] sm:p-12">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
              <ShoppingBag
                size={56}
                className="text-orange-500"
              />
            </div>

            <h1 className="mt-8 text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500">
              It looks like you haven&apos;t added
              any delicious meals yet. Explore our
              restaurants and discover your next
              favourite dish.
            </p>

            <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">

              <Link
                href="/restaurants"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Browse Restaurants

                <ArrowRight size={20} />
              </Link>

              <Link
                href="/"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-orange-500 px-8 py-4 text-lg font-semibold text-orange-500 transition hover:bg-orange-50"
              >
                Back to Home
              </Link>

            </div>
          </div>
        </div>
      </main>
    );
  }

  // ==========================================
  // CART PAGE
  // ==========================================

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-14">

      <div className="mx-auto max-w-7xl px-6">

        {/* HEADER */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <Link
              href="/restaurants"
              className="mb-6 inline-flex items-center gap-2 text-orange-500 transition hover:gap-3"
            >
              <ArrowLeft size={18} />

              Continue Shopping
            </Link>

            <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
              Shopping Cart
            </h1>

            <p className="mt-3 text-lg text-slate-500">

              You have{" "}

              <span className="font-semibold text-orange-500">
                {totalItems}
              </span>{" "}

              item{totalItems !== 1 ? "s" : ""} in
              your cart.

            </p>

          </div>

          <div className="flex flex-wrap gap-3">

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">

              <p className="text-sm text-slate-500">
                Cart Items
              </p>

              <h3 className="text-2xl font-bold text-slate-900">
                {totalItems}
              </h3>

            </div>

            <div className="rounded-2xl bg-white px-5 py-4 shadow-sm">

              <p className="text-sm text-slate-500">
                Cart Total
              </p>

              <h3 className="text-2xl font-bold text-orange-500">
                Rs. {subtotal}
              </h3>

            </div>

          </div>
        </div>

        {/* MAIN GRID */}

        <div className="grid gap-10 lg:grid-cols-3">

          {/* ====================================
              CART ITEMS
          ==================================== */}

          <div className="space-y-6 lg:col-span-2">

            {cart.map((item) => (

              <div
                key={String(item.id)}
                className="group rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >

                <div className="flex flex-col gap-6 md:flex-row">

                  {/* IMAGE */}

                  <div className="relative h-32 w-full overflow-hidden rounded-2xl bg-slate-100 md:h-32 md:w-32 md:min-w-[128px]">

                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="128px"
                        className="object-cover transition duration-500 group-hover:scale-110"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center">
                        <ShoppingBag
                          size={40}
                          className="text-slate-300"
                        />
                      </div>
                    )}

                  </div>

                  {/* CONTENT */}

                  <div className="flex flex-1 flex-col justify-between">

                    <div>

                      <h2 className="text-2xl font-bold text-slate-900">
                        {item.name}
                      </h2>

                      <p className="mt-3 line-clamp-2 leading-7 text-slate-500">
                        {item.description}
                      </p>

                    </div>

                    <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                      {/* PRICE */}

                      <div>

                        <span className="text-2xl font-bold text-orange-500">
                          Rs. {item.price}
                        </span>

                        <p className="mt-1 text-sm text-slate-400">
                          Rs. {item.price} × {item.quantity}
                        </p>

                      </div>

                      {/* CONTROLS */}

                      <div className="flex flex-wrap items-center gap-4">

                        {/* QUANTITY */}

                        <div className="flex items-center overflow-hidden rounded-2xl border border-slate-200 bg-slate-50">

                          <button
                            type="button"
                            aria-label={`Decrease quantity of ${item.name}`}
                            onClick={() =>
                              decreaseQuantity(item.id)
                            }
                            className="flex h-12 w-12 items-center justify-center transition hover:bg-orange-100 active:bg-orange-200"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="flex h-12 min-w-12 items-center justify-center border-x border-slate-200 px-3 text-lg font-bold">
                            {item.quantity}
                          </span>

                          <button
                            type="button"
                            aria-label={`Increase quantity of ${item.name}`}
                            onClick={() =>
                              increaseQuantity(item.id)
                            }
                            className="flex h-12 w-12 items-center justify-center transition hover:bg-orange-100 active:bg-orange-200"
                          >
                            <Plus size={18} />
                          </button>

                        </div>

                        {/* REMOVE */}

                        <button
                          type="button"
                          onClick={() =>
                            removeFromCart(item.id)
                          }
                          className="inline-flex items-center gap-2 rounded-xl bg-red-50 px-4 py-3 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
                        >
                          <Trash2 size={18} />

                          Remove
                        </button>

                      </div>

                    </div>

                  </div>

                </div>

              </div>

            ))}

          </div>

          {/* ====================================
              ORDER SUMMARY
          ==================================== */}

          <div>

            <div className="sticky top-24 rounded-3xl bg-white p-6 shadow-xl sm:p-8">

              <h2 className="text-3xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">

                {/* SUBTOTAL */}

                <div className="flex justify-between text-slate-600">

                  <span>
                    Subtotal
                  </span>

                  <span className="font-semibold text-slate-900">
                    Rs. {subtotal}
                  </span>

                </div>

                {/* DELIVERY */}

                <div className="flex justify-between text-slate-600">

                  <span>
                    Delivery Fee
                  </span>

                  <span className="font-semibold text-slate-900">
                    Rs. {deliveryFee}
                  </span>

                </div>

                {/* TAX */}

                <div className="flex justify-between text-slate-600">

                  <span>
                    Tax (5%)
                  </span>

                  <span className="font-semibold text-slate-900">
                    Rs. {tax}
                  </span>

                </div>

                <hr />

                {/* GRAND TOTAL */}

                <div className="flex justify-between gap-4 text-2xl font-bold sm:text-3xl">

                  <span>
                    Total
                  </span>

                  <span className="text-orange-500">
                    Rs. {grandTotal}
                  </span>

                </div>

              </div>

              {/* CHECKOUT */}

              <Link
                href="/checkout"
                className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Proceed to Checkout

                <ArrowRight size={20} />
              </Link>

              {/* FEATURES */}

              <div className="mt-8 space-y-4 border-t pt-6">

                <div className="flex items-center gap-3 text-slate-600">

                  <ShieldCheck
                    size={18}
                    className="text-green-500"
                  />

                  Secure Checkout

                </div>

                <div className="flex items-center gap-3 text-slate-600">

                  <Truck
                    size={18}
                    className="text-orange-500"
                  />

                  Fast Delivery

                </div>

                <div className="flex items-center gap-3 text-slate-600">

                  <BadgePercent
                    size={18}
                    className="text-blue-500"
                  />

                  Best Price Guarantee

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}