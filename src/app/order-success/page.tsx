/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  CheckCircle2,
  Home,
  ShoppingBag,
  Truck,
} from "lucide-react";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "https://flavor-nest-403w.onrender.com";

type OrderStatus =
  | "Pending"
  | "Preparing"
  | "Out for Delivery"
  | "Delivered"
  | "Cancelled";

interface Order {
  _id: string;

  customer?: {
    name?: string;
    email?: string;
    phone?: string;
  };

  customerName?: string;
  customerEmail?: string;
  customerPhone?: string;

  restaurant?: string;

  items: {
    product?: string;
    name: string;
    quantity: number;
    price: number;
    image?: string;
  }[];

  totalAmount: number;
  deliveryAddress: string;

  paymentMethod:
    | "Cash on Delivery"
    | "Credit / Debit Card"
    | "JazzCash / EasyPaisa";

  status: OrderStatus;

  createdAt?: string;
}

interface OrderResponse {
  success?: boolean;
  message?: string;
  order?: Order;
}

function formatDate(date?: string) {
  if (!date) return "—";

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "—";
  }

  return parsedDate.toLocaleString("en-PK", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  });
}

export default function OrderSuccessPage() {
  const router = useRouter();

  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(async (id: string) => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/api/orders/${encodeURIComponent(id)}`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data: OrderResponse = await response
        .json()
        .catch(() => ({}));

      if (!response.ok) {
        throw new Error(
          data.message || "Unable to retrieve your order."
        );
      }

      if (!data.order?._id) {
        throw new Error(
          "Order details could not be found."
        );
      }

      setOrder(data.order);

      /*
       * Keep the REAL MongoDB order ID.
       * Track Order uses this same ID.
       */
      sessionStorage.setItem(
        "lastOrderId",
        data.order._id
      );

      localStorage.setItem(
        "lastOrderId",
        data.order._id
      );
    } catch (err) {
      console.error("ORDER SUCCESS ERROR:", err);

      setError(
        err instanceof Error
          ? err.message
          : "Unable to load your order."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const savedOrderId =
      sessionStorage.getItem("lastOrderId") ||
      localStorage.getItem("lastOrderId") ||
      "";

    if (!savedOrderId) {
      setLoading(false);

      setError(
        "No recent order was found. Please place an order first."
      );

      return;
    }

    void fetchOrder(savedOrderId);
  }, [fetchOrder]);

  /* =========================================
     LOADING
  ========================================= */

  if (loading) {
    return (
      <div className="loading-page">
        <div className="loading-card">
          <div className="loading-icon">
            <ShoppingBag size={28} />
          </div>

          <h2>Confirming Your Order</h2>

          <p>
            Please wait while we load your order
            confirmation.
          </p>

          <div className="loading-line">
            <div />
          </div>
        </div>

        <style jsx>{`
          .loading-page {
            min-height: 100vh;
            background: #f8f7f5;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 24px;

            font-family:
              Arial,
              Helvetica,
              sans-serif;
          }

          .loading-card {
            width: 100%;
            max-width: 400px;

            padding: 38px 30px;

            background: #ffffff;

            border: 1px solid #ece8e4;
            border-radius: 24px;

            text-align: center;

            box-shadow:
              0 20px 55px rgba(25, 25, 25, 0.08);
          }

          .loading-icon {
            width: 62px;
            height: 62px;

            margin: 0 auto 18px;

            border-radius: 18px;

            background: #fff0e6;

            color: #ff5a00;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .loading-card h2 {
            margin: 0 0 8px;

            color: #172033;

            font-size: 22px;
          }

          .loading-card p {
            margin: 0;

            color: #8a95a4;

            font-size: 13px;

            line-height: 1.6;
          }

          .loading-line {
            height: 5px;

            margin-top: 22px;

            background: #f0f1f3;

            border-radius: 20px;

            overflow: hidden;
          }

          .loading-line div {
            width: 45%;
            height: 100%;

            background: #ff5a00;

            border-radius: 20px;

            animation: loading 1.2s infinite ease-in-out;
          }

          @keyframes loading {
            0% {
              transform: translateX(-130%);
            }

            100% {
              transform: translateX(270%);
            }
          }
        `}</style>
      </div>
    );
  }

  /* =========================================
     ERROR
  ========================================= */

  if (error || !order) {
    return (
      <div className="error-page">
        <div className="error-card">
          <div className="error-icon">
            <ShoppingBag size={29} />
          </div>

          <span>ORDER CONFIRMATION</span>

          <h1>Order Details Unavailable</h1>

          <p>
            {error ||
              "We couldn't load your order details right now."}
          </p>

          <button
            onClick={() => router.push("/")}
            className="home-button"
          >
            <Home size={17} />
            Back to Home
          </button>
        </div>

        <style jsx>{`
          .error-page {
            min-height: 100vh;

            background: #f8f7f5;

            display: flex;
            align-items: center;
            justify-content: center;

            padding: 24px;
          }

          .error-card {
            width: 100%;
            max-width: 460px;

            padding: 42px 30px;

            background: #ffffff;

            border: 1px solid #ece8e4;

            border-radius: 24px;

            text-align: center;

            box-shadow:
              0 20px 55px rgba(25, 25, 25, 0.08);
          }

          .error-icon {
            width: 66px;
            height: 66px;

            margin: 0 auto 18px;

            border-radius: 19px;

            background: #fff0e6;

            color: #ff5a00;

            display: flex;
            align-items: center;
            justify-content: center;
          }

          .error-card > span {
            color: #ff5a00;

            font-size: 9px;

            font-weight: 900;

            letter-spacing: 3px;
          }

          .error-card h1 {
            margin: 9px 0 10px;

            color: #172033;

            font-size: 27px;
          }

          .error-card p {
            margin: 0 auto 24px;

            color: #8792a1;

            font-size: 13px;

            line-height: 1.6;
          }

          .home-button {
            border: 0;

            border-radius: 12px;

            padding: 13px 21px;

            background: #ff5a00;

            color: white;

            font-size: 13px;

            font-weight: 800;

            cursor: pointer;

            display: inline-flex;
            align-items: center;

            gap: 8px;
          }
        `}</style>
      </div>
    );
  }

  const customerName =
    order.customerName ||
    order.customer?.name ||
    "Customer";

  const shortOrderId = order._id
    .slice(-6)
    .toUpperCase();

  return (
    <div className="page">

      {/* =====================================
          TOP NAVIGATION
      ===================================== */}

      <header className="top-nav">

        <button
          className="back-home"
          onClick={() => router.push("/")}
        >
          <Home size={17} />
          Back to Home
        </button>

        <div className="brand">
          <ShoppingBag size={18} />
          FlavorNest
        </div>

      </header>

      {/* =====================================
          MAIN SUCCESS CARD
      ===================================== */}

      <main className="success-card">

        {/* Decorative circles */}

        <div className="circle circle-one" />
        <div className="circle circle-two" />
        <div className="circle circle-three" />

        <div className="success-content">

          {/* Success icon */}

          <div className="success-icon">

            <Check
              size={35}
              strokeWidth={3}
            />

          </div>

          {/* Small heading */}

          <div className="eyebrow">
            ORDER SUCCESSFULLY PLACED
          </div>

          {/* Main heading */}

          <h1>
            Your Order Is
            <br />
            <span>On Its Way!</span>
          </h1>

          {/* Message */}

          <p className="success-message">
            Thank you, {customerName}! Your order has
            been successfully placed and the restaurant
            has received it.
          </p>

          {/* =================================
              ORDER REFERENCE
          ================================= */}

          <div className="reference-card">

            <span>ORDER REFERENCE</span>

            <strong>
              #{shortOrderId}
            </strong>

            <small>
              Placed on {formatDate(order.createdAt)}
            </small>

          </div>

          {/* =================================
              SIMPLE CONFIRMATION MESSAGE
          ================================= */}

          <div className="confirmation-note">

            <div className="note-icon">
              <CheckCircle2 size={18} />
            </div>

            <div>
              <strong>
                Order received successfully
              </strong>

              <p>
                Your restaurant has received your order
                and will start preparing it shortly.
              </p>
            </div>

          </div>

        </div>

      </main>

      {/* =====================================
          ACTIONS
      ===================================== */}

      <section className="actions">

        <button
          className="track-button"
          onClick={() =>
            router.push("/track-order")
          }
        >
          <Truck size={18} />

          Track My Order

          <ArrowRight size={17} />
        </button>

        <button
          className="continue-button"
          onClick={() => router.push("/")}
        >
          <ShoppingBag size={18} />

          Continue Shopping

        </button>

      </section>

      {/* =====================================
          FOOTER
      ===================================== */}

      <footer>

        <div className="footer-brand">
          <ShoppingBag size={15} />
          FlavorNest
        </div>

        <span>
          Fresh food • Fast delivery • Happy customers
        </span>

      </footer>

      <style jsx>{`

        * {
          box-sizing: border-box;
        }

        .page {
          min-height: 100vh;

          background: #f8f7f5;

          padding:
            18px
            24px
            32px;

          color: #172033;

          font-family:
            Arial,
            Helvetica,
            sans-serif;
        }

        /* =====================================
           NAVIGATION
        ===================================== */

        .top-nav {
          width: 100%;
          max-width: 1120px;

          margin:
            0 auto
            17px;

          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .back-home {
          border: 0;

          background: transparent;

          color: #304058;

          padding: 7px 0;

          font-size: 14px;
          font-weight: 700;

          cursor: pointer;

          display: flex;
          align-items: center;

          gap: 7px;

          transition: 0.2s ease;
        }

        .back-home:hover {
          color: #ff5a00;
        }

        .brand {
          color: #ff5a00;

          font-size: 15px;
          font-weight: 900;

          display: flex;
          align-items: center;

          gap: 7px;
        }

        /* =====================================
           SUCCESS CARD
        ===================================== */

        .success-card {
          width: 100%;
          max-width: 1120px;

          min-height: 430px;

          margin: 0 auto;

          position: relative;

          overflow: hidden;

          border-radius: 28px;

          background:
            linear-gradient(
              135deg,
              #ff5700 0%,
              #ff6505 50%,
              #ff7920 100%
            );

          box-shadow:
            0 22px 55px
            rgba(255, 90, 0, 0.17);

          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* =====================================
           DECORATION
        ===================================== */

        .circle {
          position: absolute;

          border-radius: 50%;

          pointer-events: none;

          border:
            1px solid
            rgba(255, 255, 255, 0.13);
        }

        .circle-one {
          width: 310px;
          height: 310px;

          left: -160px;
          top: -185px;

          box-shadow:
            0 0 0 35px
            rgba(255, 255, 255, 0.035),

            0 0 0 70px
            rgba(255, 255, 255, 0.025);
        }

        .circle-two {
          width: 340px;
          height: 340px;

          right: -185px;
          bottom: -230px;

          background:
            rgba(255, 255, 255, 0.025);
        }

        .circle-three {
          width: 100px;
          height: 100px;

          right: 18%;
          top: 16%;

          border-color:
            rgba(255, 255, 255, 0.08);
        }

        /* =====================================
           CONTENT
        ===================================== */

        .success-content {
          position: relative;

          z-index: 2;

          width: 100%;

          max-width: 730px;

          padding:
            35px 20px;

          text-align: center;

          color: white;
        }

        /* =====================================
           ICON
        ===================================== */

        .success-icon {
          width: 72px;
          height: 72px;

          margin:
            0 auto
            18px;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.13);

          border:
            3px solid white;

          display: flex;
          align-items: center;
          justify-content: center;

          box-shadow:
            0 0 0 9px
            rgba(255, 255, 255, 0.05),

            0 0 0 18px
            rgba(255, 255, 255, 0.025);
        }

        /* =====================================
           EYEBROW
        ===================================== */

        .eyebrow {
          font-size: 10px;

          font-weight: 900;

          letter-spacing: 4px;

          margin-bottom: 8px;
        }

        /* =====================================
           HEADING
        ===================================== */

        .success-content h1 {
          margin: 0;

          font-size:
            clamp(
              42px,
              5vw,
              56px
            );

          line-height: 1.02;

          letter-spacing: -1.5px;

          font-weight: 900;
        }

        .success-content h1 span {
          color: #fff4e8;
        }

        /* =====================================
           MESSAGE
        ===================================== */

        .success-message {
          max-width: 650px;

          margin:
            15px auto
            19px;

          font-size: 14px;

          line-height: 1.6;

          color: rgba(255, 255, 255, 0.96);
        }

        /* =====================================
           REFERENCE CARD
        ===================================== */

        .reference-card {
          width: 245px;

          margin: 0 auto;

          padding:
            11px
            17px;

          border-radius: 16px;

          background:
            rgba(255, 255, 255, 0.12);

          border:
            1px solid
            rgba(255, 255, 255, 0.23);

          backdrop-filter: blur(9px);
        }

        .reference-card span {
          display: block;

          font-size: 8px;

          font-weight: 900;

          letter-spacing: 2.7px;

          opacity: 0.84;

          margin-bottom: 2px;
        }

        .reference-card strong {
          display: block;

          font-size: 25px;

          letter-spacing: 1px;

          line-height: 1.15;
        }

        .reference-card small {
          display: block;

          margin-top: 3px;

          font-size: 9px;

          opacity: 0.82;
        }

        /* =====================================
           CONFIRMATION NOTE
        ===================================== */

        .confirmation-note {
          width: 100%;

          max-width: 490px;

          margin:
            17px auto
            0;

          padding:
            11px 14px;

          border-radius: 14px;

          background:
            rgba(255, 255, 255, 0.10);

          border:
            1px solid
            rgba(255, 255, 255, 0.16);

          display: flex;

          align-items: center;

          text-align: left;

          gap: 10px;
        }

        .note-icon {
          width: 34px;
          height: 34px;

          flex: 0 0 auto;

          border-radius: 50%;

          background:
            rgba(255, 255, 255, 0.16);

          display: flex;

          align-items: center;
          justify-content: center;
        }

        .confirmation-note strong {
          display: block;

          font-size: 11px;

          margin-bottom: 2px;
        }

        .confirmation-note p {
          margin: 0;

          font-size: 9px;

          line-height: 1.5;

          opacity: 0.84;
        }

        /* =====================================
           ACTION BUTTONS
        ===================================== */

        .actions {
          width: 100%;
          max-width: 1120px;

          margin:
            18px auto
            0;

          display: grid;

          grid-template-columns:
            1.1fr
            1fr;

          gap: 13px;
        }

        .track-button,
        .continue-button {
          min-height: 50px;

          border-radius: 14px;

          padding:
            0 18px;

          display: flex;

          align-items: center;
          justify-content: center;

          gap: 8px;

          font-size: 13px;

          font-weight: 800;

          cursor: pointer;

          transition:
            transform 0.2s ease,
            box-shadow 0.2s ease,
            background 0.2s ease;
        }

        .track-button {
          border:
            1px solid
            #ff5a00;

          background: #ff5a00;

          color: white;

          box-shadow:
            0 8px 20px
            rgba(255, 90, 0, 0.16);
        }

        .track-button:hover {
          background: #e95100;

          transform: translateY(-2px);

          box-shadow:
            0 12px 25px
            rgba(255, 90, 0, 0.20);
        }

        .continue-button {
          border:
            1px solid
            #e0e4e8;

          background: white;

          color: #26354d;
        }

        .continue-button:hover {
          color: #ff5a00;

          border-color: #ffc2a2;

          transform: translateY(-2px);
        }

        /* =====================================
           FOOTER
        ===================================== */

        footer {
          width: 100%;
          max-width: 1120px;

          margin:
            20px auto
            0;

          padding:
            14px 3px
            0;

          border-top:
            1px solid
            #e4e6e8;

          display: flex;

          align-items: center;
          justify-content: space-between;

          color: #8993a1;

          font-size: 9px;
        }

        .footer-brand {
          color: #ff5a00;

          font-weight: 900;

          display: flex;

          align-items: center;

          gap: 6px;
        }

        /* =====================================
           TABLET
        ===================================== */

        @media (max-width: 700px) {

          .success-card {
            min-height: 450px;

            border-radius: 23px;
          }

          .success-content {
            padding:
              30px 17px;
          }

          .success-content h1 {
            font-size: 39px;
          }

          .actions {
            grid-template-columns: 1fr;
          }

          footer {
            gap: 8px;
          }
        }

        /* =====================================
           MOBILE
        ===================================== */

        @media (max-width: 500px) {

          .page {
            padding:
              12px
              12px
              25px;
          }

          .top-nav {
            margin-bottom: 12px;
          }

          .back-home {
            font-size: 12px;
          }

          .brand {
            font-size: 13px;
          }

          .success-card {
            min-height: 445px;

            border-radius: 21px;
          }

          .success-content {
            padding:
              27px 14px;
          }

          .success-icon {
            width: 64px;
            height: 64px;

            margin-bottom: 16px;
          }

          .success-icon svg {
            width: 30px;
            height: 30px;
          }

          .eyebrow {
            font-size: 8px;

            letter-spacing: 2.8px;
          }

          .success-content h1 {
            font-size: 34px;

            letter-spacing: -1px;
          }

          .success-message {
            font-size: 12px;

            margin-top: 13px;
            margin-bottom: 17px;
          }

          .reference-card {
            width: 220px;
          }

          .confirmation-note {
            max-width: 330px;

            padding:
              10px 11px;
          }

          .confirmation-note p {
            font-size: 8px;
          }

          .confirmation-note strong {
            font-size: 10px;
          }

          footer {
            flex-direction: column;

            text-align: center;

            padding-top: 12px;
          }
        }

      `}</style>
    </div>
  );
}