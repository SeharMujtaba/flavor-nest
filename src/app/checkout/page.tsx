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

type StoredUser = {
  _id?: string;
  id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    totalPrice,
    clearCart,
  } = useCart();

  const deliveryFee = 250;
  const total = totalPrice + deliveryFee;

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
    if (
      !form.name.trim() ||
      !form.email.trim() ||
      !form.phone.trim() ||
      !form.city.trim() ||
      !form.address.trim()
    ) {
      toast.error("Please fill all required fields.");
      return;
    }

    if (cart.length === 0) {
      toast.error("Your cart is empty.");
      return;
    }

    try {
      setLoading(true);

      /*
       * Try to get the logged-in customer from localStorage.
       *
       * This supports common formats such as:
       * {
       *   "_id": "...",
       *   "name": "...",
       *   "email": "..."
       * }
       */
      let storedUser: StoredUser | null = null;

      const possibleUserKeys = [
        "user",
        "currentUser",
        "flavornestUser",
      ];

      for (const key of possibleUserKeys) {
        const savedUser = localStorage.getItem(key);

        if (savedUser) {
          try {
            const parsed = JSON.parse(savedUser);

            if (parsed) {
              storedUser = parsed;
              break;
            }
          } catch {
            console.warn(`Could not parse ${key} from localStorage.`);
          }
        }
      }

      const customerId =
        storedUser?._id || storedUser?.id || "";

      /*
       * Your current Order schema requires customer.
       */
      if (!customerId) {
        toast.error(
          "Please login before placing an order."
        );

        setLoading(false);
        return;
      }

      /*
       * Convert cart items into the structure expected
       * by backend/models/Order.js
       */
      const orderItems = cart.map((item) => ({
        product: String(item.id),
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || "",
      }));

      const orderPayload = {
        customer: customerId,

        customerName: form.name.trim(),

        customerEmail: form.email.trim(),

        customerPhone: form.phone.trim(),

        restaurant: "FlavorNest",

        items: orderItems,

        totalAmount: total,

        deliveryAddress:
          `${form.city.trim()}, ${form.address.trim()}`,

        status: "Pending",
      };

      console.log("Creating order:", orderPayload);

      const response = await fetch(
        "http://localhost:5000/api/orders",
        {
          method: "POST",

          headers: {
            "Content-Type": "application/json",
          },

          body: JSON.stringify(orderPayload),
        }
      );

      const data = await response.json();

      console.log("Order API response:", data);

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to place order."
        );
      }

      /*
       * Save the newly created order ID so the
       * success page can use it later.
       */
      if (data.order?._id) {
        sessionStorage.setItem(
          "lastOrderId",
          data.order._id
        );
      }

      clearCart();

      toast.success(
        "Order placed successfully!"
      );

      router.push("/order-success");
    } catch (error) {
      console.error("PLACE ORDER ERROR:", error);

      toast.error(
        error instanceof Error
          ? error.message
          : "Failed to place order."
      );
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
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

        {/* Back */}

        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-orange-500 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        {/* Heading */}

        <h1 className="text-4xl font-extrabold text-slate-900 sm:text-5xl">
          Checkout
        </h1>

        <p className="mt-3 text-slate-500">
          Complete your order by filling in your delivery information.
        </p>

        <div className="mt-10 grid gap-8 lg:grid-cols-3 lg:gap-10">

          {/* LEFT */}

          <div className="space-y-8 lg:col-span-2">

            {/* Customer Details */}

            <div className="rounded-3xl bg-white p-5 shadow-md sm:p-8">

              <h2 className="mb-8 text-2xl font-bold text-slate-900 sm:text-3xl">
                Customer Details
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                {/* Name */}

                <div>
                  <label className="mb-2 block font-semibold">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* Email */}

                <div>
                  <label className="mb-2 block font-semibold">
                    Email
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* Phone */}

                <div>
                  <label className="mb-2 block font-semibold">
                    Phone
                  </label>

                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

                {/* City */}

                <div>
                  <label className="mb-2 block font-semibold">
                    City
                  </label>

                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Lahore"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                  />
                </div>

              </div>

              {/* Address */}

              <div className="mt-6">

                <label className="mb-2 block font-semibold">
                  Delivery Address
                </label>

                <textarea
                  rows={4}
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                  placeholder="House No, Street, Area..."
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-2 focus:ring-orange-100"
                />

              </div>

            </div>

            {/* Payment */}

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
                Payment integration can be connected later.
                Currently the order is stored with the selected
                payment method handled on the frontend.
              </p>

            </div>

          </div>

          {/* RIGHT */}

          <div className="h-fit rounded-3xl bg-white p-5 shadow-md sm:p-8 lg:sticky lg:top-24">

            <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
              Order Summary
            </h2>

            {/* Items */}

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
                    {item.price * item.quantity}
                  </span>
                </div>
              ))}

              <div className="flex justify-between text-slate-600">
                <span>Subtotal</span>

                <span>
                  Rs. {totalPrice}
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

            {/* Place Order */}

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

          </div>

        </div>

      </div>
    </main>
  );
}