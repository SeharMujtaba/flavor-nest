/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { Eye, RefreshCw } from "lucide-react";

type Order = {
  _id: string;
  customerName: string;
  customerEmail?: string;
  customerPhone?: string;
  restaurant?: string;
  totalAmount: number;
  status: string;
  createdAt?: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const statusClasses: Record<string, string> = {
  Delivered: "bg-green-100 text-green-600",
  Preparing: "bg-blue-100 text-blue-600",
  Pending: "bg-yellow-100 text-yellow-700",
  "Out for Delivery": "bg-purple-100 text-purple-600",
  Cancelled: "bg-red-100 text-red-600",
};

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // -------------------------
  // Fetch orders
  // -------------------------

  const fetchOrders = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(`${API_URL}/api/orders`, {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch orders"
        );
      }

      setOrders(data.orders || []);
    } catch (error) {
      console.error("FETCH ORDERS ERROR:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch orders"
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  // -------------------------
  // Search
  // -------------------------

  const filteredOrders = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return orders;
    }

    return orders.filter((order) => {
      return (
        order._id.toLowerCase().includes(keyword) ||
        order.customerName
          .toLowerCase()
          .includes(keyword) ||
        order.customerEmail
          ?.toLowerCase()
          .includes(keyword) ||
        order.customerPhone
          ?.toLowerCase()
          .includes(keyword) ||
        order.restaurant
          ?.toLowerCase()
          .includes(keyword) ||
        order.status.toLowerCase().includes(keyword)
      );
    });
  }, [orders, search]);

  // -------------------------
  // Format date
  // -------------------------

  const formatDate = (date?: string) => {
    if (!date) {
      return "—";
    }

    return new Date(date).toLocaleDateString();
  };

  // -------------------------
  // Format money
  // -------------------------

  const formatAmount = (amount: number) => {
    return `Rs. ${amount.toLocaleString()}`;
  };

  // -------------------------
  // Loading
  // -------------------------

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />

          <p className="mt-4 text-slate-500">
            Loading orders...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Orders
          </h1>

          <p className="mt-2 text-slate-500">
            Manage customer orders from MongoDB.
          </p>
        </div>

        <button
          type="button"
          onClick={fetchOrders}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:border-orange-400 hover:text-orange-500"
        >
          <RefreshCw size={18} />
          Refresh
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-red-600">
          <p className="font-semibold">
            Failed to load orders
          </p>

          <p className="mt-1 text-sm">
            {error}
          </p>

          <button
            type="button"
            onClick={fetchOrders}
            className="mt-4 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
          >
            Try Again
          </button>
        </div>
      )}

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
            transition
            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
          "
        />

        <div className="rounded-xl bg-white px-5 py-3 text-sm font-semibold text-slate-600 shadow-sm">
          {filteredOrders.length}{" "}
          {filteredOrders.length === 1
            ? "Order"
            : "Orders"}
        </div>

      </div>

      {/* Orders Table */}

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">

        <table className="w-full min-w-[1000px]">

          <thead className="bg-slate-100">

            <tr>

              <th className="p-5 text-left">
                Order ID
              </th>

              <th className="p-5 text-left">
                Customer
              </th>

              <th className="p-5 text-left">
                Restaurant
              </th>

              <th className="p-5 text-left">
                Amount
              </th>

              <th className="p-5 text-left">
                Status
              </th>

              <th className="p-5 text-left">
                Date
              </th>

              <th className="p-5 text-center">
                Action
              </th>

            </tr>

          </thead>

          <tbody>

            {filteredOrders.length > 0 ? (

              filteredOrders.map((order) => (

                <tr
                  key={order._id}
                  className="border-t border-slate-200 transition hover:bg-slate-50"
                >

                  {/* Order ID */}

                  <td className="p-5">

                    <span className="font-semibold text-slate-900">
                      #{order._id.slice(-6).toUpperCase()}
                    </span>

                  </td>

                  {/* Customer */}

                  <td className="p-5">

                    <div>
                      <p className="font-semibold text-slate-900">
                        {order.customerName}
                      </p>

                      {order.customerEmail && (
                        <p className="mt-1 text-sm text-slate-500">
                          {order.customerEmail}
                        </p>
                      )}
                    </div>

                  </td>

                  {/* Restaurant */}

                  <td className="p-5">
                    {order.restaurant || "—"}
                  </td>

                  {/* Amount */}

                  <td className="p-5 font-bold text-slate-900">
                    {formatAmount(order.totalAmount)}
                  </td>

                  {/* Status */}

                  <td className="p-5">

                    <span
                      className={`rounded-full px-4 py-2 text-sm font-semibold ${
                        statusClasses[order.status] ||
                        "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {order.status}
                    </span>

                  </td>

                  {/* Date */}

                  <td className="p-5 text-slate-600">
                    {formatDate(order.createdAt)}
                  </td>

                  {/* Action */}

                  <td className="p-5">

                    <div className="flex justify-center">

                      <Link
                        href={`/admin/orders/${order._id}`}
                        title="View order"
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
                  colSpan={7}
                  className="py-20 text-center"
                >

                  <h3 className="text-3xl font-bold text-slate-900">
                    No Orders Found
                  </h3>

                  <p className="mt-3 text-slate-500">
                    {search
                      ? "Try searching with another keyword."
                      : "There are no orders in the database yet."}
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