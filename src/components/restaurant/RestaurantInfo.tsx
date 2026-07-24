import {
  Bike,
  Clock3,
  DollarSign,
  MapPin,
  Phone,
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
    <section className="bg-slate-50 py-20">
      <div className="mx-auto max-w-7xl px-6">

        <div className="grid gap-8 lg:grid-cols-[2fr_1fr]">

          {/* LEFT */}

          <div
            className="
              rounded-2xl
              border
              border-slate-200
              bg-white
              p-8
              shadow-sm
            "
          >
            <h2 className="text-3xl font-bold text-slate-900">
              About Restaurant
            </h2>

            <p className="mt-6 leading-8 text-slate-600">
              {restaurant.description}
            </p>

            <div className="mt-10 grid gap-5 md:grid-cols-2">

              {/* Opening */}

              <div
                className="
                  flex
                  items-center
                  gap-4

                  rounded-xl

                  border
                  border-slate-200

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-orange-200
                  hover:shadow-md
                "
              >
                <div className="rounded-xl bg-orange-100 p-3">
                  <Clock3 className="text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Opening Hours
                  </p>

                  <h4 className="font-semibold text-slate-900">
                    {restaurant.openingHours}
                  </h4>
                </div>
              </div>

              {/* Delivery */}

              <div
                className="
                  flex
                  items-center
                  gap-4

                  rounded-xl

                  border
                  border-slate-200

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-emerald-200
                  hover:shadow-md
                "
              >
                <div className="rounded-xl bg-emerald-100 p-3">
                  <Bike className="text-emerald-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Delivery Time
                  </p>

                  <h4 className="font-semibold text-slate-900">
                    {restaurant.deliveryTime}
                  </h4>
                </div>
              </div>

              {/* Minimum */}

              <div
                className="
                  flex
                  items-center
                  gap-4

                  rounded-xl

                  border
                  border-slate-200

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-green-200
                  hover:shadow-md
                "
              >
                <div className="rounded-xl bg-green-100 p-3">
                  <DollarSign className="text-green-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Minimum Order
                  </p>

                  <h4 className="font-semibold text-slate-900">
                    {restaurant.minimumOrder}
                  </h4>
                </div>
              </div>

              {/* Cuisine */}

              <div
                className="
                  flex
                  items-center
                  gap-4

                  rounded-xl

                  border
                  border-slate-200

                  p-5

                  transition-all
                  duration-300

                  hover:-translate-y-1
                  hover:border-red-200
                  hover:shadow-md
                "
              >
                <div className="rounded-xl bg-red-100 p-3">
                  <UtensilsCrossed className="text-red-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Cuisine
                  </p>

                  <h4 className="font-semibold text-slate-900">
                    {restaurant.cuisine}
                  </h4>
                </div>
              </div>

            </div>

          </div>

          {/* RIGHT */}

          <div
            className="
              h-fit

              rounded-2xl

              border
              border-slate-200

              bg-white

              p-8

              shadow-sm

              lg:sticky
              lg:top-24
            "
          >
            <h3 className="text-2xl font-bold text-slate-900">
              Contact Information
            </h3>

            <div className="mt-8 space-y-8">

              {/* Address */}

              <div className="flex gap-4">

                <div className="rounded-xl bg-orange-100 p-3 h-fit">
                  <MapPin className="text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Restaurant Address
                  </p>

                  <p className="mt-1 leading-7 font-medium text-slate-800">
                    {restaurant.address}
                  </p>
                </div>

              </div>

              {/* Phone */}

              <div className="flex gap-4">

                <div className="rounded-xl bg-blue-100 p-3 h-fit">
                  <Phone className="text-blue-600" />
                </div>

                <div>
                  <p className="text-sm text-slate-500">
                    Contact Number
                  </p>

                  <p className="mt-1 font-medium text-slate-800">
                    {restaurant.phone}
                  </p>
                </div>

              </div>

              {/* Delivery Box */}

              <div
                className="
                  rounded-[5px]

                  bg-gradient-to-r
                  from-orange-500
                  to-orange-400

                  p-6

                  text-white
                "
              >
                <h4 className="text-xl font-bold">
                  {restaurant.delivery}
                </h4>

                <p className="mt-3 text-sm leading-7 text-orange-50">
                  Enjoy quick, safe and reliable delivery with freshly
                  prepared meals packed carefully and delivered directly
                  to your doorstep.
                </p>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}