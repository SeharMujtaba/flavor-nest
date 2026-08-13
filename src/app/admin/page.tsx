"use client";

import { useEffect, useState } from "react";
import {
  ShoppingBag,
  Package,
  Clock3,
  CheckCircle2,
  RefreshCw,
  AlertCircle,
  Bell,
  TrendingUp,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flavor-nest-403w.onrender.com";

type DashboardOrder = {
  _id: string;
  status?: string;
};

type DashboardProduct = {
  _id: string;
  name?: string;
};

type OrdersResponse = {
  success: boolean;
  orders: DashboardOrder[];
  message?: string;
};

type ProductsResponse = {
  success: boolean;
  products: DashboardProduct[];
  message?: string;
};

const stats = [
  {
    title: "Total Orders",
    icon: ShoppingBag,
    key: "orders",
    iconBox: "bg-orange-100/80 text-orange-500",
    glow: "bg-orange-300/30",
    line: "text-orange-400",
  },
  {
    title: "Total Products",
    icon: Package,
    key: "products",
    iconBox: "bg-blue-100/80 text-blue-600",
    glow: "bg-blue-300/30",
    line: "text-blue-400",
  },
  {
    title: "Pending Orders",
    icon: Clock3,
    key: "pending",
    iconBox: "bg-yellow-100/80 text-yellow-600",
    glow: "bg-yellow-300/30",
    line: "text-yellow-400",
  },
  {
    title: "Delivered Orders",
    icon: CheckCircle2,
    key: "delivered",
    iconBox: "bg-green-100/80 text-green-600",
    glow: "bg-green-300/30",
    line: "text-green-400",
  },
];

export default function AdminDashboard() {
  const [orderCount, setOrderCount] = useState(0);
  const [productCount, setProductCount] = useState(0);
  const [pendingCount, setPendingCount] = useState(0);
  const [deliveredCount, setDeliveredCount] = useState(0);

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const loadDashboard = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const [ordersResponse, productsResponse] =
        await Promise.all([
          fetch(`${API_URL}/api/orders`, {
            cache: "no-store",
          }),

          fetch(`${API_URL}/api/products/admin/all`, {
            cache: "no-store",
          }),
        ]);

      const ordersData: OrdersResponse =
        await ordersResponse.json();

      const productsData: ProductsResponse =
        await productsResponse.json();

      if (!ordersResponse.ok) {
        throw new Error(
          ordersData.message || "Failed to fetch orders"
        );
      }

      if (!productsResponse.ok) {
        throw new Error(
          productsData.message || "Failed to fetch products"
        );
      }

      const orders = Array.isArray(ordersData.orders)
        ? ordersData.orders
        : [];

      const products = Array.isArray(productsData.products)
        ? productsData.products
        : [];

      setOrderCount(orders.length);
      setProductCount(products.length);

      setPendingCount(
        orders.filter(
          (order) =>
            order.status?.toLowerCase() === "pending"
        ).length
      );

      setDeliveredCount(
        orders.filter(
          (order) =>
            order.status?.toLowerCase() === "delivered"
        ).length
      );
    } catch (err) {
      console.error("Dashboard fetch error:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load dashboard data."
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    loadDashboard();
  }, []);

  const values: Record<string, number> = {
    orders: orderCount,
    products: productCount,
    pending: pendingCount,
    delivered: deliveredCount,
  };

  return (
    <div className="min-h-full space-y-8 pb-10">

      {/* =====================================================
          HEADER
      ====================================================== */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight text-slate-900">
            Dashboard
          </h1>

          <p className="mt-2 text-slate-500">
            Welcome back! Here&apos;s what&apos;s happening
            with your restaurant.
          </p>
        </div>

        <button
          type="button"
          onClick={() => loadDashboard(true)}
          disabled={loading || refreshing}
          className="
            group
            inline-flex
            w-fit
            items-center
            justify-center
            gap-2
            rounded-xl
            border
            border-white/90
            bg-white/75
            px-5
            py-3
            font-semibold
            text-slate-700
            shadow-[0_8px_30px_rgba(15,23,42,0.08)]
            backdrop-blur-xl
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:bg-white
            hover:text-orange-500
            hover:shadow-[0_12px_35px_rgba(15,23,42,0.12)]
            disabled:cursor-not-allowed
            disabled:opacity-60
          "
        >
          <RefreshCw
            size={18}
            className={
              refreshing
                ? "animate-spin"
                : "transition-transform duration-300 group-hover:rotate-180"
            }
          />

          Refresh
        </button>
      </div>

      {/* =====================================================
          ERROR
      ====================================================== */}
      {error && (
        <div
          className="
            flex
            items-start
            gap-3
            rounded-2xl
            border
            border-red-200/70
            bg-red-50/80
            p-5
            text-red-700
            shadow-sm
            backdrop-blur-xl
          "
        >
          <AlertCircle
            size={22}
            className="mt-0.5 shrink-0"
          />

          <div>
            <p className="font-bold">
              Dashboard data could not be loaded
            </p>

            <p className="mt-1 text-sm">
              {error}
            </p>

            <button
              type="button"
              onClick={() => loadDashboard(true)}
              className="mt-2 text-sm font-bold underline"
            >
              Try again
            </button>
          </div>
        </div>
      )}

      {/* =====================================================
          PREMIUM STAT CARDS
      ====================================================== */}
      <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => {
          const Icon = item.icon;
          const value = values[item.key];

          return (
            <div
              key={item.title}
              className="
                group
                relative
                min-h-[255px]
                overflow-hidden
                rounded-[30px]
                border
                border-white/90
                bg-white/65
                p-7
                shadow-[0_20px_55px_-20px_rgba(15,23,42,0.22)]
                backdrop-blur-2xl
                transition-all
                duration-500
                hover:-translate-y-2
                hover:bg-white/80
                hover:shadow-[0_30px_70px_-20px_rgba(15,23,42,0.27)]
              "
            >
              {/* Main glass glow */}
              <div
                className={`
                  pointer-events-none
                  absolute
                  -right-16
                  -top-16
                  h-44
                  w-44
                  rounded-full
                  ${item.glow}
                  blur-3xl
                  transition-all
                  duration-700
                  group-hover:scale-150
                `}
              />

              {/* Bottom glow */}
              <div
                className="
                  pointer-events-none
                  absolute
                  -bottom-20
                  -left-10
                  h-40
                  w-40
                  rounded-full
                  bg-slate-200/30
                  blur-3xl
                "
              />

              {/* Decorative grid */}
              <div
                className="
                  pointer-events-none
                  absolute
                  inset-0
                  opacity-[0.025]
                  [background-image:linear-gradient(to_right,#0f172a_1px,transparent_1px),linear-gradient(to_bottom,#0f172a_1px,transparent_1px)]
                  [background-size:28px_28px]
                "
              />

              <div className="relative z-10">

                {/* Icon */}
                <div
                  className={`
                    flex
                    h-[66px]
                    w-[66px]
                    items-center
                    justify-center
                    rounded-[21px]
                    ${item.iconBox}
                    shadow-[0_10px_25px_rgba(15,23,42,0.07)]
                    ring-1
                    ring-white
                    transition-all
                    duration-300
                    group-hover:scale-105
                    group-hover:-rotate-2
                  `}
                >
                  <Icon
                    size={31}
                    strokeWidth={2}
                  />
                </div>

                {/* Title */}
                <p className="mt-6 text-[15px] font-semibold text-slate-500">
                  {item.title}
                </p>

                {/* Number */}
                <p className="mt-1 text-[50px] font-black leading-none tracking-[-0.04em] text-slate-900">
                  {loading
                    ? "—"
                    : value.toLocaleString()}
                </p>

                {/* Live */}
                <div className="mt-5 flex items-center gap-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-60" />
                    <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
                  </span>

                  <span className="text-xs font-semibold text-slate-400">
                    Live data
                  </span>
                </div>
              </div>

              {/* Mini decorative graph */}
              <div className="absolute bottom-5 right-5 h-[65px] w-[125px] opacity-80 transition-all duration-500 group-hover:scale-110 group-hover:opacity-100">

                <svg
                  viewBox="0 0 125 65"
                  className={`h-full w-full ${item.line}`}
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2 58 C15 58, 14 48, 25 51 C35 54, 38 42, 48 45 C58 48, 60 30, 70 36 C80 42, 83 20, 92 27 C101 34, 106 8, 123 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />

                  <path
                    d="M2 58 C15 58, 14 48, 25 51 C35 54, 38 42, 48 45 C58 48, 60 30, 70 36 C80 42, 83 20, 92 27 C101 34, 106 8, 123 12 L123 65 L2 65 Z"
                    fill="currentColor"
                    opacity="0.06"
                  />
                </svg>
              </div>

              {/* Bottom accent */}
              <div
                className="
                  absolute
                  bottom-0
                  left-0
                  h-1
                  w-0
                  rounded-r-full
                  bg-gradient-to-r
                  from-orange-400
                  to-orange-200
                  transition-all
                  duration-500
                  group-hover:w-full
                "
              />
            </div>
          );
        })}
      </div>

      {/* =====================================================
          RESTAURANT OVERVIEW
      ====================================================== */}
      <div
        className="
          relative
          overflow-hidden
          rounded-[30px]
          border
          border-white/90
          bg-white/60
          p-7
          shadow-[0_20px_55px_-20px_rgba(15,23,42,0.18)]
          backdrop-blur-2xl
        "
      >
        {/* Background glow */}
        <div className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-orange-200/20 blur-3xl" />

        <div className="relative z-10">

          {/* Overview heading */}
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <div>
              <div className="flex items-center gap-2">
                <div
                  className="
                    flex
                    h-8
                    w-8
                    items-center
                    justify-center
                    rounded-lg
                    bg-orange-100
                    text-orange-500
                  "
                >
                  <TrendingUp size={17} />
                </div>

                <h2 className="text-2xl font-bold text-slate-900">
                  Restaurant Overview
                </h2>
              </div>

              <p className="mt-2 text-sm text-slate-500">
                Live information from your restaurant database.
              </p>
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                rounded-full
                border
                border-green-100
                bg-green-50/80
                px-4
                py-2
                text-xs
                font-bold
                text-green-600
                shadow-sm
              "
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-50" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
              </span>

              Connected to database
            </div>
          </div>

          {/* Overview Cards */}
          <div className="mt-7 grid gap-4 md:grid-cols-3">

            {/* Pending */}
            <div
              className="
                group
                relative
                min-h-[145px]
                overflow-hidden
                rounded-[22px]
                border
                border-white
                bg-white/65
                p-5
                shadow-[0_10px_35px_-20px_rgba(15,23,42,0.25)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/80
              "
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-orange-100
                      text-orange-500
                    "
                  >
                    <Bell size={19} />
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Orders needing attention
                </p>

                <p className="mt-1 text-3xl font-black text-slate-900">
                  {loading ? "—" : pendingCount}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Pending orders
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-8 -right-4 opacity-[0.08] transition-transform duration-500 group-hover:scale-110">
                <Bell size={90} />
              </div>
            </div>

            {/* Delivered */}
            <div
              className="
                group
                relative
                min-h-[145px]
                overflow-hidden
                rounded-[22px]
                border
                border-white
                bg-white/65
                p-5
                shadow-[0_10px_35px_-20px_rgba(15,23,42,0.25)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/80
              "
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-green-100
                      text-green-500
                    "
                  >
                    <CheckCircle2 size={19} />
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Completed orders
                </p>

                <p className="mt-1 text-3xl font-black text-slate-900">
                  {loading ? "—" : deliveredCount}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Successfully delivered
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-8 -right-4 opacity-[0.08] text-green-500 transition-transform duration-500 group-hover:scale-110">
                <CheckCircle2 size={90} />
              </div>
            </div>

            {/* Products */}
            <div
              className="
                group
                relative
                min-h-[145px]
                overflow-hidden
                rounded-[22px]
                border
                border-white
                bg-white/65
                p-5
                shadow-[0_10px_35px_-20px_rgba(15,23,42,0.25)]
                backdrop-blur-xl
                transition-all
                duration-300
                hover:-translate-y-1
                hover:bg-white/80
              "
            >
              <div className="relative z-10">
                <div className="flex items-center justify-between">
                  <div
                    className="
                      flex
                      h-10
                      w-10
                      items-center
                      justify-center
                      rounded-xl
                      bg-blue-100
                      text-blue-500
                    "
                  >
                    <Package size={19} />
                  </div>
                </div>

                <p className="mt-4 text-sm font-medium text-slate-500">
                  Menu inventory
                </p>

                <p className="mt-1 text-3xl font-black text-slate-900">
                  {loading ? "—" : productCount}
                </p>

                <p className="mt-1 text-xs font-medium text-slate-400">
                  Products in database
                </p>
              </div>

              <div className="pointer-events-none absolute -bottom-8 -right-4 opacity-[0.08] text-blue-500 transition-transform duration-500 group-hover:scale-110">
                <Package size={90} />
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}