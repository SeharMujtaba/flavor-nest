/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable @next/next/no-img-element */
"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import {
  Plus,
  Pencil,
  Trash2,
  RefreshCw,
  X,
  Save,
} from "lucide-react";

type Product = {
  _id: string;
  name: string;
  description?: string;
  price: number;
  rating?: number;
  category?: string;
  restaurant?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
};

type EditForm = {
  name: string;
  description: string;
  price: string;
  rating: string;
  category: string;
  restaurant: string;
  image: string;
};

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const emptyForm: EditForm = {
  name: "",
  description: "",
  price: "",
  rating: "",
  category: "",
  restaurant: "",
  image: "",
};

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const [error, setError] = useState("");

  const [deleteLoading, setDeleteLoading] = useState("");

  const [editingProduct, setEditingProduct] =
    useState<Product | null>(null);

  const [editForm, setEditForm] =
    useState<EditForm>(emptyForm);

  const [saving, setSaving] = useState(false);

  /*
   * ============================
   * FETCH PRODUCTS
   * ============================
   */

  const fetchProducts = async (showRefresh = false) => {
    try {
      if (showRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }

      setError("");

      const response = await fetch(
        `${API_URL}/api/products`,
        {
          method: "GET",
          cache: "no-store",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to fetch products"
        );
      }

      setProducts(data.products || []);
    } catch (error) {
      console.error("Fetch products error:", error);

      setError(
        error instanceof Error
          ? error.message
          : "Failed to fetch products"
      );
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  /*
   * ============================
   * SEARCH
   * ============================
   */

  const filteredProducts = useMemo(() => {
    const value = search.toLowerCase().trim();

    if (!value) {
      return products;
    }

    return products.filter((product) => {
      const name =
        product.name?.toLowerCase() || "";

      const category =
        product.category?.toLowerCase() || "";

      const restaurant =
        product.restaurant?.toLowerCase() || "";

      const description =
        product.description?.toLowerCase() || "";

      return (
        name.includes(value) ||
        category.includes(value) ||
        restaurant.includes(value) ||
        description.includes(value)
      );
    });
  }, [products, search]);

  /*
   * ============================
   * DELETE PRODUCT
   * ============================
   */

  const deleteProduct = async (id: string) => {
    const product = products.find(
      (item) => item._id === id
    );

    const confirmed = window.confirm(
      `Are you sure you want to delete "${product?.name || "this product"}"?`
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleteLoading(id);

      const response = await fetch(
        `${API_URL}/api/products/${id}`,
        {
          method: "DELETE",
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to delete product"
        );
      }

      setProducts((currentProducts) =>
        currentProducts.filter(
          (item) => item._id !== id
        )
      );
    } catch (error) {
      console.error("Delete product error:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to delete product"
      );
    } finally {
      setDeleteLoading("");
    }
  };

  /*
   * ============================
   * OPEN EDIT MODAL
   * ============================
   */

  const openEditModal = (product: Product) => {
    setEditingProduct(product);

    setEditForm({
      name: product.name || "",
      description: product.description || "",
      price:
        product.price !== undefined
          ? String(product.price)
          : "",
      rating:
        product.rating !== undefined
          ? String(product.rating)
          : "",
      category: product.category || "",
      restaurant: product.restaurant || "",
      image: product.image || "",
    });
  };

  /*
   * ============================
   * CLOSE EDIT MODAL
   * ============================
   */

  const closeEditModal = () => {
    if (saving) {
      return;
    }

    setEditingProduct(null);
    setEditForm(emptyForm);
  };

  /*
   * ============================
   * UPDATE FORM
   * ============================
   */

  const updateForm = (
    field: keyof EditForm,
    value: string
  ) => {
    setEditForm((current) => ({
      ...current,
      [field]: value,
    }));
  };

  /*
   * ============================
   * UPDATE PRODUCT
   * ============================
   */

  const updateProduct = async (
    event: React.FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();

    if (!editingProduct) {
      return;
    }

    if (!editForm.name.trim()) {
      window.alert("Product name is required.");
      return;
    }

    if (!editForm.price.trim()) {
      window.alert("Product price is required.");
      return;
    }

    if (!editForm.category.trim()) {
      window.alert("Category is required.");
      return;
    }

    if (!editForm.restaurant.trim()) {
      window.alert("Restaurant is required.");
      return;
    }

    try {
      setSaving(true);

      const response = await fetch(
        `${API_URL}/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: editForm.name.trim(),
            description:
              editForm.description.trim(),
            price: Number(editForm.price),
            rating: editForm.rating
              ? Number(editForm.rating)
              : 0,
            category: editForm.category.trim(),
            restaurant:
              editForm.restaurant.trim(),
            image: editForm.image.trim(),
          }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(
          data.message || "Failed to update product"
        );
      }

      const updatedProduct =
        data.product || data;

      setProducts((currentProducts) =>
        currentProducts.map((product) =>
          product._id === editingProduct._id
            ? updatedProduct
            : product
        )
      );

      closeEditModal();
    } catch (error) {
      console.error("Update product error:", error);

      window.alert(
        error instanceof Error
          ? error.message
          : "Failed to update product"
      );
    } finally {
      setSaving(false);
    }
  };

  /*
   * ============================
   * RENDER
   * ============================
   */

  return (
    <div className="space-y-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

        <div>
          <h1 className="text-4xl font-extrabold text-slate-900">
            Products
          </h1>

          <p className="mt-2 text-slate-500">
            Manage food products stored in MongoDB.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">

          <button
            type="button"
            onClick={() => fetchProducts(true)}
            disabled={refreshing}
            className="inline-flex items-center justify-center rounded-xl border border-slate-300 bg-white px-5 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:cursor-not-allowed disabled:opacity-60"
          >
            <RefreshCw
              size={19}
              className={`mr-2 ${
                refreshing ? "animate-spin" : ""
              }`}
            />

            Refresh
          </button>

          <Link
            href="/admin/products/add"
            className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600"
          >
            <Plus
              size={20}
              className="mr-2"
            />

            Add Product
          </Link>

        </div>

      </div>

      {/* ================= SEARCH ================= */}

      <div className="rounded-2xl bg-white p-5 shadow-sm">

        <div className="flex flex-col gap-3 md:flex-row">

          <div className="relative flex-1">

            <input
              type="text"
              value={search}
              onChange={(event) =>
                setSearch(event.target.value)
              }
              placeholder="Search by product, category, restaurant..."
              className="w-full rounded-xl border border-slate-300 bg-white py-3 pl-12 pr-5 outline-none transition focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
            />

          </div>

          {search && (
            <button
              type="button"
              onClick={() => setSearch("")}
              className="rounded-xl border border-slate-300 px-5 py-3 font-semibold text-slate-600 transition hover:bg-slate-50"
            >
              Clear
            </button>
          )}

        </div>

      </div>

      {/* ================= ERROR ================= */}

      {error && (
        <div className="rounded-2xl border border-red-200 bg-red-50 p-5">

          <p className="font-bold text-red-700">
            Failed to load products
          </p>

          <p className="mt-1 text-sm text-red-600">
            {error}
          </p>

          <button
            type="button"
            onClick={() => fetchProducts()}
            className="mt-4 rounded-lg bg-red-600 px-5 py-2 font-semibold text-white transition hover:bg-red-700"
          >
            Try Again
          </button>

        </div>
      )}

      {/* ================= LOADING ================= */}

      {loading && !error && (
        <div className="rounded-2xl bg-white p-12 text-center shadow-sm">

          <div className="mx-auto h-10 w-10 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />

          <p className="mt-4 font-medium text-slate-500">
            Loading products from MongoDB...
          </p>

        </div>
      )}

      {/* ================= TABLE ================= */}

      {!loading && !error && (
        <div className="overflow-x-auto rounded-2xl bg-white shadow-sm">

          <table className="w-full min-w-[1100px]">

            <thead className="bg-slate-100">

              <tr>

                <th className="p-5 text-left">
                  Image
                </th>

                <th className="p-5 text-left">
                  Product
                </th>

                <th className="p-5 text-left">
                  Category
                </th>

                <th className="p-5 text-left">
                  Restaurant
                </th>

                <th className="p-5 text-left">
                  Price
                </th>

                <th className="p-5 text-left">
                  Rating
                </th>

                <th className="p-5 text-center">
                  Actions
                </th>

              </tr>

            </thead>

            <tbody>

              {filteredProducts.length > 0 ? (

                filteredProducts.map((product) => (

                  <tr
                    key={product._id}
                    className="border-t border-slate-200 transition hover:bg-slate-50"
                  >

                    {/* IMAGE */}

                    <td className="p-4">

                      <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-xl bg-slate-100">

                        {product.image ? (

                          <img
                            src={product.image}
                            alt={product.name}
                            className="h-full w-full object-cover"
                            onError={(event) => {
                              event.currentTarget.style.display =
                                "none";
                            }}
                          />

                        ) : (

                          <span className="text-xs text-slate-400">
                            No image
                          </span>

                        )}

                      </div>

                    </td>

                    {/* PRODUCT */}

                    <td className="p-4">

                      <p className="font-bold text-slate-900">
                        {product.name}
                      </p>

                      {product.description && (
                        <p className="mt-1 max-w-xs truncate text-sm text-slate-500">
                          {product.description}
                        </p>
                      )}

                    </td>

                    {/* CATEGORY */}

                    <td className="p-4 text-slate-700">
                      {product.category || "—"}
                    </td>

                    {/* RESTAURANT */}

                    <td className="p-4 text-slate-700">
                      {product.restaurant || "—"}
                    </td>

                    {/* PRICE */}

                    <td className="p-4 font-bold text-slate-900">
                      Rs. {product.price}
                    </td>

                    {/* RATING */}

                    <td className="p-4">
                      <span className="inline-flex items-center gap-1">
                        ⭐ {product.rating ?? 0}
                      </span>
                    </td>

                    {/* ACTIONS */}

                    <td className="p-4">

                      <div className="flex justify-center gap-3">

                        <button
                          type="button"
                          title="Edit product"
                          onClick={() =>
                            openEditModal(product)
                          }
                          className="rounded-lg bg-blue-100 p-2 text-blue-600 transition hover:bg-blue-600 hover:text-white"
                        >
                          <Pencil size={18} />
                        </button>

                        <button
                          type="button"
                          title="Delete product"
                          disabled={
                            deleteLoading ===
                            product._id
                          }
                          onClick={() =>
                            deleteProduct(product._id)
                          }
                          className="rounded-lg bg-red-100 p-2 text-red-600 transition hover:bg-red-600 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          {deleteLoading ===
                          product._id ? (
                            <div className="h-[18px] w-[18px] animate-spin rounded-full border-2 border-red-500 border-t-transparent" />
                          ) : (
                            <Trash2 size={18} />
                          )}
                        </button>

                      </div>

                    </td>

                  </tr>

                ))

              ) : (

                <tr>

                  <td
                    colSpan={7}
                    className="py-16 text-center"
                  >

                    <div className="text-4xl">
                      🍽️
                    </div>

                    <p className="mt-3 text-lg font-semibold text-slate-700">
                      No products found
                    </p>

                    <p className="mt-1 text-sm text-slate-500">
                      {search
                        ? "Try a different search."
                        : "Add your first product."}
                    </p>

                  </td>

                </tr>

              )}

            </tbody>

          </table>

        </div>
      )}

      {/* ================= COUNT ================= */}

      {!loading && !error && (
        <div className="flex flex-col gap-2 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between">

          <p>
            Showing{" "}
            <span className="font-bold text-slate-900">
              {filteredProducts.length}
            </span>{" "}
            of{" "}
            <span className="font-bold text-slate-900">
              {products.length}
            </span>{" "}
            products from MongoDB.
          </p>

          {search && (
            <p>
              Search:
              <span className="ml-1 font-semibold text-orange-600">
                {search}
              </span>
            </p>
          )}

        </div>
      )}

      {/* =====================================================
          EDIT PRODUCT MODAL
      ===================================================== */}

      {editingProduct && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closeEditModal();
            }
          }}
        >

          <div className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white shadow-2xl">

            {/* MODAL HEADER */}

            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-slate-200 bg-white p-6">

              <div>
                <h2 className="text-2xl font-extrabold text-slate-900">
                  Edit Product
                </h2>

                <p className="mt-1 text-sm text-slate-500">
                  Update product information in MongoDB.
                </p>
              </div>

              <button
                type="button"
                onClick={closeEditModal}
                disabled={saving}
                className="rounded-lg p-2 text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
              >
                <X size={22} />
              </button>

            </div>

            {/* FORM */}

            <form
              onSubmit={updateProduct}
              className="space-y-5 p-6"
            >

              {/* NAME */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Product Name
                </label>

                <input
                  type="text"
                  value={editForm.name}
                  onChange={(event) =>
                    updateForm(
                      "name",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  placeholder="Classic Burger"
                />

              </div>

              {/* DESCRIPTION */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Description
                </label>

                <textarea
                  value={editForm.description}
                  onChange={(event) =>
                    updateForm(
                      "description",
                      event.target.value
                    )
                  }
                  rows={3}
                  className="w-full resize-none rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  placeholder="Product description..."
                />

              </div>

              {/* PRICE + RATING */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Price
                  </label>

                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    value={editForm.price}
                    onChange={(event) =>
                      updateForm(
                        "price",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="899"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Rating
                  </label>

                  <input
                    type="number"
                    min="0"
                    max="5"
                    step="0.1"
                    value={editForm.rating}
                    onChange={(event) =>
                      updateForm(
                        "rating",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="4.8"
                  />

                </div>

              </div>

              {/* CATEGORY + RESTAURANT */}

              <div className="grid gap-5 md:grid-cols-2">

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Category
                  </label>

                  <input
                    type="text"
                    value={editForm.category}
                    onChange={(event) =>
                      updateForm(
                        "category",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="Burgers"
                  />

                </div>

                <div>

                  <label className="mb-2 block text-sm font-semibold text-slate-700">
                    Restaurant
                  </label>

                  <input
                    type="text"
                    value={editForm.restaurant}
                    onChange={(event) =>
                      updateForm(
                        "restaurant",
                        event.target.value
                      )
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                    placeholder="Burger Hub"
                  />

                </div>

              </div>

              {/* IMAGE */}

              <div>

                <label className="mb-2 block text-sm font-semibold text-slate-700">
                  Image URL
                </label>

                <input
                  type="text"
                  value={editForm.image}
                  onChange={(event) =>
                    updateForm(
                      "image",
                      event.target.value
                    )
                  }
                  className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none focus:border-orange-500 focus:ring-4 focus:ring-orange-100"
                  placeholder="/images/burger.jpg"
                />

                {editForm.image && (
                  <div className="mt-3">

                    <p className="mb-2 text-xs text-slate-500">
                      Image preview
                    </p>

                    <img
                      src={editForm.image}
                      alt="Preview"
                      className="h-28 w-28 rounded-xl object-cover"
                    />

                  </div>
                )}

              </div>

              {/* BUTTONS */}

              <div className="flex flex-col-reverse gap-3 pt-3 sm:flex-row sm:justify-end">

                <button
                  type="button"
                  onClick={closeEditModal}
                  disabled={saving}
                  className="rounded-xl border border-slate-300 px-6 py-3 font-semibold text-slate-700 transition hover:bg-slate-50 disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving}
                  className="inline-flex items-center justify-center rounded-xl bg-orange-500 px-6 py-3 font-semibold text-white transition hover:bg-orange-600 disabled:cursor-not-allowed disabled:opacity-60"
                >

                  {saving ? (
                    <>
                      <div className="mr-2 h-5 w-5 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save
                        size={19}
                        className="mr-2"
                      />
                      Save Changes
                    </>
                  )}

                </button>

              </div>

            </form>

          </div>

        </div>
      )}

    </div>
  );
}