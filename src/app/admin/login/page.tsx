"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, ShieldCheck } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e: React.FormEvent) => {
    e.preventDefault();

    if (
      email === "admin@flavornest.com" &&
      password === "admin123"
    ) {
      localStorage.setItem("adminLoggedIn", "true");
      router.push("/admin");
      return;
    }

    alert("Invalid email or password.");
  };

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#FAFAF7] px-6 py-16">

      {/* Background */}

      <div className="absolute -left-48 top-0 h-[450px] w-[450px] rounded-full bg-orange-200/40 blur-[160px]" />
      <div className="absolute -right-48 bottom-0 h-[450px] w-[450px] rounded-full bg-yellow-200/40 blur-[160px]" />

      <div className="relative w-full max-w-6xl">

        <Link
          href="/"
          className="mb-8 inline-flex items-center gap-2 text-lg text-slate-600 hover:text-orange-500"
        >
          <ArrowLeft size={20} />
          Back to Website
        </Link>

        <div className="rounded-[32px] bg-white px-6 py-6 shadow-[0_25px_80px_rgba(15,23,42,0.10)]">

          {/* Logo */}

          <div className="flex justify-center">

            <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-orange-500 to-red-500 shadow-xl">

              <ShieldCheck
                size={44}
                className="text-white"
              />

            </div>

          </div>

          {/* Heading */}

          <div className="mt-8 text-center">

            <span className="rounded-full bg-orange-100 px-5 py-2 text-sm font-semibold text-orange-600">
              Secure Admin Access
            </span>

            <h1 className="mt-6 text-6xl font-extrabold tracking-tight text-slate-900">
              Welcome Back
            </h1>

            <p className="mx-auto mt-5 max-w-6xl text-xl leading-9 text-slate-500">
              Login to access the FlavorNest Admin Dashboard and
              manage restaurants, products, customers and orders.
            </p>

          </div>

          {/* FORM */}

          <div className="mt-16 flex justify-center">

            <div className="w-full max-w-lg">

              <form
                onSubmit={login}
                className="space-y-8"
              >

                <div>

                  <label className="mb-3 block text-base font-semibold text-slate-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    placeholder="admin@flavornest.com"
                    value={email}
                    onChange={(e) =>
                      setEmail(e.target.value)
                    }
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-6
                      text-base
                      placeholder:text-slate-400
                      outline-none
                      transition
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-100
                    "
                  />

                </div>

                <div>

                  <label className="mb-3 block text-base font-semibold text-slate-700">
                    Password
                  </label>

                  <input
                    type="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    className="
                      h-14
                      w-full
                      rounded-xl
                      border
                      border-slate-300
                      bg-white
                      px-6
                      text-base
                      placeholder:text-slate-400
                      outline-none
                      transition
                      focus:border-orange-500
                      focus:ring-4
                      focus:ring-orange-100
                    "
                  />

                </div>

                <button
                  type="submit"
                  className="
                    h-14
                    w-full
                    rounded-xl
                    bg-gradient-to-r
                    from-orange-500
                    to-orange-600
                    text-lg
                    font-bold
                    text-white
                    shadow-lg
                    transition
                    duration-300
                    hover:-translate-y-1
                    hover:shadow-xl
                  "
                >
                  Login to Dashboard
                </button>

              </form>

              {/* Demo */}

              <div className="mt-10 rounded-2xl border border-orange-200 bg-orange-50 p-6">

                <h3 className="text-lg font-bold text-orange-600">
                  Demo Credentials
                </h3>

                <div className="mt-4 space-y-2 text-slate-700">

                  <p>
                    <strong>Email:</strong> admin@flavornest.com
                  </p>

                  <p>
                    <strong>Password:</strong> admin123
                  </p>

                </div>

              </div>

            </div>

          </div>

        </div>

      </div>

    </main>
  );
}