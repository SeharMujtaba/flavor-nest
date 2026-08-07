"use client";

import { useEffect, useMemo, useState } from "react";
import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
} from "lucide-react";

import {
  getCustomers,
  getOrders,
  getProducts,
  type AdminOrder,
} from "@/lib/admin-data";

const stats = [
  {
    title: "Total Revenue",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Total Orders",
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Products",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Customers",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

function getAmount(value: string) {
  return Number(value.replace(/[^0-9]/g, ""));
}

export default function AdminDashboard() {
  const [orders, setOrders] = useState<AdminOrder[]>([]);
  const [customerCount, setCustomerCount] = useState(0);
  const [productCount, setProductCount] = useState(0);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setOrders(getOrders());
    setCustomerCount(getCustomers().length);
    setProductCount(getProducts().length);
  }, []);

  const revenue = useMemo(() => {
    return orders
      .filter((order) => order.status !== "Cancelled")
      .reduce((sum, order) => sum + getAmount(order.total), 0);
  }, [orders]);

  const statValues = [
    `Rs. ${revenue.toLocaleString()}`,
    orders.length.toLocaleString(),
    productCount.toLocaleString(),
    customerCount.toLocaleString(),
  ];

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item, index) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="rounded-2xl bg-white p-6 shadow-sm transition hover:-translate-y-1 hover:shadow-xl"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${item.color}`}
              >
                <Icon size={26} />
              </div>

              <h2 className="mt-6 text-slate-500">
                {item.title}
              </h2>

              <p className="mt-2 text-3xl font-bold text-slate-900">
                {statValues[index]}
              </p>
            </div>
          );
        })}
      </div>

      <div className="rounded-2xl bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full min-w-[700px]">

            <thead>
              <tr className="border-b border-slate-200 text-left">
                <th className="p-5">Order</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Status</th>
                <th className="p-5">Total</th>
              </tr>
            </thead>

            <tbody>
              {orders.slice(0, 4).map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-slate-100 last:border-0"
                >
                  <td className="p-5 font-semibold">
                    {order.id}
                  </td>

                  <td className="p-5">
                    {order.customer}
                  </td>

                  <td className="p-5">
                    <span
                      className={`rounded-full px-3 py-1 text-sm font-semibold ${
                        order.status === "Delivered"
                          ? "bg-green-100 text-green-600"
                          : order.status === "Preparing"
                          ? "bg-blue-100 text-blue-600"
                          : order.status === "Pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : "bg-red-100 text-red-600"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>

                  <td className="p-5 font-bold">
                    {order.total}
                  </td>
                </tr>
              ))}
            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}