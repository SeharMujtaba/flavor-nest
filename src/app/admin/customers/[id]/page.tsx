/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Mail,
  MapPin,
  Phone,
  User,
  ShoppingBag,
  Ban,
  UserCheck,
  Loader2,
  RefreshCw,
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

type OrderItem = {
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

type Order = {
  _id: string;
  customer?: {
    _id: string;
    name?: string;
    email?: string;
    phone?: string;
  } | string;
  restaurant?: string;
  items: OrderItem[];
  totalAmount: number;
  status:
    | "Pending"
    | "Preparing"
    | "Out for Delivery"
    | "Delivered"
    | "Cancelled";
  createdAt: string;
};

export default function CustomerDetailsPage() {
  const params = useParams();

  const customerId = params?.id as string;

  const [customer, setCustomer] =
    useState<Customer | null>(null);

  const [orders, setOrders] = useState<Order[]>([]);

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const getToken = () => {
    if (typeof window === "undefined") {
      return "";
    }

    return (
      localStorage.getItem("token") ||
      localStorage.getItem("adminToken") ||
      ""
    );
  };

  const fetchCustomer = async (
    isRefresh = false
  ) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const token = getToken();

      if (!token) {
        throw new Error(
          "Admin authentication token not found."
        );
      }

      const [customerResponse, ordersResponse] =
        await Promise.all([
          fetch(
            `${API_URL}/api/users/${customerId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              cache: "no-store",
            }
          ),

          fetch(`${API_URL}/api/orders`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            cache: "no-store",
          }),
        ]);

      const customerData =
        await customerResponse.json();

      const ordersData =
        await ordersResponse.json();

      if (!customerResponse.ok) {
        throw new Error(
          customerData.message ||
            "Failed to fetch customer"
        );
      }

      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.message ||
            "Failed to fetch orders"
        );
      }

      setCustomer(customerData.user || customerData);

      const allOrders: Order[] =
        ordersData.orders || [];

      const customerOrders = allOrders.filter(
        (order) => {
          if (!order.customer) return false;

          if (typeof order.customer === "string") {
            return (
              order.customer === customerId
            );
          }

          return (
            order.customer._id === customerId
          );
        }
      );

      setOrders(customerOrders);
    } catch (err) {
      console.error(
        "FETCH CUSTOMER DETAILS ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch customer"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    if (!customerId) return;

    fetchCustomer();
  }, [customerId]);

  const updateStatus = async () => {
    if (!customer) return;

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
      setUpdating(true);
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
          data.message ||
            "Failed to update customer status"
        );
      }

      setCustomer(
        data.user || {
          ...customer,
          status: nextStatus,
        }
      );
    } catch (err) {
      console.error(
        "UPDATE CUSTOMER ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update customer status"
      );
    } finally {
      setUpdating(false);
    }
  };

  const totalSpent = useMemo(() => {
    return orders.reduce(
      (sum, order) =>
        sum + Number(order.totalAmount || 0),
      0
    );
  }, [orders]);

  const getStatusClass = (
    status: Order["status"]
  ) => {
    switch (status) {
      case "Delivered":
        return "bg-green-100 text-green-700";

      case "Preparing":
        return "bg-blue-100 text-blue-700";

      case "Out for Delivery":
        return "bg-purple-100 text-purple-700";

      case "Cancelled":
        return "bg-red-100 text-red-700";

      default:
        return "bg-yellow-100 text-yellow-700";
    }
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
            Loading customer...
          </span>
        </div>
      </div>
    );
  }

  if (error && !customer) {
    return (
      <div>
        <Link
          href="/admin/customers"
          className="inline-flex items-center gap-2 font-semibold text-orange-500 hover:text-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Customers
        </Link>

        <div className="mt-8 rounded-2xl border border-red-200 bg-red-50 p-8">
          <h1 className="text-2xl font-bold text-red-700">
            Customer Not Found
          </h1>

          <p className="mt-2 text-red-600">
            {error}
          </p>
        </div>
      </div>
    );
  }

  if (!customer) {
    return null;
  }

  return (
    <div className="space-y-8">
      {/* Header */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <Link
            href="/admin/customers"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 hover:text-orange-600"
          >
            <ArrowLeft size={17} />
            Back to Customers
          </Link>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Customer Details
          </h1>

          <p className="mt-2 text-slate-500">
            View customer information and order
            history.
          </p>
        </div>

        <button
          type="button"
          onClick={() => fetchCustomer(true)}
          disabled={refreshing}
          className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 font-semibold text-slate-700 shadow-sm transition hover:border-orange-300 hover:text-orange-500 disabled:opacity-60"
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
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-red-600">
          {error}
        </div>
      )}

      {/* Customer Header Card */}

      <div className="rounded-2xl bg-white p-7 shadow-sm">
        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-orange-100 text-2xl font-extrabold text-orange-600">
              {customer.name
                .split(/\s+/)
                .map((word) => word[0])
                .join("")
                .slice(0, 2)
                .toUpperCase()}
            </div>

            <div>
              <h2 className="text-3xl font-bold text-slate-900">
                {customer.name}
              </h2>

              <p className="mt-1 text-slate-500">
                Customer #
                {customer._id
                  .slice(-8)
                  .toUpperCase()}
              </p>

              <span
                className={`mt-3 inline-flex rounded-full px-4 py-2 text-sm font-semibold ${
                  customer.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {customer.status}
              </span>
            </div>
          </div>

          <button
            type="button"
            onClick={updateStatus}
            disabled={updating}
            className={`inline-flex items-center justify-center gap-2 rounded-xl px-5 py-3 font-bold text-white transition disabled:cursor-not-allowed disabled:opacity-60 ${
              customer.status === "Active"
                ? "bg-red-500 hover:bg-red-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {updating ? (
              <Loader2
                size={18}
                className="animate-spin"
              />
            ) : customer.status === "Active" ? (
              <Ban size={18} />
            ) : (
              <UserCheck size={18} />
            )}

            {customer.status === "Active"
              ? "Block Customer"
              : "Unblock Customer"}
          </button>
        </div>
      </div>

      {/* Stats */}

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-blue-100 p-3 text-blue-600">
              <ShoppingBag size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Orders
              </p>

              <p className="text-2xl font-bold text-slate-900">
                {orders.length}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-orange-100 p-3 text-orange-600">
              <span className="text-xl font-bold">
                Rs.
              </span>
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Total Spent
              </p>

              <p className="text-2xl font-bold text-orange-500">
                Rs.{" "}
                {totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="rounded-xl bg-green-100 p-3 text-green-600">
              <User size={22} />
            </div>

            <div>
              <p className="text-sm text-slate-500">
                Member Since
              </p>

              <p className="font-bold text-slate-900">
                {new Date(
                  customer.createdAt
                ).toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Customer Information */}

      <div className="rounded-2xl bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
            <User size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Customer Information
            </h2>

            <p className="text-sm text-slate-500">
              Contact and account information
            </p>
          </div>
        </div>

        <div className="mt-6 grid gap-5 md:grid-cols-2">
          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <User size={16} />
              Name
            </div>

            <p className="mt-2 font-semibold text-slate-900">
              {customer.name}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Mail size={16} />
              Email
            </div>

            <p className="mt-2 break-all font-semibold text-slate-900">
              {customer.email}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <Phone size={16} />
              Phone
            </div>

            <p className="mt-2 font-semibold text-slate-900">
              {customer.phone ||
                "Not provided"}
            </p>
          </div>

          <div className="rounded-xl bg-slate-50 p-5">
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <MapPin size={16} />
              Address
            </div>

            <p className="mt-2 font-semibold leading-7 text-slate-900">
              {customer.address ||
                "Not provided"}
            </p>
          </div>
        </div>
      </div>

      {/* Order History */}

      <div className="rounded-2xl bg-white p-7 shadow-sm">
        <div className="flex items-center gap-3 border-b border-slate-100 pb-5">
          <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
            <ShoppingBag size={22} />
          </div>

          <div>
            <h2 className="text-2xl font-bold text-slate-900">
              Order History
            </h2>

            <p className="text-sm text-slate-500">
              Orders placed by this customer
            </p>
          </div>
        </div>

        {orders.length > 0 ? (
          <div className="mt-6 overflow-x-auto">
            <table className="w-full min-w-[750px]">
              <thead className="bg-slate-50">
                <tr>
                  <th className="p-4 text-left">
                    Order ID
                  </th>

                  <th className="p-4 text-left">
                    Restaurant
                  </th>

                  <th className="p-4 text-center">
                    Items
                  </th>

                  <th className="p-4 text-left">
                    Amount
                  </th>

                  <th className="p-4 text-left">
                    Status
                  </th>

                  <th className="p-4 text-left">
                    Date
                  </th>
                </tr>
              </thead>

              <tbody>
                {orders.map((order) => (
                  <tr
                    key={order._id}
                    className="border-t border-slate-100"
                  >
                    <td className="p-4">
                      <Link
                        href={`/admin/orders/${order._id}`}
                        className="font-bold text-orange-500 hover:text-orange-600 hover:underline"
                      >
                        #
                        {order._id
                          .slice(-8)
                          .toUpperCase()}
                      </Link>
                    </td>

                    <td className="p-4">
                      {order.restaurant ||
                        "Not specified"}
                    </td>

                    <td className="p-4 text-center">
                      {order.items.reduce(
                        (sum, item) =>
                          sum + item.quantity,
                        0
                      )}
                    </td>

                    <td className="p-4 font-bold">
                      Rs.{" "}
                      {Number(
                        order.totalAmount || 0
                      ).toLocaleString()}
                    </td>

                    <td className="p-4">
                      <span
                        className={`rounded-full px-3 py-1.5 text-xs font-semibold ${getStatusClass(
                          order.status
                        )}`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td className="p-4 text-sm text-slate-500">
                      {new Date(
                        order.createdAt
                      ).toLocaleDateString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="py-16 text-center">
            <ShoppingBag
              size={50}
              className="mx-auto text-slate-300"
            />

            <h3 className="mt-5 text-2xl font-bold text-slate-900">
              No Orders Yet
            </h3>

            <p className="mt-2 text-slate-500">
              This customer has not placed any
              orders yet.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}