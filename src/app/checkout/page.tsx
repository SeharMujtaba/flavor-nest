"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Phone,
  CreditCard,
  Truck,
  ArrowLeft,
} from "lucide-react";

import { useCart } from "@/context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();

  const {
    cart,
    totalPrice,
    clearCart,
  } = useCart();

  const deliveryFee = 250;
  const total = totalPrice + deliveryFee;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    city: "",
    address: "",
    payment: "Cash on Delivery",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement
    >
  ) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = () => {
    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.city ||
      !form.address
    ) {
      alert("Please fill all required fields.");
      return;
    }

    clearCart();

    router.push("/order-success");
  };

  if (cart.length === 0) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7] px-6">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900">
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
    <main className="min-h-screen bg-[#FAFAF7] py-16">
      <div className="mx-auto max-w-7xl px-6">

        {/* Back */}

        <Link
          href="/cart"
          className="mb-8 inline-flex items-center gap-2 text-orange-500 hover:underline"
        >
          <ArrowLeft size={18} />
          Back to Cart
        </Link>

        {/* Heading */}

        <h1 className="text-5xl font-extrabold text-slate-900">
          Checkout
        </h1>

        <p className="mt-3 text-slate-500">
          Complete your order by filling in your delivery information.
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-3">

          {/* LEFT */}

          <div className="space-y-8 lg:col-span-2">

            {/* Customer Details */}

            <div className="rounded-3xl bg-white p-8 shadow-md">

              <h2 className="mb-8 text-3xl font-bold">
                Customer Details
              </h2>

              <div className="grid gap-6 md:grid-cols-2">

                <div>
                  <label className="mb-2 block font-semibold">
                    Full Name
                  </label>

                  <input
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Enter your name"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
                  />
                </div>

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
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    Phone
                  </label>

                  <input
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="+92 300 1234567"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
                  />
                </div>

                <div>
                  <label className="mb-2 block font-semibold">
                    City
                  </label>

                  <input
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="Lahore"
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
                  />
                </div>

              </div>

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
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none transition focus:border-orange-500"
                />

              </div>

            </div>

            {/* Payment */}

            <div className="rounded-3xl bg-white p-8 shadow-md">

              <h2 className="mb-6 text-3xl font-bold">
                Payment Method
              </h2>

              <div className="mt-6 space-y-5">

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
                      className="
                      flex
                      cursor-pointer
                      items-center
                      gap-4
                      rounded-xl
                      border
                      border-slate-200
                      p-5
                      transition
                      hover:border-orange-500
                      hover:bg-orange-50"
>
                      <input
                      type="radio"
                      name="payment"
                      className="mr-2 h-4 w-4 accent-orange-500"
                      defaultChecked
                      />

                      <Icon
                        size={22}
                        className="text-orange-500"
                      />

                      <span className="text-lg font-semibold">
                        {method.label}
                      </span>

                    </label>
                  );
                })}

              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div className="h-fit rounded-3xl bg-white p-8 shadow-md">

            <h2 className="text-3xl font-bold">
              Order Summary
            </h2>

            <div className="mt-8 space-y-5">

              {cart.map((item) => (
                <div
                  key={item.id}
                  className="flex justify-between"
                >
                  <div>
                    <p className="font-semibold">
                      {item.name}
                    </p>

                    <p className="text-sm text-slate-500">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <span className="font-bold">
                    Rs. {item.price * item.quantity}
                  </span>
                </div>
              ))}

              <hr />

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>Rs. {totalPrice}</span>
              </div>

              <div className="flex justify-between">
                <span>Delivery Fee</span>
                <span>Rs. {deliveryFee}</span>
              </div>

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-orange-500">
                  Rs. {total}
                </span>

              </div>

            </div>

            <button
              onClick={placeOrder}
              className="mt-10 w-full rounded-xl bg-orange-500 py-4 text-lg font-bold text-white transition hover:bg-orange-600"
            >
              Place Order
            </button>

          </div>

        </div>

      </div>
    </main>
  );
}