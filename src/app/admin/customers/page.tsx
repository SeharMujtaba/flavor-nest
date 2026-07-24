"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  Eye,
  Ban,
  UserCheck,
  Mail,
  Phone,
} from "lucide-react";

const customers = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@gmail.com",
    phone: "+92 300 1234567",
    orders: 18,
    spending: 28450,
    status: "Active",
  },
  {
    id: 2,
    name: "Fatima Khan",
    email: "fatima@gmail.com",
    phone: "+92 301 9876543",
    orders: 11,
    spending: 16200,
    status: "Blocked",
  },
  {
    id: 3,
    name: "Usman Tariq",
    email: "usman@gmail.com",
    phone: "+92 333 7654321",
    orders: 24,
    spending: 43700,
    status: "Active",
  },
];

export default function CustomersPage() {

  const [search, setSearch] = useState("");

  const filteredCustomers = useMemo(() => {

    const keyword = search.toLowerCase().trim();

    if (!keyword) return customers;

    return customers.filter((customer) =>
      customer.name.toLowerCase().includes(keyword) ||
      customer.email.toLowerCase().includes(keyword) ||
      customer.phone.toLowerCase().includes(keyword) ||
      customer.status.toLowerCase().includes(keyword)
    );

  }, [search]);

  return (

    <div className="space-y-8">

      {/* Header */}

      <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Customers
          </h1>

          <p className="mt-2 text-slate-500">
            Manage all registered customers.
          </p>

        </div>

      </div>

      {/* Search */}

      <div className="flex flex-col gap-4 md:flex-row md:items-center">

        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by Name, Email, Phone or Status..."
          className="
            w-full
            max-w-xl

            rounded-xl

            border
            border-slate-300

            bg-white

            px-5
            py-3

            shadow-sm

            outline-none

            transition

            focus:border-orange-500
            focus:ring-4
            focus:ring-orange-100
          "
        />

        <button
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

              <th className="p-5 text-left">Customer</th>
              <th className="p-5 text-left">Email</th>
              <th className="p-5 text-left">Phone</th>
              <th className="p-5 text-center">Orders</th>
              <th className="p-5 text-center">Spent</th>
              <th className="p-5 text-center">Status</th>
              <th className="p-5 text-center">Actions</th>

            </tr>

          </thead>

          <tbody>
                        {filteredCustomers.length > 0 ? (

              filteredCustomers.map((customer) => (

                <tr
                  key={customer.id}
                  className="border-t transition hover:bg-slate-50"
                >

                  {/* Customer */}

                  <td className="p-5">

                    <div className="flex items-center gap-4">

                      <div
                        className="
                          flex
                          h-14
                          w-14
                          items-center
                          justify-center

                          rounded-full

                          bg-orange-100

                          text-lg
                          font-bold

                          text-orange-600
                        "
                      >
                        {customer.name
                          .split(" ")
                          .map((word) => word[0])
                          .join("")
                          .slice(0, 2)}
                      </div>

                      <div>

                        <h3 className="font-bold text-slate-900">
                          {customer.name}
                        </h3>

                        <p className="text-sm text-slate-500">
                          Customer #{customer.id}
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

                      <span>{customer.email}</span>

                    </div>

                  </td>

                  {/* Phone */}

                  <td className="p-5">

                    <div className="flex items-center gap-2">

                      <Phone
                        size={16}
                        className="text-emerald-500"
                      />

                      <span>{customer.phone}</span>

                    </div>

                  </td>

                  {/* Orders */}

                  <td className="p-5 text-center font-semibold">
                    {customer.orders}
                  </td>

                  {/* Spending */}

                  <td className="p-5 text-center font-bold text-orange-500">
                    Rs. {customer.spending.toLocaleString()}
                  </td>

                  {/* Status */}

                  <td className="p-5 text-center">

                    {customer.status === "Active" ? (

                      <span className="rounded-full bg-green-100 px-4 py-2 text-sm font-semibold text-green-600">
                        Active
                      </span>

                    ) : (

                      <span className="rounded-full bg-red-100 px-4 py-2 text-sm font-semibold text-red-600">
                        Blocked
                      </span>

                    )}

                  </td>

                  {/* Actions */}

                  <td className="p-5">

                    <div className="flex justify-center gap-3">

                      <Link
                        href={`/admin/customers/${customer.id}`}
                        className="
                          rounded-lg
                          bg-blue-100
                          p-2
                          text-blue-600
                          transition
                          hover:bg-blue-600
                          hover:text-white
                        "
                      >
                        <Eye size={18} />
                      </Link>

                      <button
                        className="
                          rounded-lg
                          bg-red-100
                          p-2
                          text-red-600
                          transition
                          hover:bg-red-600
                          hover:text-white
                        "
                      >
                        {customer.status === "Active" ? (
                          <Ban size={18} />
                        ) : (
                          <UserCheck size={18} />
                        )}
                      </button>

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