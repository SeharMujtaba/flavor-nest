"use client";

import {
  createContext,
  useContext,
  useState,
  ReactNode,
} from "react";

export type CartItem = {
  id: string | number;
  name: string;
  image: string;
  description: string;
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];

  addToCart: (
    item: Omit<CartItem, "quantity">
  ) => void;

  removeFromCart: (id: string | number) => void;

  increaseQuantity: (id: string | number) => void;

  decreaseQuantity: (id: string | number) => void;

  clearCart: () => void;

  totalItems: number;

  totalPrice: number;

  subtotal: number;

  orderId: string | null;

  setOrderId: (id: string | null) => void;
};

const CartContext =
  createContext<CartContextType | undefined>(
    undefined
  );

export function CartProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [cart, setCart] = useState<CartItem[]>([]);

  const [orderId, setOrderId] = useState<
    string | null
  >(null);

  // ==============================
  // ADD TO CART
  // ==============================

  const addToCart = (
    item: Omit<CartItem, "quantity">
  ) => {
    setCart((previousCart) => {
      const existingItem = previousCart.find(
        (cartItem) =>
          String(cartItem.id) === String(item.id)
      );

      if (existingItem) {
        return previousCart.map((cartItem) =>
          String(cartItem.id) === String(item.id)
            ? {
                ...cartItem,
                quantity: cartItem.quantity + 1,
              }
            : cartItem
        );
      }

      return [
        ...previousCart,
        {
          ...item,
          quantity: 1,
        },
      ];
    });
  };

  // ==============================
  // REMOVE FROM CART
  // ==============================

  const removeFromCart = (
    id: string | number
  ) => {
    setCart((previousCart) =>
      previousCart.filter(
        (item) =>
          String(item.id) !== String(id)
      )
    );
  };

  // ==============================
  // INCREASE QUANTITY
  // ==============================

  const increaseQuantity = (
    id: string | number
  ) => {
    setCart((previousCart) =>
      previousCart.map((item) =>
        String(item.id) === String(id)
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item
      )
    );
  };

  // ==============================
  // DECREASE QUANTITY
  // ==============================

  const decreaseQuantity = (
    id: string | number
  ) => {
    setCart((previousCart) =>
      previousCart
        .map((item) =>
          String(item.id) === String(id)
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item
        )
        .filter((item) => item.quantity > 0)
    );
  };

  // ==============================
  // CLEAR CART
  // ==============================

  const clearCart = () => {
    setCart([]);
  };

  // ==============================
  // TOTAL ITEMS
  // ==============================

  const totalItems = cart.reduce(
    (total, item) =>
      total + item.quantity,
    0
  );

  // ==============================
  // TOTAL PRICE
  // ==============================

  const totalPrice = cart.reduce(
    (total, item) =>
      total + item.price * item.quantity,
    0
  );

  const subtotal = totalPrice;

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        increaseQuantity,
        decreaseQuantity,
        clearCart,
        totalItems,
        totalPrice,
        subtotal,
        orderId,
        setOrderId,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error(
      "useCart must be used inside CartProvider"
    );
  }

  return context;
}