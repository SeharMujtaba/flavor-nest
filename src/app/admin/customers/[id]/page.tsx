import Link from "next/link";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  ShoppingBag,
  DollarSign,
  Calendar,
  User,
} from "lucide-react";

export default function CustomerDetailsPage() {
  return (
    <main className="space-y-8">

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <Link
            href="/admin/customers"
            className="
              inline-flex
              items-center
              gap-2

              rounded-xl

              border
              border-slate-200

              bg-white

              px-5
              py-3

              font-medium

              transition

              hover:border-orange-400
              hover:text-orange-500
            "
          >
            <ArrowLeft size={18} />
            Back to Customers
          </Link>

          <h1 className="mt-6 text-4xl font-extrabold text-slate-900">
            Customer Profile
          </h1>

          <p className="mt-2 text-slate-500">
            View complete customer information.
          </p>

        </div>

      </div>

      {/* Profile Card */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="flex flex-col gap-8 lg:flex-row">

          {/* Avatar */}

          <div
            className="
              flex
              h-32
              w-32
              items-center
              justify-center

              rounded-full

              bg-orange-100

              text-5xl
              font-bold

              text-orange-600
            "
          >
            AA
          </div>

          {/* Info */}

          <div className="flex-1">

            <h2 className="text-3xl font-bold text-slate-900">
              Ahmed Ali
            </h2>

            <p className="mt-2 text-slate-500">
              Customer since Jan 2024
            </p>

            <div className="mt-8 grid gap-6 md:grid-cols-2">

              <div className="flex items-center gap-3">
                <Mail className="text-orange-500" />
                <span>ahmed@gmail.com</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="text-green-500" />
                <span>+92 300 1234567</span>
              </div>

              <div className="flex items-center gap-3">
                <MapPin className="text-red-500" />
                <span>Lahore, Pakistan</span>
              </div>

              <div className="flex items-center gap-3">
                <User className="text-blue-500" />
                <span>Active Customer</span>
              </div>

            </div>

          </div>

        </div>

      </div>

      {/* Statistics */}

      <div className="grid gap-6 md:grid-cols-3">

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <ShoppingBag
            className="text-orange-500"
            size={32}
          />

          <h3 className="mt-5 text-3xl font-bold">
            18
          </h3>

          <p className="text-slate-500">
            Total Orders
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <DollarSign
            className="text-green-500"
            size={32}
          />

          <h3 className="mt-5 text-3xl font-bold">
            Rs. 28,450
          </h3>

          <p className="text-slate-500">
            Total Spending
          </p>

        </div>

        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Calendar
            className="text-blue-500"
            size={32}
          />

          <h3 className="mt-5 text-3xl font-bold">
            Jan 2024
          </h3>

          <p className="text-slate-500">
            Joined On
          </p>

        </div>

      </div>

      {/* Recent Orders */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold text-slate-900">
          Recent Orders
        </h2>

        <div className="mt-8 space-y-4">

          {[
            {
              id: "#ORD-1001",
              restaurant: "Burger House",
              amount: "Rs. 899",
              status: "Delivered",
            },
            {
              id: "#ORD-1002",
              restaurant: "Pizza Hub",
              amount: "Rs. 1599",
              status: "Delivered",
            },
            {
              id: "#ORD-1003",
              restaurant: "Chinese Wok",
              amount: "Rs. 799",
              status: "Preparing",
            },
          ].map((order) => (
            <div
              key={order.id}
              className="
                flex
                flex-col
                gap-4

                rounded-xl

                border
                border-slate-200

                p-5

                md:flex-row
                md:items-center
                md:justify-between
              "
            >
              <div>

                <h3 className="font-bold">
                  {order.id}
                </h3>

                <p className="text-slate-500">
                  {order.restaurant}
                </p>

              </div>

              <div className="font-semibold text-orange-500">
                {order.amount}
              </div>

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
                      : "bg-yellow-100 text-yellow-700"
                  }
                `}
              >
                {order.status}
              </span>

            </div>
          ))}

        </div>

      </div>

    </main>
  );
}