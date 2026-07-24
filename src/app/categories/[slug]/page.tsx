import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Utensils } from "lucide-react";

import { categories } from "@/data/categories";
import { menu } from "@/data/menu";
import MenuCard from "@/components/restaurant/MenuCard";

type Props = {
  params: Promise<{
    slug: string;
  }>;
};

export default async function CategoryPage({ params }: Props) {
  const { slug } = await params;

  console.log("Category Slug:", slug);

  const category = categories.find(
    (cat) => cat.slug.toLowerCase() === slug.toLowerCase()
  );

  if (!category) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-[#FAFAF7]">
        <div className="text-center">
          <h1 className="text-5xl font-bold text-slate-900">
            Category Not Found
          </h1>

          <p className="mt-4 text-slate-500">
            No category exists with slug:
            <span className="font-semibold text-orange-500"> {slug}</span>
          </p>

          <Link
            href="/categories"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <ArrowLeft size={18} />
            Back to Categories
          </Link>
        </div>
      </main>
    );
  }

  const filteredMenu = menu.filter(
    (item) => item.category.toLowerCase() === slug.toLowerCase()
  );

  return (
    <main className="min-h-screen bg-[#FAFAF7]">

      {/* Hero */}

      <section className="relative h-[360px] overflow-hidden">

        <Image
          src={category.image}
          alt={category.name}
          fill
          priority
          className="object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

        <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col justify-center px-6">

          {/* Breadcrumb */}

          <div className="mb-6 flex items-center gap-2 text-sm text-white/80">

            <Link href="/" className="hover:text-orange-400">
              Home
            </Link>

            <ChevronRight size={16} />

            <Link href="/categories" className="hover:text-orange-400">
              Categories
            </Link>

            <ChevronRight size={16} />

            <span className="font-semibold text-orange-400">
              {category.name}
            </span>

          </div>

          {/* Back Button */}

          <Link
            href="/categories"
            className="mb-8 inline-flex w-fit items-center gap-3 rounded-xl bg-white/20 px-6 py-3 text-white backdrop-blur-md transition hover:bg-orange-500"
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
            {filteredMenu.length} Delicious Dishes
          </div>

        </div>

      </section>

      {/* Menu */}

      <section className="py-20">

        <div className="mx-auto max-w-7xl px-6">

          {filteredMenu.length > 0 ? (

            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-4">

              {filteredMenu.map((item) => (
                <MenuCard
                  key={item.id}
                  item={item}
                />
              ))}

            </div>

          ) : (

            <div className="rounded-2xl border border-dashed border-orange-300 bg-white py-24 text-center">

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