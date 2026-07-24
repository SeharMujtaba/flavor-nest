import Container from "@/components/common/Container";
import CategoryCard from "./CategoryCard";

const categories = [
  {
    title: "Burgers",
    description: "Juicy burgers & combos",
    image: "/images/categories/burger.jpg",
  },
  {
    title: "Pizza",
    description: "Fresh cheesy pizzas",
    image: "/images/categories/pizza.jpg",
  },
  {
    title: "Asian",
    description: "Noodles & Asian cuisine",
    image: "/images/categories/asian.jpg",
  },
  {
    title: "Desserts",
    description: "Sweet treats & cakes",
    image: "/images/categories/dessert.jpg",
  },
  {
    title: "Healthy",
    description: "Fresh healthy meals",
    image: "/images/categories/healthy.jpg",
  },
  {
    title: "Drinks",
    description: "Cold drinks & juices",
    image: "/images/categories/drinks.jpg",
  },
];

export default function Categories() {
  return (
    <section
      className="
        relative
        overflow-hidden

        bg-gradient-to-b
        from-[#FFFDFB]
        via-[#FFF9F5]
        to-[#FFF5EE]

        pt-36
        pb-36
      "
    >
      {/* Top Left Glow */}
      <div
        className="
          absolute
          -top-24
          -left-24

          h-[320px]
          w-[320px]

          rounded-full

          bg-orange-200/25

          blur-[140px]
        "
      />

      {/* Bottom Right Glow */}
      <div
        className="
          absolute
          -right-24
          bottom-0

          h-[360px]
          w-[360px]

          rounded-full

          bg-yellow-200/25

          blur-[150px]
        "
      />

      {/* Soft Grid */}
      <div
        className="
          absolute
          inset-0
          opacity-[0.03]
          [background-image:linear-gradient(rgba(15,23,42,.15)_1px,transparent_1px),linear-gradient(90deg,rgba(15,23,42,.15)_1px,transparent_1px)]
          [background-size:70px_70px]
        "
      />

      <Container>
        {/* Heading */}
        <div
          className="
            relative
            z-10
            mx-auto
            max-w-6.5xl
            text-center
          "
        >
          <span
            className="
              inline-flex
              items-center

              rounded-[5px]

              bg-orange-500

              px-5
              py-2.5

              text-lg
              font-bold

              tracking-wide

              text-white
            "
          >
            🍽 Explore Categories
          </span>

          <h2
            className="
              mt-7

              text-4xl
              font-extrabold
              leading-tight

              text-slate-900

              md:text-5xl
              lg:text-6xl
            "
          >
            Choose Your
            <span className="text-orange-500"> Favorite Food</span>
          </h2>

          <p
            className="
              mx-auto
              mt-6
              max-w-6xl

              text-align-center
              text-lg
              leading-8

              text-slate-600
            "
          >
            Explore delicious meals from different cuisines prepared by
            Pakistan&apos;s top restaurants. From burgers and pizzas to healthy
            meals and desserts, find your next favorite dish.
          </p>
        </div>

        {/* Cards */}
        <div
          className="
            relative
            z-10

            mt-20

            grid
            gap-8

            sm:grid-cols-2
            lg:grid-cols-3
          "
        >
          {categories.map((item) => (
            <CategoryCard
              key={item.title}
              {...item}
            />
          ))}
        </div>
      </Container>
    </section>
  );
}