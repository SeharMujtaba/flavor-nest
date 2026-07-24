import Link from "next/link";
import {
  ArrowLeft,
  CircleDollarSign,
  Clock3,
  MapPin,
  Phone,
  User,
} from "lucide-react";

type Props = {
  params: {
    id: string;
  };
};

export default function OrderDetails({ params }: Props) {
  return (
    <div className="space-y-8">

      {/* Back */}

      <Link
        href="/admin/orders"
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
          font-semibold
          transition
          hover:border-orange-400
          hover:text-orange-500
        "
      >
        <ArrowLeft size={18} />
        Back to Orders
      </Link>

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-4xl font-extrabold text-slate-900">
            Order {params.id}
          </h1>

          <p className="mt-2 text-slate-500">
            Customer order information
          </p>

        </div>

        <span className="rounded-full bg-yellow-100 px-5 py-2 font-semibold text-yellow-700">
          Preparing
        </span>

      </div>

      {/* Cards */}

      <div className="grid gap-8 lg:grid-cols-3">

        {/* Left */}

        <div className="space-y-8 lg:col-span-2">

          {/* Ordered Items */}

          <div className="rounded-2xl bg-white p-8 shadow-sm">

            <h2 className="text-2xl font-bold">
              Ordered Items
            </h2>

            <div className="mt-8 space-y-6">

              <div className="flex justify-between border-b pb-5">

                <div>

                  <h3 className="font-bold">
                    Classic Cheeseburger
                  </h3>

                  <p className="text-slate-500">
                    Qty : 2
                  </p>

                </div>

                <span className="font-bold">
                  Rs. 1,798
                </span>

              </div>

              <div className="flex justify-between border-b pb-5">

                <div>

                  <h3 className="font-bold">
                    French Fries
                  </h3>

                  <p className="text-slate-500">
                    Qty : 1
                  </p>

                </div>

                <span className="font-bold">
                  Rs.399
                </span>

              </div>

              <div className="flex justify-between">

                <h2 className="text-2xl font-bold">
                  Total
                </h2>

                <h2 className="text-2xl font-bold text-orange-500">
                  Rs.2,197
                </h2>

              </div>

            </div>

          </div>

        </div>

        {/* Right */}

        <div className="space-y-6">

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Customer
            </h2>

            <div className="mt-6 space-y-5">

              <div className="flex gap-3">

                <User className="text-orange-500" />

                <div>

                  <p className="font-semibold">
                    Rizwan Khan
                  </p>

                </div>

              </div>

              <div className="flex gap-3">

                <Phone className="text-orange-500" />

                <p>03001234567</p>

              </div>

              <div className="flex gap-3">

                <MapPin className="text-orange-500" />

                <p>
                  Gulberg III, Lahore
                </p>

              </div>

            </div>

          </div>

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Payment
            </h2>

            <div className="mt-5 space-y-4">

              <div className="flex gap-3">

                <CircleDollarSign className="text-green-600" />

                <p>Cash on Delivery</p>

              </div>

              <div className="flex gap-3">

                <Clock3 className="text-blue-500" />

                <p>Placed 15 minutes ago</p>

              </div>

            </div>

          </div>

          {/* Status */}

          <div className="rounded-2xl bg-white p-6 shadow-sm">

            <h2 className="text-xl font-bold">
              Update Status
            </h2>

            <select
              className="
                mt-5
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
              "
            >
              <option>Pending</option>
              <option>Preparing</option>
              <option>Out for Delivery</option>
              <option>Delivered</option>
              <option>Cancelled</option>
            </select>

            <button
              className="
                mt-5
                w-full
                rounded-xl
                bg-orange-500
                py-3
                font-semibold
                text-white
                transition
                hover:bg-orange-600
              "
            >
              Save Changes
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}