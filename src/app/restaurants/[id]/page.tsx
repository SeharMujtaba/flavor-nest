import { notFound } from "next/navigation";

import RestaurantHeader from "@/components/restaurant/RestaurantHeader";
import RestaurantInfo from "@/components/restaurant/RestaurantInfo";
import RestaurantMenu from "@/components/restaurant/RestaurantMenu";

import { restaurants } from "@/data/restaurants";

type PageProps = {
  params: Promise<{
    id: string;
  }>;
};

export default async function RestaurantPage({
  params,
}: PageProps) {
  const { id } = await params;

  const restaurant = restaurants.find(
    (item) => item.id === Number(id)
  );

  if (!restaurant) {
    notFound();
  }

  return (
    <main
      className="
        min-h-screen

        bg-gradient-to-b
        from-[#FFFDFB]
        via-[#FAFAF7]
        to-[#FFF7F2]
      "
    >
      <RestaurantHeader restaurant={restaurant} />

      <div className="py-8">
        <RestaurantInfo restaurant={restaurant} />
      </div>

      <RestaurantMenu restaurant={restaurant} />
    </main>
  );
}