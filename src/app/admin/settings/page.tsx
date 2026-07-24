import {
  Store,
  Phone,
  MapPin,
  Clock3,
  Bike,
  DollarSign,
  Save,
  Upload,
  Image as ImageIcon,
} from "lucide-react";

export default function AdminSettingsPage() {
  return (
    <main className="space-y-8">

      {/* Header */}

      <div>

        <h1 className="text-4xl font-extrabold text-slate-900">
          Restaurant Settings
        </h1>

        <p className="mt-2 text-slate-500">
          Manage your restaurant information, branding and delivery settings.
        </p>

      </div>

      {/* Main Card */}

      <div className="rounded-3xl bg-white p-8 shadow-sm">

        <div className="grid gap-8 md:grid-cols-2">

          {/* Logo Upload */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
              <ImageIcon
                size={18}
                className="text-orange-500"
              />
              Restaurant Logo
            </label>

            <label
              className="
                flex
                h-44
                cursor-pointer
                flex-col
                items-center
                justify-center

                rounded-2xl

                border-2
                border-dashed
                border-orange-300

                bg-orange-50

                transition

                hover:border-orange-500
                hover:bg-orange-100
              "
            >

              <Upload
                size={34}
                className="text-orange-500"
              />

              <p className="mt-4 font-semibold text-slate-700">
                Upload Restaurant Logo
              </p>

              <span className="mt-1 text-sm text-slate-500">
                PNG, JPG or SVG
              </span>

              <input
                type="file"
                className="hidden"
              />

            </label>

          </div>

          {/* Cover Upload */}

          <div>

            <label className="mb-3 flex items-center gap-2 font-semibold text-slate-900">
              <ImageIcon
                size={18}
                className="text-blue-500"
              />
              Restaurant Cover
            </label>

            <label
              className="
                flex
                h-44
                cursor-pointer
                flex-col
                items-center
                justify-center

                rounded-2xl

                border-2
                border-dashed
                border-blue-300

                bg-blue-50

                transition

                hover:border-blue-500
                hover:bg-blue-100
              "
            >

              <Upload
                size={34}
                className="text-blue-500"
              />

              <p className="mt-4 font-semibold text-slate-700">
                Upload Cover Image
              </p>

              <span className="mt-1 text-sm text-slate-500">
                Recommended 1600 × 600 px
              </span>

              <input
                type="file"
                className="hidden"
              />

            </label>

          </div>

          {/* Restaurant Name */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold">
              <Store
                size={18}
                className="text-orange-500"
              />
              Restaurant Name
            </label>

            <input
              type="text"
              defaultValue="Foodie Hub"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

          {/* Phone */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold">
              <Phone
                size={18}
                className="text-green-500"
              />
              Contact Number
            </label>

            <input
              type="text"
              defaultValue="+92 300 1234567"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

          {/* Address */}

          <div className="md:col-span-2">

            <label className="mb-2 flex items-center gap-2 font-semibold">
              <MapPin
                size={18}
                className="text-red-500"
              />
              Restaurant Address
            </label>

            <textarea
              rows={3}
              defaultValue="Main Boulevard, Lahore, Pakistan"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

          {/* Opening Hours */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold">
              <Clock3
                size={18}
                className="text-indigo-500"
              />
              Opening Hours
            </label>

            <input
              type="text"
              defaultValue="09:00 AM - 11:00 PM"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

          {/* Delivery Time */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold">
              <Bike
                size={18}
                className="text-orange-500"
              />
              Delivery Time
            </label>

            <input
              type="text"
              defaultValue="30 - 45 mins"
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

          {/* Minimum Order */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold">
              <DollarSign
                size={18}
                className="text-emerald-500"
              />
              Minimum Order (Rs.)
            </label>

            <input
              type="number"
              defaultValue={500}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

          {/* Delivery Fee */}

          <div>

            <label className="mb-2 flex items-center gap-2 font-semibold">
              <DollarSign
                size={18}
                className="text-purple-500"
              />
              Delivery Fee (Rs.)
            </label>

            <input
              type="number"
              defaultValue={150}
              className="
                w-full
                rounded-xl
                border
                border-slate-200
                p-3
                outline-none
                transition
                focus:border-orange-500
              "
            />

          </div>

        </div>

        {/* Save Button */}

        <div className="mt-10 border-t border-slate-200 pt-8">

          <button
            className="
              inline-flex
              items-center
              gap-3

              rounded-xl

              bg-orange-500

              px-8
              py-4

              font-semibold
              text-white

              shadow-lg
              shadow-orange-200

              transition-all

              hover:-translate-y-1
              hover:bg-orange-600
            "
          >
            <Save size={20} />

            Save Changes

          </button>

        </div>

      </div>

    </main>
  );
}