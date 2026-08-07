/* eslint-disable @next/next/no-img-element */

"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  ArrowLeft,
  Loader2,
  MapPin,
  Package,
  Phone,
  Mail,
  User,
  Store,
  CheckCircle,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

type OrderItem = {
  product?: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
};

type Customer = {
  _id?: string;
  name?: string;
  email?: string;
  phone?: string;
};

type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

type Order = {
  _id: string;

  customer?: Customer | string | null;

  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;

  restaurant?: string;

  items: OrderItem[];

  totalAmount: number;

  deliveryAddress?: string;

  status: OrderStatus;

  createdAt: string;
  updatedAt: string;
};

const statuses: OrderStatus[] = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
  "Cancelled",
];

export default function OrderDetailsPage() {
  const params = useParams();

  const orderId = Array.isArray(params?.id)
    ? params.id[0]
    : params?.id;

  const [order, setOrder] = useState<Order | null>(null);

  const [status, setStatus] =
    useState<OrderStatus>("Pending");

  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);

  const [error, setError] = useState("");

  // --------------------------------------------------
  // FETCH ORDER
  // --------------------------------------------------

  useEffect(() => {
    if (!orderId) return;

    const fetchOrder = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(
          `${API_URL}/api/orders/${orderId}`,
          {
            method: "GET",
            cache: "no-store",
          }
        );

        const data = await response.json();

        if (!response.ok) {
          throw new Error(
            data.message || "Failed to fetch order"
          );
        }

        const fetchedOrder: Order =
          data.order || data;

        console.log(
          "ORDER DETAILS RESPONSE:",
          fetchedOrder
        );

        console.log(
          "POPULATED CUSTOMER:",
          fetchedOrder.customer
        );

        setOrder(fetchedOrder);
        setStatus(fetchedOrder.status);
      } catch (err) {
        console.error(
          "FETCH ORDER ERROR:",
          err
        );

        setError(
          err instanceof Error
            ? err.message
            : "Failed to fetch order"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [orderId]);

  // --------------------------------------------------
  // UPDATE STATUS
  // --------------------------------------------------

  const updateStatus = async () => {
    if (!order) return;

    try {
      setUpdating(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/${order._id}/status`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            status,
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message ||
            "Failed to update order status"
        );
      }

      const updatedOrder: Order =
        data.order || data;

      setOrder(updatedOrder);
      setStatus(updatedOrder.status);

      alert(
        "Order status updated successfully."
      );
    } catch (err) {
      console.error(
        "UPDATE STATUS ERROR:",
        err
      );

      setError(
        err instanceof Error
          ? err.message
          : "Failed to update order status"
      );
    } finally {
      setUpdating(false);
    }
  };

  // --------------------------------------------------
  // LOADING
  // --------------------------------------------------

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex items-center gap-3 rounded-2xl bg-white px-7 py-5 shadow-sm">
          <Loader2
            size={24}
            className="animate-spin text-orange-500"
          />

          <span className="font-semibold text-slate-700">
            Loading order...
          </span>
        </div>
      </div>
    );
  }

  // --------------------------------------------------
  // ERROR
  // --------------------------------------------------

  if (error && !order) {
    return (
      <div className="rounded-2xl bg-white p-10 text-center shadow-sm">
        <h1 className="text-3xl font-bold text-slate-900">
          Order Not Found
        </h1>

        <p className="mt-3 text-slate-500">
          {error}
        </p>

        <Link
          href="/admin/orders"
          className="mt-7 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
        >
          <ArrowLeft size={18} />
          Back to Orders
        </Link>
      </div>
    );
  }

  if (!order) {
    return null;
  }

  // --------------------------------------------------
  // CUSTOMER DATA
  // --------------------------------------------------

  /*
    IMPORTANT:

    The backend populates:

    customer: {
      name,
      email,
      phone
    }

    But the Order document also contains:

    customerName
    customerEmail
    customerPhone

    Therefore we check BOTH.
  */

  const populatedCustomer =
    typeof order.customer === "object" &&
    order.customer !== null
      ? order.customer
      : null;

  const customerName =
    populatedCustomer?.name?.trim() ||
    order.customerName?.trim() ||
    "Not provided";

  const customerEmail =
    populatedCustomer?.email?.trim() ||
    order.customerEmail?.trim() ||
    "Not provided";

  const customerPhone =
    populatedCustomer?.phone?.trim() ||
    order.customerPhone?.trim() ||
    "Not provided";

  // --------------------------------------------------
  // DATE
  // --------------------------------------------------

  const orderDate = order.createdAt
    ? new Date(
        order.createdAt
      ).toLocaleString()
    : "Unknown";

  // --------------------------------------------------
  // STATUS COLOR
  // --------------------------------------------------

  const statusClasses =
    order.status === "Delivered"
      ? "bg-green-100 text-green-700"
      : order.status === "Cancelled"
      ? "bg-red-100 text-red-700"
      : order.status === "Preparing"
      ? "bg-blue-100 text-blue-700"
      : order.status ===
        "Out for Delivery"
      ? "bg-purple-100 text-purple-700"
      : "bg-yellow-100 text-yellow-700";

  // --------------------------------------------------
  // PAGE
  // --------------------------------------------------

  return (
    <div className="space-y-8">

      {/* ========================================= */}
      {/* HEADER */}
      {/* ========================================= */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <Link
            href="/admin/orders"
            className="mb-4 inline-flex items-center gap-2 text-sm font-semibold text-orange-500 transition hover:text-orange-600"
          >
            <ArrowLeft size={17} />
            Back to Orders
          </Link>

          <h1 className="text-4xl font-extrabold text-slate-900 md:text-5xl">
            Order Details
          </h1>

          <p className="mt-2 text-slate-500">
            Order ID:{" "}
            <span className="font-bold text-slate-700">
              #{order._id.slice(-8).toUpperCase()}
            </span>
          </p>

          <p className="mt-1 text-sm text-slate-400">
            Placed on {orderDate}
          </p>

        </div>

        <div
          className={`inline-flex w-fit items-center gap-2 rounded-full px-5 py-3 text-sm font-bold ${statusClasses}`}
        >
          <CheckCircle size={18} />
          {order.status}
        </div>

      </div>

      {/* ========================================= */}
      {/* ERROR */}
      {/* ========================================= */}

      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 font-medium text-red-600">
          {error}
        </div>
      )}

      {/* ========================================= */}
      {/* MAIN GRID */}
      {/* ========================================= */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* ======================================= */}
        {/* LEFT */}
        {/* ======================================= */}

        <div className="space-y-8 lg:col-span-2">

          {/* ===================================== */}
          {/* CUSTOMER INFORMATION */}
          {/* ===================================== */}

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
                  Customer details for this order
                </p>

              </div>

            </div>

            <div className="mt-6 grid gap-5 md:grid-cols-2">

              {/* NAME */}

              <div className="rounded-xl bg-slate-50 p-5">

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <User size={16} />
                  Name
                </div>

                <p className="mt-2 break-words text-lg font-bold text-slate-900">
                  {customerName}
                </p>

              </div>

              {/* EMAIL */}

              <div className="rounded-xl bg-slate-50 p-5">

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Mail size={16} />
                  Email
                </div>

                <p className="mt-2 break-all text-lg font-bold text-slate-900">
                  {customerEmail}
                </p>

              </div>

              {/* PHONE */}

              <div className="rounded-xl bg-slate-50 p-5">

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Phone size={16} />
                  Phone
                </div>

                <p className="mt-2 break-words text-lg font-bold text-slate-900">
                  {customerPhone}
                </p>

              </div>

              {/* RESTAURANT */}

              <div className="rounded-xl bg-slate-50 p-5">

                <div className="flex items-center gap-2 text-sm text-slate-400">
                  <Store size={16} />
                  Restaurant
                </div>

                <p className="mt-2 break-words text-lg font-bold text-slate-900">
                  {order.restaurant ||
                    "Not specified"}
                </p>

              </div>

            </div>

          </div>

          {/* ===================================== */}
          {/* DELIVERY ADDRESS */}
          {/* ===================================== */}

          <div className="rounded-2xl bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">

              <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
                <MapPin size={22} />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Delivery Address
                </h2>

                <p className="text-sm text-slate-500">
                  Where this order should be delivered
                </p>

              </div>

            </div>

            <div className="mt-6 rounded-xl bg-slate-50 p-5">

              <p className="leading-7 text-slate-700">
                {order.deliveryAddress ||
                  "No delivery address provided."}
              </p>

            </div>

          </div>

          {/* ===================================== */}
          {/* ORDERED ITEMS */}
          {/* ===================================== */}

          <div className="rounded-2xl bg-white p-7 shadow-sm">

            <div className="flex items-center gap-3 border-b border-slate-100 pb-5">

              <div className="rounded-xl bg-orange-100 p-3 text-orange-500">
                <Package size={22} />
              </div>

              <div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Ordered Items
                </h2>

                <p className="text-sm text-slate-500">
                  {order.items.length} item
                  {order.items.length !== 1
                    ? "s"
                    : ""}{" "}
                  in this order
                </p>

              </div>

            </div>

            <div className="mt-6 divide-y divide-slate-100">

              {order.items.map(
                (item, index) => (

                  <div
                    key={`${item.product || item.name}-${index}`}
                    className="flex flex-col gap-4 py-5 sm:flex-row sm:items-center sm:justify-between"
                  >

                    <div className="flex items-center gap-4">

                      {/* IMAGE */}

                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-20 w-20 rounded-xl object-cover"
                        />
                      ) : (
                        <div className="flex h-20 w-20 items-center justify-center rounded-xl bg-orange-100 text-orange-500">
                          <Package size={26} />
                        </div>
                      )}

                      {/* DETAILS */}

                      <div>

                        <h3 className="text-lg font-bold text-slate-900">
                          {item.name}
                        </h3>

                        <p className="mt-1 text-sm text-slate-500">
                          Qty: {item.quantity}
                        </p>

                        <p className="mt-1 text-sm text-slate-500">
                          Rs.{" "}
                          {item.price.toLocaleString()}{" "}
                          each
                        </p>

                      </div>

                    </div>

                    <p className="text-lg font-bold text-slate-900">
                      Rs.{" "}
                      {(
                        item.price *
                        item.quantity
                      ).toLocaleString()}
                    </p>

                  </div>

                )
              )}

            </div>

          </div>

        </div>

        {/* ======================================= */}
        {/* RIGHT */}
        {/* ======================================= */}

        <div className="space-y-8">

          {/* ===================================== */}
          {/* UPDATE STATUS */}
          {/* ===================================== */}

          <div className="rounded-2xl bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Update Status
            </h2>

            <p className="mt-2 text-sm leading-6 text-slate-500">
              Change the current status of this
              customer order.
            </p>

            <select
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as OrderStatus
                )
              }
              className="mt-6 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            >
              {statuses.map(
                (item) => (
                  <option
                    key={item}
                    value={item}
                  >
                    {item}
                  </option>
                )
              )}
            </select>

            <button
              type="button"
              onClick={updateStatus}
              disabled={
                updating ||
                status === order.status
              }
              className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-orange-500 py-3 font-bold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:bg-slate-300"
            >

              {updating && (
                <Loader2
                  size={18}
                  className="animate-spin"
                />
              )}

              {updating
                ? "Updating..."
                : "Update Order Status"}

            </button>

          </div>

          {/* ===================================== */}
          {/* ORDER SUMMARY */}
          {/* ===================================== */}

          <div className="rounded-2xl bg-white p-7 shadow-sm">

            <h2 className="text-2xl font-bold text-slate-900">
              Order Summary
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex justify-between text-slate-500">
                <span>Items</span>

                <span className="font-semibold text-slate-700">
                  {order.items.reduce(
                    (sum, item) =>
                      sum + item.quantity,
                    0
                  )}
                </span>
              </div>

              <div className="flex justify-between gap-4 text-slate-500">

                <span>
                  Restaurant
                </span>

                <span className="max-w-[180px] text-right font-medium text-slate-700">
                  {order.restaurant ||
                    "N/A"}
                </span>

              </div>

              <hr />

              <div className="flex items-center justify-between gap-4">

                <span className="text-lg font-semibold text-slate-900">
                  Total
                </span>

                <span className="text-2xl font-extrabold text-orange-500">
                  Rs.{" "}
                  {Number(
                    order.totalAmount || 0
                  ).toLocaleString()}
                </span>

              </div>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}