import {
  DollarSign,
  ShoppingBag,
  Users,
  TrendingUp,
  Star,
  ArrowUpRight,
} from "lucide-react";

export default function AnalyticsPage() {
  const stats = [
    {
      title: "Total Revenue",
      value: "Rs. 845,250",
      icon: DollarSign,
      color: "bg-green-100 text-green-600",
      growth: "+18%",
    },
    {
      title: "Total Orders",
      value: "1,245",
      icon: ShoppingBag,
      color: "bg-orange-100 text-orange-600",
      growth: "+12%",
    },
    {
      title: "Customers",
      value: "532",
      icon: Users,
      color: "bg-blue-100 text-blue-600",
      growth: "+9%",
    },
    {
      title: "Restaurant Rating",
      value: "4.9",
      icon: Star,
      color: "bg-yellow-100 text-yellow-500",
      growth: "+0.2",
    },
  ];

  const topFoods = [
    {
      name: "Classic Cheeseburger",
      orders: 186,
      revenue: "Rs. 167,214",
    },
    {
      name: "Chicken Biryani",
      orders: 172,
      revenue: "Rs. 120,228",
    },
    {
      name: "Pepperoni Pizza",
      orders: 155,
      revenue: "Rs. 263,345",
    },
    {
      name: "Chicken Karahi",
      orders: 148,
      revenue: "Rs. 221,852",
    },
  ];

  return (
    <main className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-extrabold text-slate-900">
          Analytics Dashboard
        </h1>

        <p className="mt-2 text-slate-500">
          Monitor your restaurant performance.
        </p>

      </div>

      {/* Cards */}

      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">

        {stats.map((item) => {

          const Icon = item.icon;

          return (
            <div
              key={item.title}
              className="
                rounded-3xl
                bg-white
                p-6
                shadow-sm
                transition
                hover:-translate-y-1
                hover:shadow-xl
              "
            >

              <div className="flex items-center justify-between">

                <div>

                  <p className="text-sm text-slate-500">
                    {item.title}
                  </p>

                  <h2 className="mt-3 text-3xl font-bold">
                    {item.value}
                  </h2>

                </div>

                <div
                  className={`rounded-2xl p-4 ${item.color}`}
                >
                  <Icon size={28} />
                </div>

              </div>

              <div className="mt-6 flex items-center gap-2 text-green-600">

                <ArrowUpRight size={18} />

                <span className="font-semibold">
                  {item.growth}
                </span>

                <span className="text-slate-500">
                  this month
                </span>

              </div>

            </div>
          );

        })}

      </div>

      {/* Revenue Chart Placeholder */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold">
          Revenue Overview
        </h2>

        <div
          className="
            mt-8
            flex
            h-80
            items-center
            justify-center

            rounded-2xl

            border-2
            border-dashed
            border-slate-300

            bg-slate-50
          "
        >

          <div className="text-center">

            <TrendingUp
              size={60}
              className="mx-auto text-orange-500"
            />

            <h3 className="mt-6 text-2xl font-bold">
              Revenue Chart
            </h3>

            <p className="mt-2 text-slate-500">
              Recharts / Chart.js will be integrated later.
            </p>

          </div>

        </div>

      </div>

      {/* Top Selling */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <h2 className="text-2xl font-bold">
          Top Selling Foods
        </h2>

        <div className="mt-8 space-y-4">

          {topFoods.map((food, index) => (

            <div
              key={food.name}
              className="
                flex
                items-center
                justify-between

                rounded-2xl

                border
                border-slate-200

                p-5

                transition

                hover:border-orange-300
              "
            >

              <div className="flex items-center gap-5">

                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center

                    rounded-full

                    bg-orange-100

                    font-bold

                    text-orange-500
                  "
                >
                  #{index + 1}
                </div>

                <div>

                  <h3 className="font-bold">
                    {food.name}
                  </h3>

                  <p className="text-sm text-slate-500">
                    {food.orders} Orders
                  </p>

                </div>

              </div>

              <div className="text-right">

                <p className="font-bold text-green-600">
                  {food.revenue}
                </p>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}