import {
  DollarSign,
  ShoppingBag,
  Package,
  Users,
} from "lucide-react";

const stats = [
  {
    title: "Total Revenue",
    value: "Rs. 245,800",
    icon: DollarSign,
    color: "bg-green-100 text-green-600",
  },
  {
    title: "Total Orders",
    value: "1,245",
    icon: ShoppingBag,
    color: "bg-orange-100 text-orange-500",
  },
  {
    title: "Products",
    value: "86",
    icon: Package,
    color: "bg-blue-100 text-blue-600",
  },
  {
    title: "Customers",
    value: "542",
    icon: Users,
    color: "bg-purple-100 text-purple-600",
  },
];

export default function AdminDashboard() {
  return (
    <div className="space-y-10">

      {/* Heading */}

      <div>
        <h1 className="text-4xl font-extrabold text-slate-900">
          Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Welcome back! Here&apos;s what&apos;s happening today.
        </p>
      </div>

      {/* Statistics */}

      <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {
          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-2xl
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-xl
              "
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
                {item.value}
              </p>
            </div>
          );
        })}

      </div>

      {/* Recent Orders */}

      <div className="rounded-2xl bg-white shadow-sm">

        <div className="border-b border-slate-200 p-6">
          <h2 className="text-2xl font-bold">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">

          <table className="w-full">

            <thead>

              <tr className="border-b border-slate-200 text-left">

                <th className="p-5">Order</th>
                <th className="p-5">Customer</th>
                <th className="p-5">Status</th>
                <th className="p-5">Total</th>

              </tr>

            </thead>

            <tbody>

              <tr className="border-b">

                <td className="p-5 font-semibold">
                  #1001
                </td>

                <td className="p-5">
                  Ahmed Ali
                </td>

                <td className="p-5">

                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-semibold text-green-600">
                    Delivered
                  </span>

                </td>

                <td className="p-5 font-bold">
                  Rs. 2,450
                </td>

              </tr>

              <tr className="border-b">

                <td className="p-5 font-semibold">
                  #1002
                </td>

                <td className="p-5">
                  Sara Khan
                </td>

                <td className="p-5">

                  <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-700">
                    Preparing
                  </span>

                </td>

                <td className="p-5 font-bold">
                  Rs. 1,850
                </td>

              </tr>

              <tr>

                <td className="p-5 font-semibold">
                  #1003
                </td>

                <td className="p-5">
                  Hamza
                </td>

                <td className="p-5">

                  <span className="rounded-full bg-orange-100 px-3 py-1 text-sm font-semibold text-orange-600">
                    Pending
                  </span>

                </td>

                <td className="p-5 font-bold">
                  Rs. 950
                </td>

              </tr>

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}