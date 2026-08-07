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
  const grandTotal = subtotal + deliveryFee + tax;

  // ==========================
  // EMPTY CART
  // ==========================

  if (cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FAFAF7]">
        <div className="mx-auto flex min-h-screen max-w-6.5xl items-center justify-center px-6 py-20">
          <div className="w-full max-w-2xl rounded-[32px] bg-white p-12 text-center shadow-[0_25px_60px_rgba(15,23,42,0.08)]">

            <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-orange-100">
              <ShoppingBag size={56} className="text-orange-500" />
            </div>

            <h1 className="mt-8 text-5xl font-extrabold text-slate-900">
              Your Cart is Empty
            </h1>

            <p className="mx-auto mt-5 max-w-xl text-lg leading-8 text-slate-500">
              It looks like you haven&apos;t added any delicious meals yet.
              Explore our restaurants and discover your next favorite dish.
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
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-8 py-4 text-lg font-semibold text-white transition hover:-translate-y-1 hover:bg-orange-600 hover:shadow-xl"
              >
                Back to Home
              </Link>

            </div>

          </div>
        </div>
      </main>
    );
  }

  // ==========================
  // CART
  // ==========================

  return (
    <main className="min-h-screen bg-[#FAFAF7] py-14">
      <div className="mx-auto max-w-7xl px-6">

        {/* Top */}

        <div className="mb-10 flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          <div>

            <Link
              href="/restaurants"
              className="mb-6 inline-flex items-center gap-2 text-orange-500 transition hover:gap-3"
            >
              <ArrowLeft size={18} />
              Continue Shopping
            </Link>

            <h1 className="text-5xl font-extrabold text-slate-900">
              Shopping Cart
            </h1>

            <p className="mt-3 text-lg text-slate-500">
              You have{" "}
              <span className="font-semibold text-orange-500">
                {totalItems}
              </span>{" "}
              item{totalItems > 1 ? "s" : ""} in your cart.
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

        <div className="grid gap-10 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-6 lg:col-span-2">

            {cart.map((item) => (

              <div
                key={item.id}
                className="group rounded-3xl bg-white p-6 shadow-md transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex flex-col gap-6 md:flex-row">

                  {/* Image */}

                  <div className="relative h-32 w-full overflow-hidden rounded-2xl md:h-32 md:w-32 md:min-w-[128px]">

                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover transition duration-500 group-hover:scale-110"
                    />

                  </div>

                  {/* Content */}

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

                      <span className="text-2xl font-bold text-orange-500">
                        Rs. {item.price}
                      </span>

                      <div className="flex flex-wrap items-center gap-4">

                        {/* Qty */}

                        <div className="flex items-center rounded-2xl border border-slate-200 bg-slate-50">

                          <button
                            onClick={() => decreaseQuantity(Number(item.id))}
                            className="rounded-l-2xl p-3 transition hover:bg-orange-100"
                          >
                            <Minus size={18} />
                          </button>

                          <span className="w-12 text-center text-lg font-bold">
                            {item.quantity}
                          </span>

                          <button
                            onClick={() => increaseQuantity(Number(item.id))}
                            className="rounded-r-2xl p-3 transition hover:bg-orange-100"
                          >
                            <Plus size={18} />
                          </button>

                        </div>

                        {/* Remove */}

                        <button
                          onClick={() => removeFromCart(Number(item.id))}
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

          {/* RIGHT */}

          <div>

            <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-xl">

              <h2 className="text-3xl font-bold text-slate-900">
                Order Summary
              </h2>

              <div className="mt-8 space-y-5">

                <div className="flex justify-between text-slate-600">
                  <span>Subtotal</span>
                  <span className="font-semibold text-slate-900">
                    Rs. {subtotal}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Delivery Fee</span>
                  <span className="font-semibold text-slate-900">
                    Rs. {deliveryFee}
                  </span>
                </div>

                <div className="flex justify-between text-slate-600">
                  <span>Tax (5%)</span>
                  <span className="font-semibold text-slate-900">
                    Rs. {tax}
                  </span>
                </div>

                <hr />

                <div className="flex justify-between text-3xl font-bold">
                  <span>Total</span>

                  <span className="text-orange-500">
                    Rs. {grandTotal}
                  </span>
                </div>

              </div>

              <Link
                href="/checkout"
                className="mt-8 flex items-center justify-center gap-2 rounded-2xl bg-gradient-to-r from-orange-500 to-orange-600 py-4 text-lg font-bold text-white transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                Proceed to Checkout
                <ArrowRight size={20} />
              </Link>

              {/* Features */}

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