const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "https://flavor-nest-403w.onrender.com";

export type ApiProduct = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  category?: string;
  restaurant?: string;
  image?: string;
  available?: boolean;
  createdAt?: string;
  updatedAt?: string;
};

type ProductsResponse = {
  success: boolean;
  products: ApiProduct[];
  message?: string;
};

type ProductResponse = {
  success: boolean;
  product: ApiProduct;
  message?: string;
};

export async function getProducts(): Promise<ApiProduct[]> {
  const response = await fetch(
    `${API_URL}/api/products`,
    {
      cache: "no-store",
    }
  );

  const data: ProductsResponse =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch products"
    );
  }

  return data.products;
}

export async function getProduct(
  id: string
): Promise<ApiProduct> {
  const response = await fetch(
    `${API_URL}/api/products/${id}`,
    {
      cache: "no-store",
    }
  );

  const data: ProductResponse =
    await response.json();

  if (!response.ok) {
    throw new Error(
      data.message || "Failed to fetch product"
    );
  }

  return data.product;
}