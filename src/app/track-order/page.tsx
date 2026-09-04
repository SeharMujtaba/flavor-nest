/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/set-state-in-effect */
"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Clock3,
  Home,
  MapPin,
  Package,
  Phone,
  RefreshCw,
  ShoppingBag,
  Truck,
  User,
  WalletCards,
  XCircle,
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

interface OrderItem {
  product?: string;
  name: string;
  quantity: number;
  price: number;
  image?: string;
}

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
  items: OrderItem[];
  totalAmount: number;
  deliveryAddress: string;
  paymentMethod:
    | "Cash on Delivery"
    | "Credit / Debit Card"
    | "JazzCash / EasyPaisa";
  status: OrderStatus;
  createdAt?: string;
  updatedAt?: string;
}

interface OrderResponse {
  success?: boolean;
  message?: string;
  order?: Order;
}

const statusSteps: {
  status: OrderStatus;
  title: string;
  description: string;
  icon: React.ElementType;
}[] = [
  {
    status: "Pending",
    title: "Order Confirmed",
    description: "Your order has been received successfully.",
    icon: CheckCircle2,
  },
  {
    status: "Preparing",
    title: "Preparing Your Meal",
    description: "The restaurant is preparing your food.",
    icon: Package,
  },
  {
    status: "Out for Delivery",
    title: "Out for Delivery",
    description: "Your order is on its way to you.",
    icon: Truck,
  },
  {
    status: "Delivered",
    title: "Delivered",
    description: "Your order has reached its destination.",
    icon: Check,
  },
];

const statusOrder: OrderStatus[] = [
  "Pending",
  "Preparing",
  "Out for Delivery",
  "Delivered",
];

