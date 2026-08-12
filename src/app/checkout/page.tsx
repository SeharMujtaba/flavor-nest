"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

import {
  Phone,
  CreditCard,
  Truck,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { toast } from "react-hot-toast";
import { useCart } from "@/context/CartContext";

type FormState = {
  name: string;
  email: string;
  phone: string;
  city: string;
  address: string;
  payment: string;
};

type OrderResponse = {
  success?: boolean;
  message?: string;
  order?: {
    _id?: string;
  };
  error?: string;
};

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export default function CheckoutPage() {
  const router = useRouter();

  const { cart, totalPrice, clearCart } = useCart();

  const deliveryFee = 250;
  const subtotal = Number(totalPrice) || 0;
  const total = subtotal + deliveryFee;

  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    setForm((previous) => ({
      ...previous,
      [name]: value,
    }));
  };

  const handlePaymentChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setForm((previous) => ({
      ...previous,
      payment: e.target.value,
    }));
  };

  const placeOrder = async () => {
    if (loading) return;

    if (!form.name.trim()) {
      toast.error("Please enter your full name.");
      return;
    }

    if (!form.email.trim()) {
      toast.error("Please enter your email.");
      return;
    }

    if (!form.phone.trim()) {
      toast.error("Please enter your phone number.");
      return;
    }

    if (!form.city.trim()) {
      toast.error("Please enter your city.");
      return;
    }

    if (!form.address.trim()) {
      toast.error("Please enter your delivery address.");
      return;
    }

    if (!cart || cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      const orderItems = cart.map((item) => {
        const itemId = String(item.id);

        const isMongoObjectId =
          /^[0-9a-fA-F]{24}$/.test(itemId);

        return {
          product: isMongoObjectId ? itemId : null,
          name: String(item.name).trim(),
          quantity: Number(item.quantity),
          price: Number(item.price),
          image: item.image ? String(item.image) : "",
        };
      });

      const orderPayload = {
        customer: null,

        customerName: form.name.trim(),

        customerEmail: form.email.trim(),

        customerPhone: form.phone.trim(),

        restaurant: "FlavorNest",

        items: orderItems,

        totalAmount: total,

        deliveryAddress: `${form.city.trim()}, ${form.address.trim()}`,

        paymentMethod: form.payment,

        status: "Pending",
      };

      console.log("=================================");
      console.log("ORDER API URL:", `${API_BASE_URL}/api/orders`);
      console.log("ORDER PAYLOAD:", orderPayload);
      console.log("=================================");

      const response = await fetch(
        `${API_BASE_URL}/api/orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(orderPayload),
        }
      );

      const responseText = await response.text();

      console.log("ORDER HTTP STATUS:", response.status);
      console.log("ORDER RAW RESPONSE:", responseText);

      let data: OrderResponse = {};

      try {
        data = responseText
          ? JSON.parse(responseText)
          : {};
      } catch {
        data = {};
      }

      console.log("ORDER PARSED RESPONSE:", data);

      if (!response.ok) {
        throw new Error(
          data.message ||
            data.error ||
            `Failed to create order. Server returned ${response.status}.`
        );
      }

      if (!data.success) {
        throw new Error(
          data.message || "Backend did not confirm order creation."
        );
      }

      if (!data.order?._id) {
        throw new Error(
          "Order was created but the server did not return an order ID."
        );
      }

      sessionStorage.setItem(
        "lastOrderId",
        data.order._id
      );

      clearCart();

      toast.success("Order placed successfully!");

      router.push("/order-success");
    } catch (error) {
      console.error("=================================");
      console.error("PLACE ORDER ERROR:", error);
      console.error("=================================");

      const message =
        error instanceof Error
          ? error.message
          : "Failed to place order.";

      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  if (!cart || cart.length === 0) {
    return (
      <main className="min-h-screen bg-[#FFF8F3] px-6 py-20">
        <div className="mx-auto max-w-3xl rounded-3xl bg-white p-12 text-center shadow-md">
          <h1 className="text-4xl font-extrabold text-slate-900">
            Your Cart is Empty
          </h1>

          <p className="mt-4 text-slate-500">
            Please add some products before checkout.
          </p>

          <Link
            href="/restaurants"
            className="mt-8 inline-flex rounded-xl bg-orange-500 px-8 py-4 font-semibold text-white transition hover:bg-orange-600"
          >
            Browse Restaurants
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[#FFF8F3] px-4 py-10 sm:px-6 lg:py-16">
      <div className="mx-auto max-w-7xl">

        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-orange-500 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Checkout
        </h1>

        <p className="mt-3 text-slate-500">
          Complete your order by filling in your delivery information.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-10">

          <div className="space-y-8 lg:col-span-2">

            <div className="rounded-3xl bg-white p-5 shadow-md sm:p-8">

              <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
                Customer Details
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label
                    htmlFor="name"
                    className="mb-2 block font-semibold"
                  >
                    Full Name
                  </label>

                  <input
                    id="name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    autoComplete="name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block font-semibold"
                  >
                    Email
                  </label>

                  <input
                    id="email"
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    autoComplete="email"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="mb-2 block font-semibold"
                  >
                    Phone
                  </label>

                  <input
                    id="phone"
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    autoComplete="tel"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                <div>
                  <label
                    htmlFor="city"
                    className="mb-2 block font-semibold"
                  >
                    City
                  </label>

                  <input
                    id="city"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Lahore"
                    autoComplete="address-level2"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

              </div>

              <div className="mt-6">
                <label
                  htmlFor="address"
                  className="mb-2 block font-semibold"
                >
                  Delivery Address
                </label>

                <textarea
                  id="address"
                  rows={4}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House No, Street, Area..."
                  autoComplete="street-address"
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />
              </div>

            </div>

            <div className="rounded-3xl bg-white p-5 shadow-md sm:p-8">

              <h2 className="mb-6 text-2xl font-bold text-slate-900 sm:text-3xl">
                Payment Method
              </h2>

              <div className="space-y-4">

                {[
                  {
                    label: "Cash on Delivery",
                    icon: Truck,
                  },
                  {
                    label: "Credit / Debit Card",
                    icon: CreditCard,
                  },
                  {
                    label: "JazzCash / EasyPaisa",
                    icon: Phone,
                  },
                ].map((method) => {
                  const Icon = method.icon;

                  return (
                    <label
                      key={method.label}
                      className={`flex cursor-pointer items-center gap-4 rounded-xl border p-4 transition sm:p-5 ${
                        form.payment === method.label
                          ? "border-orange-500 bg-orange-50"
                          : "border-slate-200 hover:border-orange-400"
                      }`}
                    >
                      <input
                        type="radio"
                        name="payment"
                        value={method.label}
                        checked={
                          form.payment === method.label
                        }
                        onChange={handlePaymentChange}
                        className="h-4 w-4 accent-orange-500"
                      />

                      <Icon
                        size={22}
                        className="shrink-0 text-orange-500"
                      />

                      <span className="text-base font-semibold sm:text-lg">
                        {method.label}
                      </span>
                    </label>
                  );
                })}

              </div>

              <p className="mt-5 text-sm text-slate-400">
                Your selected payment method will be saved with the order.
              </p>

            </div>

          </div>

          <div className="h-fit rounded-3xl bg-white p-5 shadow-md sm:p-8 lg:sticky lg:top-24">

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Order Summary
            </h2>

            <div className="mt-8 space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 border-b border-slate-100 pb-5"
                >
                  <div className="min-w-0 flex-1">

                    <p className="font-semibold text-slate-900">
                      {item.name}
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>

                  </div>

                  <span className="shrink-0 font-bold text-slate-900">
                    Rs.{" "}
                    {Number(item.price) *
                      Number(item.quantity)}
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>

                <span>
                  Rs. {subtotal}
                </span>
              </div>

              <div className="flex justify-between text-slate-600">
                <span>Delivery Fee</span>

                <span>
                  Rs. {deliveryFee}
                </span>
              </div>

              <div className="flex justify-between border-t border-slate-200 pt-5 text-xl font-bold sm:text-2xl">
                <span>Total</span>

                <span className="text-orange-500">
                  Rs. {total}
                </span>
              </div>

            </div>

            <button
              type="button"
              onClick={placeOrder}
              disabled={loading}
              className="mt-10 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-4 text-lg font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? (
                <>
                  <Loader2
                    size={21}
                    className="animate-spin"
                  />
                  Placing Order...
                </>
              ) : (
                "Place Order"
              )}
            </button>

            <p className="mt-4 text-center text-xs text-slate-400">
              No account or login is required to place your order.
            </p>

          </div>

        </div>
      </div>
    </main>
  );
}