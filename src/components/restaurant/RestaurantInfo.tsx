import {
  Clock3,
  MapPin,
  Phone,
  Bike,
  DollarSign,
  UtensilsCrossed,
} from "lucide-react";

type Restaurant = {
  description: string;
  openingHours: string;
  deliveryTime: string;
  minimumOrder: string;
  cuisine: string;
  address: string;
  phone: string;
  delivery: string;
};

type RestaurantInfoProps = {
  restaurant: Restaurant;
};

export default function RestaurantInfo({
  restaurant,
}: RestaurantInfoProps) {
  return (
    <section className="py-16">
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">
          {/* About */}
          <div
            className="
              rounded-3xl
              border
              border-slate-100
              bg-white
              p-8
              shadow-lg
            "
          >
            <h2
              className="
                text-3xl
                font-bold
                text-slate-900
              "
            >
              About Restaurant
            </h2>

            <p
              className="
                mt-6
                leading-8
                text-slate-600
              "
            >
              {restaurant.description}
            </p>

            <div
              className="
                mt-10
                grid
                gap-6

                sm:grid-cols-2
              "
            >
              {/* Opening Hours */}
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-orange-100 p-3">
                  <Clock3 className="text-orange-500" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Opening Hours
                  </p>

                  <span className="text-slate-500">
                    {restaurant.openingHours}
                  </span>
                </div>
              </div>

              {/* Delivery */}
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-emerald-100 p-3">
                  <Bike className="text-emerald-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Delivery Time
                  </p>

                  <span className="text-slate-500">
                    {restaurant.deliveryTime}
                  </span>
                </div>
              </div>

              {/* Minimum Order */}
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-green-100 p-3">
                  <DollarSign className="text-green-600" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Minimum Order
                  </p>

                  <span className="text-slate-500">
                    {restaurant.minimumOrder}
                  </span>
                </div>
              </div>

              {/* Cuisine */}
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-red-100 p-3">
                  <UtensilsCrossed className="text-red-500" />
                </div>

                <div>
                  <p className="font-semibold text-slate-900">
                    Cuisine
                  </p>

                  <span className="text-slate-500">
                    {restaurant.cuisine}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Card */}
          <div
            className="
              h-fit
              rounded-3xl
              border
              border-slate-100
              bg-white
              p-8
              shadow-lg
            "
          >
            <h3
              className="
                text-2xl
                font-bold
                text-slate-900
              "
            >
              Contact Information
            </h3>

            <div className="mt-8 space-y-6">
              {/* Address */}
              <div className="flex items-start gap-4">
                <div className="rounded-xl bg-orange-100 p-3">
                  <MapPin className="text-orange-500" />
                </div>

                <span className="text-slate-600">
                  {restaurant.address}
                </span>
              </div>

              {/* Phone */}
              <div className="flex items-center gap-4">
                <div className="rounded-xl bg-blue-100 p-3">
                  <Phone className="text-blue-600" />
                </div>

                <span className="text-slate-600">
                  {restaurant.phone}
                </span>
              </div>

              {/* Delivery Card */}
              <div
                className="
                  rounded-2xl
                  bg-gradient-to-r
                  from-orange-50
                  to-orange-100
                  p-5
                "
              >
                <h4
                  className="
                    text-lg
                    font-bold
                    text-orange-600
                  "
                >
                  {restaurant.delivery}
                </h4>

                <p
                  className="
                    mt-2
                    text-sm
                    text-slate-600
                  "
                >
                  Available throughout your city with quick delivery.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}