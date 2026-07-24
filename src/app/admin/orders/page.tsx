"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { Eye } from "lucide-react";

const orders = [
  {
    id: "#1001",
    customer: "Rizwan Khan",
    restaurant: "Burger Hub",
    total: "Rs. 2,450",
    status: "Delivered",
  },
  {
    id: "#1002",
    customer: "Sara Khan",
    restaurant: "Pizza Palace",
    total: "Rs. 1,850",
    status: "Preparing",
  },
  {
    id: "#1003",
    customer: "Hamza",
    restaurant: "Desi Kitchen",
    total: "Rs. 950",
    status: "Pending",
  },
  {
    id: "#1004",
    customer: "Ayesha",
    restaurant: "Chinese Wok",
    total: "Rs. 3,250",
    status: "Cancelled",
  },
];

export default function OrdersPage() {
  const [search, setSearch] = useState("");

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) return orders;

    return orders.filter((order) => {
      return (
        order.id.toLowerCase().includes(keyword) ||
        order.customer.toLowerCase().includes(keyword) ||
        order.restaurant.toLowerCase().includes(keyword) ||
        order.status.toLowerCase().includes(keyword)
      );
    });
  }, [search]);

  return (
    <div className="space-y-8">

      {/* Heading */}

      <div>

        <h1 className="text-4xl font-extrabold text-slate-900">
          Orders
        </h1>

        <p className="mt-2 text-slate-500">
          Manage customer orders.
        </p>

      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Order ID, Customer, Restaurant or Status..."
          className="
            w-full
            max-w-xl

            rounded-xl

            border
            border-slate-300

            bg-white

            px-5
            py-3

            text-slate-700
            placeholder:text-slate-400

            shadow-sm

            outline-none

            transition-all

            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
          "
        />

        <button
          onClick={() => {}}
          className="
            rounded-xl

            bg-orange-500

            px-8
            py-3

            font-semibold

            text-white

            transition

            hover:bg-orange-600
          "
        >
          Search
        </button>

      </div>

      {/* Table */}

      <div className="overflow-hidden rounded-2xl bg-white shadow-sm">

        <table className="w-full">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-5 text-left">Order ID</th>
              <th className="p-5 text-left">Customer</th>
              <th className="p-5 text-left">Restaurant</th>
              <th className="p-5 text-left">Amount</th>
              <th className="p-5 text-left">Status</th>
              <th className="p-5 text-center">Action</th>

            </tr>

          </thead>

          <tbody>
                        {filteredOrders.length > 0 ? (

              filteredOrders.map((order) => (

                <tr
                  key={order.id}
                  className="border-t border-slate-200 transition hover:bg-slate-50"
                >

                  <td className="p-5 font-semibold">
                    {order.id}
                  </td>

                  <td className="p-5">
                    {order.customer}
                  </td>

                  <td className="p-5">
                    {order.restaurant}
                  </td>

                  <td className="p-5 font-semibold">
                    {order.total}
                  </td>

                  <td className="p-5">

                    <span
                      className={`
                        rounded-full
                        px-4
                        py-2
                        text-sm
                        font-semibold

                        ${
                          order.status === "Delivered"
                            ? "bg-green-100 text-green-600"
                            : order.status === "Preparing"
                            ? "bg-blue-100 text-blue-600"
                            : order.status === "Pending"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-red-100 text-red-600"
                        }
                      `}
                    >
                      {order.status}
                    </span>

                  </td>

                  <td className="p-5">

                    <div className="flex justify-center">

                      <Link
                        href={`/admin/orders/${order.id.replace("#", "")}`}
                        className="
                          rounded-lg
                          bg-orange-100
                          p-2
                          text-orange-500
                          transition
                          hover:bg-orange-500
                          hover:text-white
                        "
                      >
                        <Eye size={18} />
                      </Link>

                    </div>

                  </td>

                </tr>

              ))

            ) : (

              <tr>

                <td
                  colSpan={6}
                  className="py-20 text-center"
                >

                  <h3 className="text-3xl font-bold text-slate-900">
                    No Orders Found
                  </h3>

                  <p className="mt-3 text-slate-500">
                    Try searching with another keyword.
                  </p>

                </td>

              </tr>

            )}

          </tbody>

        </table>

      </div>

    </div>
  );
}