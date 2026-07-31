"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  MapPinned,
  Clock3,
  ShoppingBag,
} from "lucide-react";

export default function OrderSuccessPage() {
  const [orderId, setOrderId] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);

    const savedOrder = localStorage.getItem("orderId");

    if (savedOrder) {
      setOrderId(savedOrder);
    } else {
      const id = Math.floor(
        100000 + Math.random() * 900000
      ).toString();

      localStorage.setItem("orderId", id);
      setOrderId(id);
    }
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-100 flex items-center justify-center px-6 py-16">
      <div className="w-full max-w-3xl overflow-hidden rounded-3xl bg-white shadow-2xl">

        {/* Header */}

        <div className="bg-gradient-to-r from-orange-500 to-orange-600 px-10 py-12 text-center text-white">

          <div className="mx-auto flex h-24 w-24 items-center justify-center rounded-full bg-white/20 backdrop-blur">

            <CheckCircle2 size={70} />

          </div>

          <h1 className="mt-8 text-5xl font-extrabold">
            Order Confirmed!
          </h1>

          <p className="mt-4 text-lg text-orange-100">
            Your delicious meal is being prepared by the
            restaurant.
          </p>

        </div>

        {/* Body */}

        <div className="p-10">

          {/* Order Number */}

          <div className="rounded-2xl bg-orange-50 p-8 text-center">

            <p className="text-lg text-slate-500">
              Order Number
            </p>

            <h2 className="mt-2 text-5xl font-extrabold text-orange-500">
              #{orderId}
            </h2>

          </div>

          {/* Info Cards */}

          <div className="mt-8 grid gap-5 md:grid-cols-2">

            <div className="rounded-2xl border border-slate-200 p-6">

              <div className="flex items-center gap-3">

                <Clock3
                  className="text-orange-500"
                  size={28}
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Estimated Delivery
                  </p>

                  <h3 className="text-xl font-bold text-slate-900">
                    25 - 35 Minutes
                  </h3>

                </div>

              </div>

            </div>

            <div className="rounded-2xl border border-slate-200 p-6">

              <div className="flex items-center gap-3">

                <MapPinned
                  className="text-orange-500"
                  size={28}
                />

                <div>

                  <p className="text-sm text-slate-500">
                    Delivery Status
                  </p>

                  <h3 className="text-xl font-bold text-green-600">
                    Preparing Your Order
                  </h3>

                </div>

              </div>

            </div>

          </div>

          {/* Timeline */}

          <div className="mt-10 rounded-2xl border border-slate-200 p-8">

            <h3 className="mb-6 text-2xl font-bold text-slate-900">
              Order Progress
            </h3>

            <div className="space-y-6">

              <div className="flex items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-green-500" />
                <p className="font-semibold text-slate-900">
                  Order Confirmed
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-orange-500 animate-pulse" />
                <p className="font-semibold text-slate-900">
                  Restaurant is Preparing Your Meal
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-slate-300" />
                <p className="text-slate-500">
                  Rider Assigned
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="h-4 w-4 rounded-full bg-slate-300" />
                <p className="text-slate-500">
                  Out For Delivery
                </p>
              </div>

            </div>

          </div>

          {/* Buttons */}

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">

            <Link
              href="/track-order"
              className="flex flex-1 items-center justify-center gap-3 rounded-xl bg-orange-500 py-4 text-lg font-bold text-white transition hover:bg-orange-600"
            >
              <ShoppingBag size={22} />
              Track Order
            </Link>

            <Link
              href="/restaurants"
              className="flex flex-1 items-center justify-center gap-3 rounded-xl border border-slate-300 py-4 text-lg font-bold text-slate-700 transition hover:bg-slate-100"
            >
              Continue Shopping
              <ArrowRight size={22} />
            </Link>

          </div>

        </div>

      </div>
    </main>
  );
}