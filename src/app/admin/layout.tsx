/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import {
  LayoutDashboard,
  Package,
  ShoppingBag,
  Settings,
  ChefHat,
  LogOut,
  Menu,
  X,
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
    name: "Settings",
    href: "/admin/settings",
    icon: Settings,
  },
];

export default function AdminLayout({
  children,
}: AdminLayoutProps) {
  const pathname = usePathname();
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [mobileOpen, setMobileOpen] = useState(false);

  const isLoginPage = pathname === "/admin/login";

  useEffect(() => {
    // Login page should always be accessible.
    if (isLoginPage) {
      setLoading(false);
      return;
    }

    const token =
      localStorage.getItem("adminToken") ||
      localStorage.getItem("token");

    if (!token) {
      router.replace("/admin/login");
      return;
    }

    setLoading(false);
  }, [isLoginPage, router]);

  const logout = () => {
    localStorage.removeItem("adminToken");
    localStorage.removeItem("token");
    localStorage.removeItem("adminUser");
    localStorage.removeItem("adminLoggedIn");

    setMobileOpen(false);

    router.replace("/admin/login");
  };

  /*
   * IMPORTANT:
   * Do not render the dashboard layout on the login page.
   */
  if (isLoginPage) {
    return <>{children}</>;
  }

  /*
   * While checking localStorage token,
   * don't briefly show the admin dashboard.
   */
  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-slate-50">
        <div className="text-center">
          <div className="mx-auto h-12 w-12 animate-spin rounded-full border-4 border-orange-200 border-t-orange-500" />

          <p className="mt-4 font-semibold text-slate-600">
            Checking admin authentication...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* =====================================================
          DESKTOP SIDEBAR
      ====================================================== */}

      <aside className="hidden min-h-screen w-80 shrink-0 border-r border-slate-200 bg-white shadow-xl lg:flex lg:flex-col">
        {/* Logo */}

        <div className="border-b border-slate-200 p-8">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-red-500 text-white shadow-lg">
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

            const active =
              pathname === item.href ||
              pathname.startsWith(`${item.href}/`);

            return (
              <Link
                key={item.name}
                href={item.href}
                className={`group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 ${
                  active
                    ? "bg-orange-500 text-white shadow-lg"
                    : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                }`}
              >
                <div
                  className={`flex h-11 w-11 items-center justify-center rounded-xl ${
                    active
                      ? "bg-white/20"
                      : "bg-slate-100 group-hover:bg-orange-100"
                  }`}
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

        {/* Logout */}

        <div className="border-t border-slate-200 p-6">
          <button
            type="button"
            onClick={logout}
            className="flex w-full items-center justify-center gap-3 rounded-2xl bg-red-50 px-5 py-4 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>

      {/* =====================================================
          MOBILE SIDEBAR
      ====================================================== */}

      {mobileOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          {/* Overlay */}

          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setMobileOpen(false)}
            className="absolute inset-0 h-full w-full bg-black/40"
          />

          {/* Sidebar */}

          <aside className="relative h-full w-80 bg-white p-6 shadow-2xl">
            {/* Header */}

            <div className="flex items-center justify-between border-b border-slate-200 pb-6">
              <div className="flex items-center gap-3">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-orange-500 text-white">
                  <ChefHat size={24} />
                </div>

                <div>
                  <h2 className="text-xl font-bold text-slate-900">
                    FlavorNest
                  </h2>

                  <p className="text-xs text-slate-500">
                    Restaurant Admin
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
              >
                <X size={22} />
              </button>
            </div>

            {/* Mobile Navigation */}

            <nav className="mt-6 space-y-2">
              {navigation.map((item) => {
                const Icon = item.icon;

                const active =
                  pathname === item.href ||
                  pathname.startsWith(
                    `${item.href}/`
                  );

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setMobileOpen(false)}
                    className={`flex items-center gap-3 rounded-xl px-4 py-3 font-semibold transition ${
                      active
                        ? "bg-orange-500 text-white"
                        : "text-slate-600 hover:bg-orange-50 hover:text-orange-500"
                    }`}
                  >
                    <Icon size={20} />

                    {item.name}
                  </Link>
                );
              })}
            </nav>

            {/* Mobile Logout */}

            <button
              type="button"
              onClick={logout}
              className="mt-8 flex w-full items-center justify-center gap-2 rounded-xl bg-red-50 py-3 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white"
            >
              <LogOut size={18} />
              Logout
            </button>
          </aside>
        </div>
      )}

      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <div className="min-w-0 flex-1">
        {/* Header */}

        <header className="sticky top-0 z-40 flex min-h-20 items-center justify-between border-b border-slate-200 bg-white/90 px-5 backdrop-blur-md md:px-10">
          {/* Left */}

          <div className="flex items-center gap-4">
            {/* Mobile menu button */}

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className="rounded-xl bg-orange-50 p-3 text-orange-500 transition hover:bg-orange-100 lg:hidden"
              aria-label="Open menu"
            >
              <Menu size={22} />
            </button>

            <div>
              <h2 className="text-xl font-bold text-slate-900 md:text-3xl">
                Admin Dashboard
              </h2>

              <p className="hidden text-sm text-slate-500 sm:block">
                Welcome back 👋
              </p>
            </div>
          </div>

          {/* Right */}

          <div className="flex items-center gap-3">
            {/* Admin Avatar */}

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-orange-500 font-bold text-white">
              A
            </div>

            {/* Desktop Logout */}

            <button
              type="button"
              onClick={logout}
              className="hidden items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 py-2 font-semibold text-red-600 transition hover:bg-red-500 hover:text-white sm:flex"
            >
              <LogOut size={18} />
              Logout
            </button>
          </div>
        </header>

        {/* Page */}

        <main className="p-5 md:p-10">
          {children}
        </main>
      </div>
    </div>
  );
}