function formatCurrency(amount: number) {
  return `Rs. ${amount.toLocaleString("en-PK")}`;
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

function getStatusIndex(status: OrderStatus) {
  if (status === "Cancelled") return -1;

  return statusOrder.indexOf(status);
}

function getStatusTitle(status: OrderStatus) {
  switch (status) {
    case "Pending":
      return "Order Confirmed";
    case "Preparing":
      return "Preparing Your Meal";
    case "Out for Delivery":
      return "Out for Delivery";
    case "Delivered":
      return "Delivered";
    case "Cancelled":
      return "Order Cancelled";
    default:
      return "Order Confirmed";
  }
}

function getProgress(status: OrderStatus) {
  switch (status) {
    case "Pending":
      return 25;
    case "Preparing":
      return 50;
    case "Out for Delivery":
      return 75;
    case "Delivered":
      return 100;
    case "Cancelled":
      return 0;
    default:
      return 25;
  }
}

export default function TrackOrderPage() {
  const router = useRouter();

  const [orderId, setOrderId] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  const fetchOrder = useCallback(
    async (id: string, isRefresh = false) => {
      const cleanId = id.trim();

      if (!cleanId) {
        setLoading(false);
        setError(
          "No recent order was found. Please place an order first."
        );
        return;
      }

      try {
        if (isRefresh) {
          setRefreshing(true);
        } else {
          setLoading(true);
        }

        setError("");

        const response = await fetch(
          `${API_URL}/api/orders/${encodeURIComponent(cleanId)}`,
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
            "The requested order could not be found."
          );
        }

        setOrder(data.order);
        setOrderId(data.order._id);

        sessionStorage.setItem(
          "lastOrderId",
          data.order._id
        );

        localStorage.setItem(
          "lastOrderId",
          data.order._id
        );
      } catch (err) {
        console.error("TRACK ORDER ERROR:", err);

        setError(
          err instanceof Error
            ? err.message
            : "Unable to retrieve your order."
        );
      } finally {
        setLoading(false);
        setRefreshing(false);
      }
    },
    []
  );

  useEffect(() => {
    const savedOrderId =
      sessionStorage.getItem("lastOrderId") ||
      localStorage.getItem("lastOrderId") ||
      "";

    setOrderId(savedOrderId);

    void fetchOrder(savedOrderId);
  }, [fetchOrder]);

  const handleRefresh = () => {
    if (!orderId) return;

    void fetchOrder(orderId, true);
  };

  if (loading) {
    return (
      <>
        <div className="loading-page">
          <div className="loading-card">
            <div className="loading-spinner">
              <RefreshCw size={28} />
            </div>

            <h2>Loading Your Order</h2>
            <p>Please wait while we retrieve your order details.</p>
          </div>
        </div>

        <style jsx>{`
          .loading-page {
            min-height: 100vh;
            background: #f7f8fa;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            font-family: Arial, Helvetica, sans-serif;
          }

          .loading-card {
            width: 100%;
            max-width: 420px;
            background: #ffffff;
            border: 1px solid #ececec;
            border-radius: 24px;
            padding: 42px 30px;
            text-align: center;
            box-shadow: 0 12px 35px rgba(15, 23, 42, 0.08);
          }

          .loading-spinner {
            width: 64px;
            height: 64px;
            margin: 0 auto 20px;
            border-radius: 20px;
            background: #fff1e8;
            color: #ff5a00;
            display: flex;
            align-items: center;
            justify-content: center;
            animation: spin 1.2s linear infinite;
          }

          .loading-card h2 {
            margin: 0 0 8px;
            font-size: 24px;
            color: #172033;
          }

          .loading-card p {
            margin: 0;
            color: #718096;
            line-height: 1.6;
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }

            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
      </>
    );
  }

  if (error || !order) {
    return (
      <>
        <div className="error-page">
          <div className="error-card">
            <div className="error-icon">
              <XCircle size={34} />
            </div>

            <span className="error-label">ORDER TRACKING</span>

            <h1>Order Not Found</h1>

            <p>
              {error ||
                "We couldn't retrieve your order details right now."}
            </p>

            <button
              className="home-button"
              onClick={() => router.push("/")}
            >
              <Home size={18} />
              Back to Home
            </button>
          </div>
        </div>

        <style jsx>{`
          .error-page {
            min-height: 100vh;
            background: #f7f8fa;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 24px;
            font-family: Arial, Helvetica, sans-serif;
          }

          .error-card {
            width: 100%;
            max-width: 480px;
            background: #ffffff;
            border-radius: 24px;
            padding: 44px 34px;
            text-align: center;
            border: 1px solid #ececec;
            box-shadow: 0 15px 40px rgba(15, 23, 42, 0.08);
          }

          .error-icon {
            width: 72px;
            height: 72px;
            margin: 0 auto 20px;
            border-radius: 22px;
            background: #fff1f0;
            color: #e53e3e;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .error-label {
            display: block;
            color: #ff5a00;
            font-size: 12px;
            font-weight: 800;
            letter-spacing: 3px;
            margin-bottom: 10px;
          }

          .error-card h1 {
            margin: 0 0 12px;
            color: #172033;
            font-size: 30px;
          }

          .error-card p {
            margin: 0 auto 26px;
            max-width: 390px;
            color: #718096;
            line-height: 1.7;
          }

          .home-button {
            border: 0;
            border-radius: 12px;
            background: #ff5a00;
            color: #ffffff;
            padding: 13px 22px;
            font-size: 15px;
            font-weight: 700;
            cursor: pointer;
            display: inline-flex;
            align-items: center;
            gap: 8px;
          }

          .home-button:hover {
            background: #e94f00;
          }
        `}</style>
      </>
    );
  }

  const customerName =
    order.customerName ||
    order.customer?.name ||
    "Customer";

  const customerPhone =
    order.customerPhone ||
    order.customer?.phone ||
    "Not provided";

  const subtotal = order.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const deliveryFee = Math.max(
    order.totalAmount - subtotal,
    0
  );

  const currentIndex = getStatusIndex(order.status);
  const progress = getProgress(order.status);

  return (
    <>
      <div className="track-page">
        {/* TOP NAVIGATION */}
        <div className="top-navigation">
          <button
            className="back-button"
            onClick={() => router.push("/")}
          >
            <ArrowLeft size={18} />
            <span>Back to Home</span>
          </button>

          <button
            className="refresh-button"
            onClick={handleRefresh}
            disabled={refreshing}
          >
            <RefreshCw
              size={18}
              className={refreshing ? "spinning" : ""}
            />
            <span>
              {refreshing ? "Refreshing..." : "Refresh Status"}
            </span>
          </button>
        </div>

        {/* HERO */}
        <section className="hero">
          <div className="hero-decoration hero-decoration-one" />
          <div className="hero-decoration hero-decoration-two" />

          <div className="hero-content">
            <div className="hero-check">
              <Check size={34} strokeWidth={3} />
            </div>

            <div className="order-number">
              ORDER #{order._id.slice(-6).toUpperCase()}
            </div>

            <h1>Track Your Order</h1>

            <p>
              Follow your order from preparation to delivery.
            </p>
          </div>
        </section>

        {/* SUMMARY CARDS */}
        <section className="summary-grid">
          <div className="summary-card">
            <div className="summary-icon">
              <Clock3 size={24} />
            </div>

            <div>
              <span className="summary-label">
                Estimated Delivery
              </span>

              <strong>25–35 Minutes</strong>
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <Package size={24} />
            </div>

            <div>
              <span className="summary-label">
                Current Status
              </span>

              <strong>{getStatusTitle(order.status)}</strong>

              {order.status !== "Cancelled" && (
                <span className="updated-badge">
                  Updated just now
                </span>
              )}
            </div>
          </div>

          <div className="summary-card">
            <div className="summary-icon">
              <WalletCards size={24} />
            </div>

            <div>
              <span className="summary-label">
                Total Amount
              </span>

              <strong>{formatCurrency(order.totalAmount)}</strong>
            </div>
          </div>
        </section>

        {/* MAIN CONTENT */}
        <main className="content-grid">
          {/* LEFT COLUMN */}
          <div className="left-column">
            {/* DELIVERY PROGRESS */}
            <section className="card progress-card">
              <div className="card-header">
                <div>
                  <span className="section-label">
                    DELIVERY PROGRESS
                  </span>

                  <h2>Order Journey</h2>
                </div>

                {order.status !== "Cancelled" && (
                  <span className="progress-percent">
                    {progress}% Complete
                  </span>
                )}
              </div>

              {order.status === "Cancelled" ? (
                <div className="cancelled-box">
                  <div className="cancelled-icon">
                    <XCircle size={28} />
                  </div>

                  <div>
                    <h3>Order Cancelled</h3>
                    <p>
                      This order has been cancelled and will not
                      proceed to delivery.
                    </p>
                  </div>
                </div>
              ) : (
                <>
                  <div className="progress-track">
                    <div
                      className="progress-fill"
                      style={{
                        width: `${progress}%`,
                      }}
                    />
                  </div>

                  <div className="timeline">
                    {statusSteps.map((step, index) => {
                      const StepIcon = step.icon;
                      const completed = index <= currentIndex;
                      const current = index === currentIndex;

                      return (
                        <div
                          className="timeline-item"
                          key={step.status}
                        >
                          <div
                            className={`timeline-icon ${
                              completed ? "completed" : ""
                            } ${current ? "current" : ""}`}
                          >
                            <StepIcon size={19} />
                          </div>

                          {index < statusSteps.length - 1 && (
                            <div
                              className={`timeline-line ${
                                index < currentIndex
                                  ? "active"
                                  : ""
                              }`}
                            />
                          )}

                          <div className="timeline-content">
                            <div className="timeline-title-row">
                              <h3>{step.title}</h3>

                              {completed && (
                                <span
                                  className={
                                    current
                                      ? "step-badge current-badge"
                                      : "step-badge"
                                  }
                                >
                                  {current
                                    ? "Current Step"
                                    : "Completed"}
                                </span>
                              )}
                            </div>

                            <p>{step.description}</p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </section>

            {/* ORDER ITEMS */}
            <section className="card order-items-card">
              <div className="card-header">
                <div>
                  <span className="section-label">
                    YOUR ORDER
                  </span>

                  <h2>Order Items</h2>
                </div>

                <div className="items-header-icon">
                  <ShoppingBag size={21} />
                </div>
              </div>

              <div className="items-list">
                {order.items.map((item, index) => (
                  <div
                    className="order-item"
                    key={`${item.product || item.name}-${index}`}
                  >
                    <div className="item-image">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      ) : (
                        <ShoppingBag size={22} />
                      )}
                    </div>

                    <div className="item-info">
                      <h3>{item.name}</h3>

                      <span>
                        Quantity: {item.quantity}
                      </span>
                    </div>

                    <div className="item-price">
                      {formatCurrency(
                        item.price * item.quantity
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div className="price-summary">
                <div className="price-row">
                  <span>Subtotal</span>
                  <span>{formatCurrency(subtotal)}</span>
                </div>

                <div className="price-row">
                  <span>Delivery Fee</span>
                  <span>{formatCurrency(deliveryFee)}</span>
                </div>

                <div className="total-row">
                  <strong>Total Amount</strong>
                  <strong>
                    {formatCurrency(order.totalAmount)}
                  </strong>
                </div>
              </div>
            </section>
          </div>

          {/* RIGHT COLUMN */}
          <aside className="right-column">
            {/* DELIVERY DETAILS */}
            <section className="card details-card">
              <div className="card-header compact">
                <div>
                  <span className="section-label">
                    DELIVERY DETAILS
                  </span>

                  <h2>Delivering To</h2>
                </div>
              </div>

              <div className="detail-list">
                <div className="detail-row">
                  <div className="detail-icon">
                    <User size={19} />
                  </div>

                  <div className="detail-text">
                    <span>Customer</span>
                    <strong>{customerName}</strong>
                  </div>
                </div>

                <div className="detail-divider" />

                <div className="detail-row">
                  <div className="detail-icon">
                    <MapPin size={19} />
                  </div>

                  <div className="detail-text">
                    <span>Delivery Address</span>
                    <strong>
                      {order.deliveryAddress || "Not provided"}
                    </strong>
                  </div>
                </div>

                <div className="detail-divider" />

                <div className="detail-row">
                  <div className="detail-icon">
                    <Phone size={19} />
                  </div>

                  <div className="detail-text">
                    <span>Phone</span>
                    <strong>{customerPhone}</strong>
                  </div>
                </div>

                <div className="detail-divider" />

                <div className="detail-row">
                  <div className="detail-icon">
                    <Clock3 size={19} />
                  </div>

                  <div className="detail-text">
                    <span>Order Placed</span>
                    <strong>
                      {formatDate(order.createdAt)}
                    </strong>
                  </div>
                </div>
              </div>
            </section>

            {/* PAYMENT */}
            <section className="card payment-card">
              <div className="card-header compact">
                <div>
                  <span className="section-label">
                    PAYMENT
                  </span>

                  <h2>Payment Information</h2>
                </div>
              </div>

              <div className="payment-row">
                <div>
                  <span>Payment Method</span>
                  <strong>{order.paymentMethod}</strong>
                </div>

                <span className="confirmed-badge">
                  Confirmed
                </span>
              </div>
            </section>

            {/* REFRESH INFO */}
            <section className="refresh-info">
              <div className="refresh-info-icon">
                <RefreshCw size={24} />
              </div>

              <div>
                <h3>Want the latest status?</h3>

                <p>
                  Press{" "}
                  <strong>Refresh Status</strong> above to
                  check for the latest update.
                </p>
              </div>
            </section>
          </aside>
        </main>

        {/* CTA */}
        <div className="bottom-action">
          <button
            className="continue-button"
            onClick={() => router.push("/")}
          >
            <ShoppingBag size={19} />
            <span>Continue Shopping</span>
            <ArrowRight size={19} />
          </button>
        </div>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footer-brand">
            <ShoppingBag size={18} />
            <strong>FlavorNest</strong>
          </div>

          <span>FlavorNest • Fresh, fast & delicious</span>

          <span className="footer-thanks">
            Thank you for ordering with us! ❤️
          </span>
        </footer>
      </div>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .track-page {
          min-height: 100vh;
          background: #f7f8fa;
          color: #172033;
          font-family: Arial, Helvetica, sans-serif;
          padding: 20px 24px 30px;
        }

        /* TOP NAVIGATION */

        .top-navigation {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto 16px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 16px;
        }

        .back-button,
        .refresh-button {
          border: 0;
          background: transparent;
          color: #26364f;
          font-size: 15px;
          font-weight: 700;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          padding: 8px 4px;
          transition: 0.2s ease;
        }

        .back-button:hover,
        .refresh-button:hover {
          color: #ff5a00;
        }

        .refresh-button:disabled {
          opacity: 0.65;
          cursor: not-allowed;
        }

        .spinning {
          animation: spin 0.9s linear infinite;
        }

        /* HERO */

        .hero {
          max-width: 1180px;
          min-height: 245px;
          margin: 0 auto 18px;
          border-radius: 28px;
          position: relative;
          overflow: hidden;
          background: linear-gradient(
            135deg,
            #ff5a00 0%,
            #ff680c 55%,
            #ff7622 100%
          );
          box-shadow: 0 14px 35px rgba(255, 90, 0, 0.18);
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .hero-decoration {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          border: 1px solid rgba(255, 255, 255, 0.13);
        }

        .hero-decoration-one {
          width: 300px;
          height: 300px;
          left: -130px;
          top: -170px;
          box-shadow:
            0 0 0 35px rgba(255, 255, 255, 0.035),
            0 0 0 70px rgba(255, 255, 255, 0.025);
        }

        .hero-decoration-two {
          width: 370px;
          height: 370px;
          right: -180px;
          bottom: -230px;
          background: rgba(255, 255, 255, 0.055);
        }

        .hero-content {
          position: relative;
          z-index: 2;
          text-align: center;
          color: #ffffff;
          padding: 30px 20px;
        }

        .hero-check {
          width: 68px;
          height: 68px;
          margin: 0 auto 18px;
          border-radius: 50%;
          border: 4px solid #ffffff;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.08);
          box-shadow:
            0 0 0 12px rgba(255, 255, 255, 0.08),
            0 0 0 24px rgba(255, 255, 255, 0.035);
        }

        .order-number {
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 4px;
          margin-bottom: 6px;
        }

        .hero h1 {
          margin: 0;
          font-size: clamp(34px, 5vw, 48px);
          line-height: 1.1;
          font-weight: 800;
          letter-spacing: -1.5px;
        }

        .hero p {
          margin: 9px 0 0;
          font-size: 16px;
          opacity: 0.95;
        }

        /* SUMMARY */

        .summary-grid {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto 18px;
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 18px;
        }

        .summary-card {
          min-height: 100px;
          background: #ffffff;
          border: 1px solid #e7e9ed;
          border-radius: 18px;
          padding: 18px 20px;
          display: flex;
          align-items: center;
          gap: 15px;
          box-shadow: 0 5px 18px rgba(15, 23, 42, 0.05);
        }

        .summary-icon {
          flex: 0 0 auto;
          width: 56px;
          height: 56px;
          border-radius: 17px;
          background: #fff2e9;
          color: #ff5a00;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .summary-card > div:last-child {
          min-width: 0;
        }

        .summary-label {
          display: block;
          color: #8290a6;
          font-size: 13px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .summary-card strong {
          display: block;
          color: #172033;
          font-size: 19px;
          line-height: 1.2;
        }

        .updated-badge {
          display: inline-block;
          margin-top: 7px;
          padding: 4px 9px;
          border-radius: 999px;
          background: #e9faef;
          color: #18a34a;
          font-size: 11px;
          font-weight: 800;
        }

        /* CONTENT */

        .content-grid {
          width: 100%;
          max-width: 1180px;
          margin: 0 auto;
          display: grid;
          grid-template-columns: minmax(0, 1.55fr) minmax(320px, 0.9fr);
          gap: 18px;
          align-items: start;
        }

        .left-column,
        .right-column {
          min-width: 0;
          display: flex;
          flex-direction: column;
          gap: 18px;
        }

        .card {
          background: #ffffff;
          border: 1px solid #e7e9ed;
          border-radius: 20px;
          box-shadow: 0 5px 18px rgba(15, 23, 42, 0.045);
        }

        .progress-card {
          padding: 25px;
        }

        .order-items-card,
        .details-card,
        .payment-card {
          padding: 24px;
        }

        .card-header {
          display: flex;
          align-items: flex-start;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 22px;
        }

        .card-header.compact {
          margin-bottom: 20px;
        }

        .section-label {
          display: block;
          color: #ff5a00;
          font-size: 11px;
          font-weight: 900;
          letter-spacing: 3px;
          margin-bottom: 5px;
        }

        .card-header h2 {
          margin: 0;
          font-size: 24px;
          line-height: 1.2;
          color: #172033;
        }

        .progress-percent {
          flex-shrink: 0;
          color: #ff5a00;
          font-size: 14px;
          font-weight: 800;
          padding-top: 4px;
        }

        .progress-track {
          width: 100%;
          height: 8px;
          border-radius: 999px;
          background: #edf0f4;
          overflow: hidden;
          margin-bottom: 26px;
        }

        .progress-fill {
          height: 100%;
          border-radius: inherit;
          background: #ff5a00;
          transition: width 0.4s ease;
        }

        /* TIMELINE */

        .timeline {
          position: relative;
        }

        .timeline-item {
          position: relative;
          min-height: 88px;
          display: grid;
          grid-template-columns: 48px minmax(0, 1fr);
          column-gap: 16px;
        }

        .timeline-icon {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          background: #edf1f5;
          color: #91a0b4;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          z-index: 2;
        }

        .timeline-icon.completed {
          background: #fff0e7;
          color: #ff5a00;
        }

        .timeline-icon.current {
          background: #ff5a00;
          color: #ffffff;
          box-shadow: 0 0 0 6px #fff1e9;
        }

        .timeline-line {
          position: absolute;
          z-index: 1;
          left: 21px;
          top: 44px;
          width: 2px;
          height: 44px;
          background: #e4e8ed;
        }

        .timeline-line.active {
          background: #ff5a00;
        }

        .timeline-content {
          padding: 1px 0 22px;
        }

        .timeline-title-row {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 8px;
        }

        .timeline-content h3 {
          margin: 0;
          font-size: 16px;
          color: #172033;
        }

        .timeline-content p {
          margin: 5px 0 0;
          color: #7d8ba0;
          font-size: 13px;
          line-height: 1.5;
        }

        .step-badge {
          display: inline-flex;
          align-items: center;
          padding: 4px 8px;
          border-radius: 999px;
          background: #fff1e8;
          color: #ff5a00;
          font-size: 10px;
          font-weight: 800;
        }

        .current-badge {
          background: #fff1e8;
          color: #ff5a00;
        }

        .cancelled-box {
          display: flex;
          align-items: center;
          gap: 16px;
          padding: 18px;
          border-radius: 15px;
          background: #fff5f5;
          border: 1px solid #ffe1e1;
        }

        .cancelled-icon {
          flex: 0 0 auto;
          width: 52px;
          height: 52px;
          border-radius: 15px;
          background: #ffe7e7;
          color: #e53e3e;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .cancelled-box h3 {
          margin: 0 0 5px;
          color: #b42323;
          font-size: 17px;
        }

        .cancelled-box p {
          margin: 0;
          color: #7d6b6b;
          font-size: 13px;
          line-height: 1.5;
        }

        /* ORDER ITEMS */

        .items-header-icon {
          width: 42px;
          height: 42px;
          border-radius: 13px;
          background: #fff2e9;
          color: #ff5a00;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .items-list {
          border-top: 1px solid #edf0f3;
        }

        .order-item {
          display: grid;
          grid-template-columns: 58px minmax(0, 1fr) auto;
          align-items: center;
          gap: 14px;
          padding: 15px 0;
          border-bottom: 1px solid #edf0f3;
        }

        .item-image {
          width: 58px;
          height: 58px;
          border-radius: 13px;
          background: #fff3eb;
          color: #ff5a00;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .item-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }

        .item-info h3 {
          margin: 0 0 5px;
          color: #172033;
          font-size: 15px;
        }

        .item-info span {
          color: #8794a7;
          font-size: 12px;
        }

        .item-price {
          color: #172033;
          font-size: 15px;
          font-weight: 800;
          white-space: nowrap;
        }

        .price-summary {
          padding-top: 17px;
        }

        .price-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 5px 0;
          color: #748298;
          font-size: 14px;
        }

        .total-row {
          margin-top: 10px;
          padding: 12px 14px;
          border-radius: 12px;
          background: #fff0e6;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .total-row strong:first-child {
          color: #172033;
          font-size: 15px;
        }

        .total-row strong:last-child {
          color: #ff5a00;
          font-size: 20px;
        }

        /* DETAILS */

        .detail-list {
          border-top: 1px solid #edf0f3;
        }

        .detail-row {
          display: flex;
          align-items: center;
          gap: 13px;
          padding: 15px 0;
        }

        .detail-icon {
          flex: 0 0 auto;
          width: 40px;
          height: 40px;
          border-radius: 11px;
          background: #f4f6f8;
          color: #718096;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .detail-text {
          min-width: 0;
        }

        .detail-text span {
          display: block;
          color: #8a97a9;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 4px;
        }

        .detail-text strong {
          display: block;
          color: #172033;
          font-size: 14px;
          line-height: 1.4;
          word-break: break-word;
        }

        .detail-divider {
          height: 1px;
          background: #edf0f3;
        }

        /* PAYMENT */

        .payment-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding: 15px;
          border-radius: 14px;
          background: #f8f9fb;
        }

        .payment-row > div span {
          display: block;
          color: #8a97a9;
          font-size: 11px;
          font-weight: 600;
          margin-bottom: 5px;
        }

        .payment-row > div strong {
          color: #172033;
          font-size: 14px;
        }

        .confirmed-badge {
          flex-shrink: 0;
          padding: 6px 10px;
          border-radius: 999px;
          background: #e7f9ed;
          color: #18a34a;
          font-size: 11px;
          font-weight: 800;
        }

        /* REFRESH INFO */

        .refresh-info {
          border: 1px solid #ffd9c0;
          background: linear-gradient(
            135deg,
            #fffaf6,
            #fff4eb
          );
          border-radius: 18px;
          padding: 20px;
          display: flex;
          align-items: flex-start;
          gap: 14px;
        }

        .refresh-info-icon {
          flex: 0 0 auto;
          color: #ff5a00;
          margin-top: 2px;
        }

        .refresh-info h3 {
          margin: 0 0 6px;
          color: #172033;
          font-size: 15px;
        }

        .refresh-info p {
          margin: 0;
          color: #7c8899;
          font-size: 13px;
          line-height: 1.55;
        }

        .refresh-info p strong {
          color: #ff5a00;
        }

        /* BOTTOM BUTTON */

        .bottom-action {
          width: 100%;
          max-width: 1180px;
          margin: 24px auto 0;
          display: flex;
          justify-content: center;
        }

        .continue-button {
          min-width: 300px;
          border: 0;
          border-radius: 999px;
          background: #ff5a00;
          color: #ffffff;
          padding: 14px 24px;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          font-size: 15px;
          font-weight: 800;
          cursor: pointer;
          box-shadow: 0 8px 20px rgba(255, 90, 0, 0.2);
          transition:
            transform 0.2s ease,
            background 0.2s ease;
        }

        .continue-button:hover {
          background: #e94f00;
          transform: translateY(-2px);
        }

        /* FOOTER */

        .footer {
          width: 100%;
          max-width: 1180px;
          margin: 25px auto 0;
          padding: 18px 10px 5px;
          border-top: 1px solid #e5e8ec;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          color: #8290a4;
          font-size: 12px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #ff5a00;
        }

        .footer-thanks {
          text-align: right;
        }

        /* RESPONSIVE */

        @media (max-width: 900px) {
          .summary-grid {
            grid-template-columns: 1fr;
          }

          .content-grid {
            grid-template-columns: 1fr;
          }

          .right-column {
            display: grid;
            grid-template-columns: 1fr 1fr;
            align-items: start;
          }

          .refresh-info {
            grid-column: 1 / -1;
          }
        }

        @media (max-width: 640px) {
          .track-page {
            padding: 12px;
          }

          .top-navigation {
            margin-bottom: 12px;
          }

          .back-button,
          .refresh-button {
            font-size: 13px;
          }

          .hero {
            min-height: 220px;
            border-radius: 22px;
          }

          .hero-content {
            padding: 28px 15px;
          }

          .hero-check {
            width: 58px;
            height: 58px;
          }

          .hero h1 {
            font-size: 32px;
          }

          .hero p {
            font-size: 14px;
          }

          .order-number {
            font-size: 11px;
            letter-spacing: 3px;
          }

          .summary-card {
            min-height: 88px;
            padding: 15px;
          }

          .summary-icon {
            width: 48px;
            height: 48px;
            border-radius: 14px;
          }

          .summary-card strong {
            font-size: 17px;
          }

          .progress-card,
          .order-items-card,
          .details-card,
          .payment-card {
            padding: 18px;
            border-radius: 18px;
          }

          .card-header h2 {
            font-size: 21px;
          }

          .progress-percent {
            font-size: 12px;
          }

          .timeline-item {
            grid-template-columns: 42px minmax(0, 1fr);
            column-gap: 12px;
          }

          .timeline-icon {
            width: 40px;
            height: 40px;
          }

          .timeline-line {
            left: 19px;
            top: 40px;
          }

          .timeline-title-row {
            display: block;
          }

          .step-badge {
            margin-top: 6px;
          }

          .order-item {
            grid-template-columns: 50px minmax(0, 1fr);
          }

          .item-image {
            width: 50px;
            height: 50px;
          }

          .item-price {
            grid-column: 2;
            justify-self: start;
            margin-top: -8px;
          }

          .right-column {
            display: flex;
          }

          .payment-row {
            align-items: flex-start;
          }

          .continue-button {
            width: 100%;
            min-width: 0;
          }

          .footer {
            flex-direction: column;
            text-align: center;
            gap: 8px;
          }

          .footer-thanks {
            text-align: center;
          }
        }

        @keyframes spin {
          from {
            transform: rotate(0deg);
          }

          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </>
  );
}