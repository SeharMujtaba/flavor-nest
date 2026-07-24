import Link from "next/link";
import {
  ArrowLeft,
  MapPin,
  Phone,
  Mail,
  Clock3,
  Send,
  Globe,
  Camera,
  MessageCircle,
} from "lucide-react";

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero */}

      <section className="bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 py-24">

        <div className="mx-auto max-w-7xl px-6">

          {/* Navigation */}

          <Link
            href="/"
            className="
              mb-10
              inline-flex
              items-center
              gap-2
              rounded-full
              bg-white/20
              px-6
              py-3
              font-semibold
              text-white
              backdrop-blur-md
              transition
              hover:bg-white
              hover:text-orange-500
            "
          >
            <ArrowLeft size={18} />
            Back to Home
          </Link>

          <div className="text-center">

            <h1 className="text-6xl font-extrabold text-white">
              Contact Us
            </h1>

            <p className="mx-auto mt-6 max-w-3xl text-xl leading-9 text-orange-100">
              We&apos;d love to hear from you. Whether you need support,
              have suggestions, or want to partner with us, we&apos;re
              always here to help.
            </p>

          </div>

        </div>

      </section>

      {/* Contact */}

      <section className="py-24">

        <div className="mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">

          {/* Form */}

          <div className="rounded-3xl bg-white p-10 shadow-xl">

            <h2 className="text-4xl font-bold text-slate-900">
              Send us a Message
            </h2>

            <p className="mt-3 text-slate-500">
              Fill out the form and we&apos;ll get back to you shortly.
            </p>

            <form className="mt-10 space-y-6">

              <input
                type="text"
                placeholder="Full Name"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition focus:border-orange-500"
              />

              <input
                type="email"
                placeholder="Email Address"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition focus:border-orange-500"
              />

              <input
                type="text"
                placeholder="Subject"
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition focus:border-orange-500"
              />

              <textarea
                rows={6}
                placeholder="Your Message..."
                className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none transition focus:border-orange-500"
              />

              <button
                className="
                  inline-flex
                  items-center
                  gap-3
                  rounded-xl
                  bg-orange-500
                  px-8
                  py-4
                  font-bold
                  text-white
                  transition
                  hover:bg-orange-600
                "
              >
                <Send size={20} />
                Send Message
              </button>

            </form>

          </div>

          {/* Contact Info */}

          <div className="space-y-6">

            {[
              {
                icon: <MapPin size={26} />,
                color: "bg-orange-100 text-orange-500",
                title: "Address",
                text: "Johar Town, Lahore, Pakistan",
              },
              {
                icon: <Phone size={26} />,
                color: "bg-green-100 text-green-600",
                title: "Phone",
                text: "+92 300 1234567",
              },
              {
                icon: <Mail size={26} />,
                color: "bg-blue-100 text-blue-600",
                title: "Email",
                text: "support@flavornest.com",
              },
              {
                icon: <Clock3 size={26} />,
                color: "bg-purple-100 text-purple-600",
                title: "Working Hours",
                text: "Monday - Sunday | 9:00 AM - 11:00 PM",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-3xl bg-white p-8 shadow-lg transition hover:-translate-y-1 hover:shadow-xl"
              >
                <div className="flex items-center gap-5">

                  <div className={`rounded-2xl p-4 ${item.color}`}>
                    {item.icon}
                  </div>

                  <div>

                    <h3 className="text-xl font-bold">
                      {item.title}
                    </h3>

                    <p className="mt-2 text-slate-500">
                      {item.text}
                    </p>

                  </div>

                </div>
              </div>
            ))}

            {/* Social */}

            <div className="rounded-3xl bg-white p-8 shadow-lg">

              <h3 className="text-2xl font-bold">
                Follow Us
              </h3>

              <div className="mt-6 flex gap-5">

                <button className="rounded-full bg-blue-100 p-4 text-blue-600 transition hover:scale-110">
                  <Globe />
                </button>

                <button className="rounded-full bg-pink-100 p-4 text-pink-600 transition hover:scale-110">
                  <Camera />
                </button>

                <button className="rounded-full bg-sky-100 p-4 text-sky-600 transition hover:scale-110">
                  <MessageCircle />
                </button>

              </div>

            </div>

          </div>

        </div>

      </section>

      {/* Map */}

      <section className="pb-24">

        <div className="mx-auto max-w-7xl px-6">

          <div className="overflow-hidden rounded-3xl shadow-xl">

            <iframe
              src="https://www.google.com/maps?q=Lahore,Pakistan&output=embed"
              width="100%"
              height="500"
              loading="lazy"
            />

          </div>

        </div>

      </section>

      {/* FAQ */}

      <section className="bg-white py-24">

        <div className="mx-auto max-w-5xl px-6">

          <h2 className="text-center text-5xl font-extrabold text-slate-900">
            Frequently Asked Questions
          </h2>

          <div className="mt-16 space-y-6">

            {[
              {
                q: "How do I place an order?",
                a: "Browse restaurants, add your favourite dishes to the cart and complete the checkout process.",
              },
              {
                q: "How can I track my order?",
                a: "Visit the Orders page from your account to see live delivery updates.",
              },
              {
                q: "Can I cancel my order?",
                a: "Orders can be cancelled before the restaurant starts preparing them.",
              },
              {
                q: "Do you offer refunds?",
                a: "Yes, refunds are processed according to our refund policy if the order qualifies.",
              },
            ].map((faq) => (
              <div
                key={faq.q}
                className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm transition hover:shadow-md"
              >
                <h3 className="text-xl font-bold text-slate-900">
                  {faq.q}
                </h3>

                <p className="mt-3 leading-7 text-slate-500">
                  {faq.a}
                </p>

              </div>
            ))}

          </div>

        </div>

      </section>

    </main>
  );
}