"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  MapPin,
  Package,
  ShoppingBag,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flavor-nest-403w.onrender.com";

type Order = {
  _id: string;
  customerName?: string;
  restaurant?: string;
  items?: {
    name: string;
    quantity: number;
    price: number;
  }[];
  totalAmount?: number;
  deliveryAddress?: string;
  status?: string;
  createdAt?: string;
};

type OrderResponse = {
  success?: boolean;
  order?: Order;
  message?: string;
};

function formatMoney(value?: number) {
  return `Rs. ${(Number(value) || 0).toLocaleString("en-PK")}`;
}

function getDisplayOrderNumber(id: string) {
  if (!id) return "—";
  return id.slice(-6).toUpperCase();
}

export default function OrderSuccessPage() {
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadOrder = async () => {
      try {
        const savedOrderId =
          sessionStorage.getItem("lastOrderId") ||
          localStorage.getItem("lastOrderId") ||
          "";

        if (!savedOrderId) {
          setError(
            "We could not find your recent order. Please place an order again."
          );
          setLoading(false);
          return;
        }

        const response = await fetch(
          `${API_URL}/api/orders/${encodeURIComponent(savedOrderId)}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data: OrderResponse = await response
          .json()
          .catch(() => ({}));

        if (!response.ok || !data.order) {
          throw new Error(
            data.message || "Unable to load your order."
          );
        }

        setOrder(data.order);
      } catch (err) {
        console.error("ORDER SUCCESS ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to load your order."
        );
      } finally {
        setLoading(false);
      }
    };

    void loadOrder();
  }, []);

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4">
        <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-10 text-center shadow-xl">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-50">
            <Package
              size={30}
              className="animate-pulse text-orange-500"
            />
          </div>

          <h1 className="mt-5 text-xl font-extrabold text-slate-900">
            Confirming your order
          </h1>

          <p className="mt-2 text-sm text-slate-500">
            Please wait while we retrieve your order details.
          </p>
        </div>
      </main>
    );
  }

  if (error || !order) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FFF9F4] px-4 py-10">
        <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-xl sm:p-10">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-red-50 text-red-500">
            <Package size={30} />
          </div>

          <h1 className="mt-5 text-2xl font-extrabold text-slate-900">
            Order Details Unavailable
          </h1>

          <p className="mt-3 text-sm leading-6 text-slate-500">
            {error ||
              "We could not retrieve your order details."}
          </p>

          <Link
            href="/restaurants"
            className="mt-7 inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-white transition hover:bg-orange-600"
          >
            <ShoppingBag size={18} />
            Browse Restaurants
          </Link>
        </div>
      </main>
    );
  }

  const displayOrderNumber = getDisplayOrderNumber(order._id);

  const itemCount =
    order.items?.reduce(
      (total, item) => total + Number(item.quantity || 0),
      0
    ) || 0;

  const normalizedStatus =
    order.status?.toLowerCase() || "pending";

  const statusLabel =
    normalizedStatus === "preparing"
      ? "Preparing Your Order"
      : normalizedStatus === "out for delivery"
        ? "Out for Delivery"
        : normalizedStatus === "delivered"
          ? "Delivered"
          : normalizedStatus === "cancelled"
            ? "Order Cancelled"
            : "Order Confirmed";

  return (
    <main className="min-h-screen bg-[#FFF9F4] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="mx-auto w-full max-w-4xl">

        {/* Main Card */}
        <section className="overflow-hidden rounded-[28px] border border-slate-200 bg-white shadow-[0_20px_70px_rgba(15,23,42,0.08)]">

          {/* Success Header */}
          <div className="bg-gradient-to-br from-orange-500 to-orange-600 px-6 py-10 text-center text-white sm:px-10 sm:py-12">

            <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-white/15 ring-4 ring-white/20">
              <CheckCircle2
                size={44}
                strokeWidth={2.5}
              />
            </div>

            <p className="mt-6 text-xs font-bold uppercase tracking-[0.22em] text-orange-100">
              Order Successfully Placed
            </p>

            <h1 className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
              Thank You for Your Order!
            </h1>

            <p className="mx-auto mt-3 max-w-xl text-sm leading-6 text-orange-50 sm:text-base">
              Your order has been received and the restaurant
              will start preparing your meal shortly.
            </p>
          </div>

          {/* Content */}
          <div className="p-6 sm:p-10">

            {/* Order Number */}
            <div className="rounded-2xl border border-orange-100 bg-orange-50 px-5 py-6 text-center">
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                Order Number
              </p>

              <p className="mt-2 text-3xl font-extrabold tracking-wide text-orange-500 sm:text-4xl">
                #{displayOrderNumber}
              </p>

              <p className="mt-2 text-xs text-slate-400">
                Keep this number for your order reference.
              </p>
            </div>

            {/* Quick Information */}
            <div className="mt-5 grid gap-4 sm:grid-cols-3">

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <Clock3 size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Estimated Delivery
                    </p>

                    <p className="mt-1 font-extrabold text-slate-900">
                      25–35 Minutes
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <CheckCircle2 size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Current Status
                    </p>

                    <p className="mt-1 font-extrabold text-slate-900">
                      {statusLabel}
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-white p-5">
                <div className="flex items-start gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-orange-50 text-orange-500">
                    <ShoppingBag size={20} />
                  </div>

                  <div>
                    <p className="text-xs font-semibold text-slate-400">
                      Items Ordered
                    </p>

                    <p className="mt-1 font-extrabold text-slate-900">
                      {itemCount}{" "}
                      {itemCount === 1 ? "Item" : "Items"}
                    </p>
                  </div>
                </div>
              </div>

            </div>

            {/* Progress */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

              <div className="flex items-center justify-between gap-4">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Order Progress
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Your order is now being processed.
                  </p>
                </div>

                <span className="hidden rounded-full bg-orange-50 px-3 py-1.5 text-xs font-bold text-orange-600 sm:block">
                  {statusLabel}
                </span>
              </div>

              <div className="mt-7 space-y-5">

                <div className="flex items-center gap-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-green-500 text-white">
                    <CheckCircle2 size={19} />
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      Order Confirmed
                    </p>
                    <p className="text-xs text-slate-400">
                      Your order has been received.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      normalizedStatus === "preparing" ||
                      normalizedStatus === "out for delivery" ||
                      normalizedStatus === "delivered"
                        ? "bg-green-500 text-white"
                        : "bg-orange-500 text-white"
                    }`}
                  >
                    {normalizedStatus === "preparing" ||
                    normalizedStatus === "out for delivery" ||
                    normalizedStatus === "delivered" ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <Clock3 size={19} />
                    )}
                  </div>

                  <div>
                    <p className="font-bold text-slate-900">
                      Restaurant is Preparing Your Meal
                    </p>

                    <p className="text-xs text-slate-400">
                      Your food is being freshly prepared.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      normalizedStatus === "out for delivery" ||
                      normalizedStatus === "delivered"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    {normalizedStatus === "out for delivery" ||
                    normalizedStatus === "delivered" ? (
                      <CheckCircle2 size={19} />
                    ) : (
                      <MapPin size={18} />
                    )}
                  </div>

                  <div>
                    <p
                      className={
                        normalizedStatus === "out for delivery" ||
                        normalizedStatus === "delivered"
                          ? "font-bold text-slate-900"
                          : "font-semibold text-slate-400"
                      }
                    >
                      Out for Delivery
                    </p>

                    <p className="text-xs text-slate-400">
                      Your order will be on its way soon.
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div
                    className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${
                      normalizedStatus === "delivered"
                        ? "bg-green-500 text-white"
                        : "bg-slate-200 text-slate-400"
                    }`}
                  >
                    <CheckCircle2 size={19} />
                  </div>

                  <div>
                    <p
                      className={
                        normalizedStatus === "delivered"
                          ? "font-bold text-slate-900"
                          : "font-semibold text-slate-400"
                      }
                    >
                      Delivered
                    </p>

                    <p className="text-xs text-slate-400">
                      Enjoy your FlavorNest meal!
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Order Summary */}
            <div className="mt-5 rounded-2xl border border-slate-200 bg-white p-6 sm:p-7">

              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-lg font-extrabold text-slate-900">
                    Order Summary
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {order.restaurant || "FlavorNest"}
                  </p>
                </div>

                <p className="text-lg font-extrabold text-orange-500">
                  {formatMoney(order.totalAmount)}
                </p>
              </div>

              <div className="mt-5 divide-y divide-slate-100 border-t border-slate-100">
                {(order.items || []).map((item, index) => (
                  <div
                    key={`${item.name}-${index}`}
                    className="flex items-center justify-between gap-4 py-4"
                  >
                    <div className="min-w-0">
                      <p className="font-bold text-slate-800">
                        {item.name}
                      </p>

                      <p className="mt-1 text-xs text-slate-400">
                        Quantity: {item.quantity}
                      </p>
                    </div>

                    <p className="shrink-0 font-bold text-slate-700">
                      {formatMoney(
                        Number(item.price) *
                          Number(item.quantity)
                      )}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="mt-7 grid gap-3 sm:grid-cols-2">

              <Link
                href="/track-order"
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-orange-500 px-6 py-3.5 text-sm font-extrabold text-white shadow-sm transition hover:bg-orange-600"
              >
                <MapPin size={18} />
                Track My Order
              </Link>

              <Link
                href="/restaurants"
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-6 py-3.5 text-sm font-extrabold text-slate-700 transition hover:border-orange-200 hover:bg-orange-50 hover:text-orange-600"
              >
                Continue Shopping
                <ArrowRight size={18} />
              </Link>

            </div>

          </div>
        </section>

        <p className="mt-5 text-center text-xs text-slate-400">
          FlavorNest • Fresh, fast & delicious
        </p>
      </div>
    </main>
  );
}