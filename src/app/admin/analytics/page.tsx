"use client";

import { useMemo } from "react";
import {
  DollarSign,
  ShoppingBag,
  Users,
  Package,
  TrendingUp,
  CheckCircle2,
  Clock3,
  XCircle,
} from "lucide-react";

import {
  getCustomers,
  getOrders,
  getProducts,
} from "@/lib/admin-data";

function getAmount(value: string) {
  return Number(value.replace(/[^0-9]/g, ""));
}

export default function AnalyticsPage() {
  const orders = getOrders();
  const customers = getCustomers();
  const products = getProducts();

  const revenue = useMemo(() => {
    return orders
      .filter((order) => order.status !== "Cancelled")
      .reduce(
        (sum, order) => sum + getAmount(order.total),
        0
      );
  }, [orders]);

  const delivered = orders.filter(
    (order) => order.status === "Delivered"
  ).length;

  const preparing = orders.filter(
    (order) => order.status === "Preparing"
  ).length;

  const pending = orders.filter(
    (order) => order.status === "Pending"
  ).length;

  const cancelled = orders.filter(
    (order) => order.status === "Cancelled"
  ).length;

  const averageOrderValue =
    orders.length > 0
      ? Math.round(revenue / Math.max(1, orders.length - cancelled))
      : 0;

  const analyticsCards = [
    {
      title: "Revenue",
      value: `Rs. ${revenue.toLocaleString()}`,
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Total Orders",
      value: orders.length,
      icon: ShoppingBag,
      color: "bg-orange-100 text-orange-500",
    },
    {
      title: "Customers",
      value: customers.length,
      icon: Users,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Products",
      value: products.length,
      icon: Package,
      color: "bg-blue-100 text-blue-600",
    },
  ];

  const statuses = [
    {
      name: "Delivered",
      value: delivered,
      icon: CheckCircle2,
      color: "text-green-600",
      bg: "bg-green-100",
    },
    {
      name: "Preparing",
      value: preparing,
      icon: Clock3,
      color: "text-blue-600",
      bg: "bg-blue-100",
    },
    {
      name: "Pending",
      value: pending,
      icon: Clock3,
      color: "text-yellow-700",
      bg: "bg-yellow-100",
    },
    {
      name: "Cancelled",
      value: cancelled,
      icon: XCircle,
      color: "text-red-600",
      bg: "bg-red-100",
    },
  ];

  return (
    <div className="space-y-10">

      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Analytics
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor your FlavorNest business performance.
        </p>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {analyticsCards.map((card) => {
          const Icon = card.icon;

          return (
            <div
              key={card.title}
              className="rounded-2xl bg-white p-6 shadow-sm"
            >
              <div
                className={`flex h-14 w-14 items-center justify-center rounded-xl ${card.color}`}
              >
                <Icon size={26} />
              </div>

              <p className="mt-5 text-slate-500">
                {card.title}
              </p>

              <p className="mt-2 text-3xl font-extrabold text-slate-900">
                {card.value}
              </p>
            </div>
          );
        })}

      </div>

      <div className="grid gap-6 lg:grid-cols-2">

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <div className="flex items-center gap-3">
            <TrendingUp className="text-orange-500" />

            <h2 className="text-2xl font-bold">
              Business Overview
            </h2>
          </div>

          <div className="mt-8 space-y-6">

            <div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Average Order Value
                </span>

                <span className="font-bold">
                  Rs. {averageOrderValue.toLocaleString()}
                </span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div className="h-3 w-[75%] rounded-full bg-orange-500" />
              </div>
            </div>

            <div>
              <div className="flex justify-between">
                <span className="text-slate-500">
                  Delivery Success
                </span>

                <span className="font-bold">
                  {orders.length
                    ? Math.round(
                        (delivered / orders.length) * 100
                      )
                    : 0}
                  %
                </span>
              </div>

              <div className="mt-2 h-3 rounded-full bg-slate-100">
                <div
                  className="h-3 rounded-full bg-green-500"
                  style={{
                    width: `${
                      orders.length
                        ? (delivered / orders.length) * 100
                        : 0
                    }%`,
                  }}
                />
              </div>
            </div>

          </div>

        </div>

        <div className="rounded-2xl bg-white p-8 shadow-sm">

          <h2 className="text-2xl font-bold">
            Order Status
          </h2>

          <div className="mt-6 space-y-4">

            {statuses.map((status) => {
              const Icon = status.icon;

              return (
                <div
                  key={status.name}
                  className="flex items-center justify-between rounded-xl bg-slate-50 p-4"
                >
                  <div className="flex items-center gap-3">

                    <div
                      className={`flex h-10 w-10 items-center justify-center rounded-lg ${status.bg}`}
                    >
                      <Icon
                        size={20}
                        className={status.color}
                      />
                    </div>

                    <span className="font-semibold">
                      {status.name}
                    </span>

                  </div>

                  <span className="text-xl font-bold">
                    {status.value}
                  </span>
                </div>
              );
            })}

          </div>

        </div>

      </div>

    </div>
  );
}