import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import { Toaster } from "react-hot-toast";

import "./globals.css";

import { CartProvider } from "@/context/CartContext";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "FlavorNest",
  description: "Premium Restaurant Ordering Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      data-scroll-behavior="smooth"
      suppressHydrationWarning
    >
      <body
        className={`${inter.variable} ${poppins.variable} antialiased bg-[#FAFAF7] text-slate-900`}
      >
        <CartProvider>
          {/* Toast Notifications */}
          <Toaster
            position="top-right"
            reverseOrder={false}
            toastOptions={{
              duration: 2000,
              style: {
                background: "#16a34a",
                color: "#ffffff",
                borderRadius: "12px",
                padding: "14px 18px",
                fontWeight: "600",
                fontSize: "15px",
              },
              success: {
                iconTheme: {
                  primary: "#ffffff",
                  secondary: "#16a34a",
                },
              },
            }}
          />

          {children}
        </CartProvider>
      </body>
    </html>
  );
}