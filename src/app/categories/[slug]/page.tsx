import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  Utensils,
} from "lucide-react";

import { categories } from "@/data/categories";
import MenuCard from "@/components/restaurant/MenuCard";

type Product = {
  _id: number | string ;
  name: string;
  description: string;
  price: number;
  rating: number;
  category: string;
  restaurant?: string;
  image: string;
};

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000";

async function getProducts(): Promise<Product[]> {
  try {
    const response = await fetch(
      `${API_URL}/api/products`,
      {
        cache: "no-store",
      }
    );

    if (!response.ok) {
      console.error(
        "Failed to fetch products:",
        response.status
      );

      return [];
    }

    const data = await response.json();

    return data.products || [];
  } catch (error) {
    console.error(
      "Customer products fetch error:",
      error
    );

    return [];
  }
}

export default async function CategoryPage({
  params,
}: Props) {
  const { slug } = await params;

  const category = categories.find(
    (cat) =>
      cat.slug.toLowerCase() ===
      slug.toLowerCase()
  );

  if (!category) {
    return (
      <main className="min-h-screen bg-slate-50 px-6 py-24">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-5xl font-extrabold text-slate-900">
            Category Not Found
          </h1>

          <p className="mt-4 text-slate-500">
            No category exists with slug:
            <span className="font-semibold text-orange-500">
              {" "}
              {slug}
            </span>
          </p>

          <Link
            href="/categories"
            className="
              mt-8
              inline-flex
              items-center
              gap-2
              rounded-xl
              bg-orange-500
              px-6
              py-3
              font-semibold
              text-white
              transition
              hover:bg-orange-600
            "
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  const products = await getProducts();

  const filteredProducts = products.filter(
    (product) =>
      product.category.toLowerCase() ===
      slug.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-slate-50">
      {/* Hero */}
      <section className="relative h-[500px] overflow-hidden bg-slate-900">
        {category.image && (
          <Image
            src={category.image}
            alt={category.name}
            fill
            priority
            className="object-cover"
          />
        )}

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-black/80
            via-black/60
            to-black/40
          "
        />

        <div
          className="
            relative
            z-10
            mx-auto
            flex
            h-full
            max-w-7xl
            flex-col
            justify-center
            px-6
          "
        >
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm text-white/80">
            <Link
              href="/"
              className="hover:text-orange-400"
            >
              Home
            </Link>

            <ChevronRight size={16} />

            <Link
              href="/categories"
              className="hover:text-orange-400"
            >
              Categories
            </Link>

            <ChevronRight size={16} />

            <span className="font-semibold text-orange-400">
              {category.name}
            </span>
          </div>

          {/* Back */}
          <Link
            href="/categories"
            className="
              mb-8
              inline-flex
              w-fit
              items-center
              gap-3
              rounded-xl
              bg-white/20
              px-6
              py-3
              text-white
              backdrop-blur-md
              transition
              hover:bg-orange-500
            "
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>

          <h1 className="text-5xl font-extrabold text-white md:text-6xl">
            {category.name}
          </h1>

          <p className="mt-4 max-w-2xl text-lg leading-8 text-slate-200">
            {category.description}
          </p>

          <div className="mt-8 inline-flex w-fit rounded-full bg-orange-500 px-6 py-3 font-semibold text-white">
            {filteredProducts.length} Delicious Dishes
          </div>
        </div>
      </section>

      {/* Products */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6">
          {filteredProducts.length > 0 ? (
            <div
              className="
                grid
                gap-8
                sm:grid-cols-2
                lg:grid-cols-3
                xl:grid-cols-4
              "
            >
              {filteredProducts.map((product) => (
                <MenuCard
                  key={product._id}
                  item={{
                    id: product._id,
                    restaurantId: "",

                    category: product.category,
                    name: product.name,
                    image: product.image,
                    description:
                      product.description,
                    price: product.price,
                    rating: product.rating,
                  }}
                />
              ))}
            </div>
          ) : (
            <div
              className="
                rounded-2xl
                border
                border-dashed
                border-orange-300
                bg-white
                px-6
                py-24
                text-center
              "
            >
              <Utensils
                size={70}
                className="mx-auto text-orange-500"
              />

              <h2 className="mt-8 text-4xl font-bold text-slate-900">
                No Dishes Available
              </h2>

              <p className="mt-4 text-lg text-slate-500">
                There are no dishes in the{" "}
                <span className="font-semibold text-orange-500">
                  {category.name}
                </span>{" "}
                category yet.
              </p>
            </div>
          )}
        </div>
      </section>
    </main>
  );
}