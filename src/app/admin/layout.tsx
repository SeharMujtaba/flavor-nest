"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Users,
  Settings,
  BarChart3,
  ChefHat,
} from "lucide-react";

type AdminLayoutProps = {
  children: React.ReactNode;
};

const navigation = [
  {
    name: "Dashboard",
    href: "/admin",
    icon: LayoutDashboard,
  },
  {
    name: "Products",
    href: "/admin/products",
    icon: Package,
  },
  {
    name: "Orders",
    href: "/admin/orders",
    icon: ShoppingBag,
  },
  {
    name: "Customers",
    href: "/admin/customers",
    icon: Users,
  },
  {
    name: "Analytics",
    href: "/admin/analytics",
    icon: BarChart3,
  },
  {
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-slate-100">

      <div className="flex">

        {/* Sidebar */}

        <aside
          className="
            hidden
            w-80
            shrink-0

            border-r
            border-slate-200

            bg-white

            shadow-xl

            lg:flex
            lg:flex-col
          "
        >

          {/* Logo */}

          <div className="border-b border-slate-200 p-8">

            <div className="flex items-center gap-4">

              <div
                className="
                  flex
                  h-14
                  w-14
                  items-center
                  justify-center

                  rounded-2xl

                  bg-gradient-to-br
                  from-orange-500
                  to-red-500

                  text-white

                  shadow-lg
                "
              >
                <ChefHat size={30} />
              </div>

              <div>

                <h1 className="text-3xl font-extrabold text-slate-900">
                  FlavorNest
                </h1>

                <p className="text-sm text-slate-500">
                  Restaurant Admin
                </p>

              </div>

            </div>

          </div>

          {/* Navigation */}

          <nav className="flex-1 space-y-3 p-6">

            {navigation.map((item) => {

              const Icon = item.icon;

              const active = pathname === item.href;

              return (

                <Link
                  key={item.name}
                  href={item.href}
                  className={`
                    group
                    flex
                    items-center
                    gap-4

                    rounded-2xl

                    px-5
                    py-4

                    transition-all
                    duration-300

                    ${
                      active
                        ? "bg-orange-500 text-white shadow-lg"
                        : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                    }
                  `}
                >

                  <div
                    className={`
                      flex
                      h-11
                      w-11
                      items-center
                      justify-center

                      rounded-xl

                      transition-all

                      ${
                        active
                          ? "bg-white/20"
                          : "bg-slate-100 group-hover:bg-orange-100"
                      }
                    `}
                  >

                    <Icon size={22} />

                  </div>

                  <span className="font-semibold">
                    {item.name}
                  </span>

                </Link>

              );

            })}

          </nav>

        </aside>

        {/* Main Content */}

        <div className="flex-1">

          {/* Topbar */}

          <header
            className="
              sticky
              top-0
              z-40

              flex
              h-20
              items-center
              justify-between

              border-b
              border-slate-200

              bg-white/90

              px-10

              backdrop-blur-md
            "
          >

            <div>

              <h2 className="text-3xl font-bold text-slate-900">
                Admin Dashboard
              </h2>

              <p className="text-sm text-slate-500">
                Welcome back 👋
              </p>

            </div>

            <div
              className="
                flex
                h-12
                w-12
                items-center
                justify-center

                rounded-full

                bg-orange-500

                font-bold

                text-white
              "
            >
              A
            </div>

          </header>

          {/* Page Content */}

          <main className="p-10">
            {children}
          </main>

        </div>

      </div>

    </div>
  );
}