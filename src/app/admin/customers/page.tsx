/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Ban,
  UserCheck,
  Mail,
  Phone,
  RefreshCw,
  Loader2,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type Customer = {
  _id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: "customer" | "admin";
  status: "Active" | "Blocked";
  createdAt: string;
};

type Order = {
  _id: string;
  customer?: {
    _id: string;
    name?: string;
    email?: string;
    phone?: string;
  } | string;
  totalAmount: number;
};

type CustomerRow = Customer & {
  orders: number;
  spending: number;
};

export default function CustomersPage() {
  const [customers, setCustomers] = useState<CustomerRow[]>([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");
  const [updatingId, setUpdatingId] = useState<string | null>(null);

  const getToken = () => {
    if (typeof window === "undefined") return "";

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken") ||
      ""
    );
  };

  const fetchCustomers = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = getToken();

      if (!token) {
        throw new Error("Admin authentication token not found.");
      }

      const [usersResponse, ordersResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/users`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }),

          fetch(`${API_URL}/api/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }),
        ]);

      const usersData = await usersResponse.json();
      const ordersData = await ordersResponse.json();

      if (!usersResponse.ok) {
        throw new Error(
          usersData.message || "Failed to fetch customers"
        );
      }

      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.message || "Failed to fetch orders"
        );
      }

      const users: Customer[] = usersData.users || [];
      const orders: Order[] = ordersData.orders || [];

      const customerUsers = users.filter(
        (user) => user.role === "customer"
      );

      const rows: CustomerRow[] = customerUsers.map(
        (customer) => {
          const customerOrders = orders.filter((order) => {
            if (!order.customer) return false;

            if (typeof order.customer === "string") {
              return order.customer === customer._id;
            }

            return order.customer._id === customer._id;
          });

          const spending = customerOrders.reduce(
            (sum, order) =>
              sum + Number(order.totalAmount || 0),
            0
          );

          return {
            ...customer,
            orders: customerOrders.length,
            spending,
          };
        }
      );

      setCustomers(rows);
    } catch (err) {
      console.error("FETCH CUSTOMERS ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch customers"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  const updateStatus = async (
    customer: CustomerRow
  ) => {
    const nextStatus =
      customer.status === "Active"
        ? "Blocked"
        : "Active";

    const confirmed = window.confirm(
      `Are you sure you want to ${
        nextStatus === "Blocked"
          ? "block"
          : "unblock"
      } ${customer.name}?`
    );

    if (!confirmed) return;

    try {
      setUpdatingId(customer._id);
      setError("");

      const token = getToken();

      const response = await fetch(
        `${API_URL}/api/users/${customer._id}/status`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            status: nextStatus,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update customer status"
        );
      }

      setCustomers((current) =>
        current.map((item) =>
          item._id === customer._id
            ? {
                ...item,
                status:
                  data.user?.status || nextStatus,
              }
            : item
        )
      );
    } catch (err) {
      console.error("UPDATE CUSTOMER STATUS ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update customer status"
      );
    } finally {
      setUpdatingId(null);
    }
  };

  const filteredCustomers = useMemo(() => {
    const keyword = search.toLowerCase().trim();

    if (!keyword) {
      return customers;
    }

    return customers.filter((customer) => {
      return (
        customer.name
          .toLowerCase()
          .includes(keyword) ||
        customer.email
          .toLowerCase()
          .includes(keyword) ||
        (customer.phone || "")
          .toLowerCase()
          .includes(keyword) ||
        customer.status
          .toLowerCase()
          .includes(keyword)
      );
    });
  }, [search, customers]);

  const getInitials = (name: string) => {
    return (
      name
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase() || "U"
    );
  };

  if (loading) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="flex items-center gap-3 text-slate-600">
          <Loader2
            size={24}
            className="animate-spin text-orange-500"
          />
          <span className="font-semibold">
            Loading customers...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Customers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all registered customers from MongoDB.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchCustomers(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-500 disabled:cursor-not-allowed disabled:opacity-60"
        >
          <RefreshCw
            size={18}
            className={
              refreshing ? "animate-spin" : ""
            }
          />

          {refreshing ? "Refreshing..." : "Refresh"}
        </button>
      </div>

      {/* Error */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm font-medium text-red-600">
          {error}
        </div>
      )}

      {/* Search */}

      <div className="flex flex-col gap-4 md:flex-row">
        <input
          type="text"
          value={search}
          onChange={(e) =>
            setSearch(e.target.value)
          }
          placeholder="Search by Name, Email, Phone or Status..."
          className="w-full max-w-xl rounded-xl border border-slate-300 bg-white px-5 py-3 shadow-sm outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
        />

        <div className="inline-flex w-fit items-center rounded-xl bg-orange-100 px-5 py-3 font-semibold text-orange-600">
          {filteredCustomers.length}{" "}
          {filteredCustomers.length === 1
            ? "Customer"
            : "Customers"}
        </div>
      </div>

      {/* Table */}

      <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">
        <table className="w-full min-w-[1100px]">
          <thead className="bg-slate-100">
            <tr>
              <th className="p-5 text-left">
                Customer
              </th>

              <th className="p-5 text-left">
                Email
              </th>

              <th className="p-5 text-left">
                Phone
              </th>

              <th className="p-5 text-center">
                Orders
              </th>

              <th className="p-5 text-center">
                Spent
              </th>

              <th className="p-5 text-center">
                Status
              </th>

              <th className="p-5 text-center">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map(
                (customer) => (
                  <tr
                    key={customer._id}
                    className="border-t border-slate-200 transition hover:bg-slate-50"
                  >
                    {/* Customer */}

                    <td className="p-5">
                      <div className="flex items-center gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange-100 text-lg font-bold text-orange-600">
                          {getInitials(
                            customer.name
                          )}
                        </div>

                        <div>
                          <h3 className="font-bold text-slate-900">
                            {customer.name}
                          </h3>

                          <p className="text-sm text-slate-500">
                            Customer #
                            {customer._id
                              .slice(-6)
                              .toUpperCase()}
                          </p>
                        </div>
                      </div>
                    </td>

                    {/* Email */}

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Mail
                          size={16}
                          className="text-orange-500"
                        />

                        <span>
                          {customer.email}
                        </span>
                      </div>
                    </td>

                    {/* Phone */}

                    <td className="p-5">
                      <div className="flex items-center gap-2">
                        <Phone
                          size={16}
                          className="text-emerald-500"
                        />

                        <span>
                          {customer.phone ||
                            "Not provided"}
                        </span>
                      </div>
                    </td>

                    {/* Orders */}

                    <td className="p-5 text-center font-semibold">
                      {customer.orders}
                    </td>

                    {/* Spending */}

                    <td className="p-5 text-center font-bold text-orange-500">
                      Rs.{" "}
                      {customer.spending.toLocaleString()}
                    </td>

                    {/* Status */}

                    <td className="p-5 text-center">
                      <span
                        className={`rounded-full px-4 py-2 text-sm font-semibold ${
                          customer.status ===
                          "Active"
                            ? "bg-green-100 text-green-600"
                            : "bg-red-100 text-red-600"
                        }`}
                      >
                        {customer.status}
                      </span>
                    </td>

                    {/* Actions */}

                    <td className="p-5">
                      <div className="flex justify-center gap-3">
                        <Link
                          href={`/admin/customers/${customer._id}`}
                          title="View customer"
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                        >
                          <Eye size={18} />
                        </Link>

                        <button
                          type="button"
                          onClick={() =>
                            updateStatus(customer)
                          }
                          disabled={
                            updatingId ===
                            customer._id
                          }
                          title={
                            customer.status ===
                            "Active"
                              ? "Block customer"
                              : "Unblock customer"
                          }
                          className={`rounded-lg p-2 transition disabled:cursor-not-allowed disabled:opacity-50 ${
                            customer.status ===
                            "Active"
                              ? "bg-red-100 text-red-600 hover:bg-red-600 hover:text-white"
                              : "bg-green-100 text-green-600 hover:bg-green-600 hover:text-white"
                          }`}
                        >
                          {updatingId ===
                          customer._id ? (
                            <Loader2
                              size={18}
                              className="animate-spin"
                            />
                          ) : customer.status ===
                            "Active" ? (
                            <Ban size={18} />
                          ) : (
                            <UserCheck size={18} />
                          )}
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td
                  colSpan={7}
                  className="py-20 text-center"
                >
                  <h2 className="text-3xl font-bold text-slate-900">
                    No Customers Found
                  </h2>

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