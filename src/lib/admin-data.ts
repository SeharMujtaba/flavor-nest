export type AdminOrderStatus =
  | "Delivered"
  | "Preparing"
  | "Pending"
  | "Cancelled";

export type AdminOrder = {
  id: string;
  customerId: number;
  customer: string;
  restaurant: string;
  total: string;
  status: AdminOrderStatus;
  date: string;
  items: string[];
  address: string;
  phone: string;
};

export type AdminCustomer = {
  id: number;
  name: string;
  email: string;
  phone: string;
  orders: number;
  spending: number;
  status: "Active" | "Blocked";
};

export type AdminProduct = {
  id: number;
  name: string;
  category: string;
  price: number;
  rating: number;
};

const customers: AdminCustomer[] = [
  {
    id: 1,
    name: "Ahmed Ali",
    email: "ahmed@gmail.com",
    phone: "+92 300 1234567",
    orders: 18,
    spending: 28450,
    status: "Active",
  },
  {
    id: 2,
    name: "Fatima Khan",
    email: "fatima@gmail.com",
    phone: "+92 301 9876543",
    orders: 11,
    spending: 16200,
    status: "Blocked",
  },
  {
    id: 3,
    name: "Usman Tariq",
    email: "usman@gmail.com",
    phone: "+92 333 7654321",
    orders: 24,
    spending: 43700,
    status: "Active",
  },
  {
    id: 4,
    name: "Ayesha Malik",
    email: "ayesha@gmail.com",
    phone: "+92 321 5551234",
    orders: 9,
    spending: 12500,
    status: "Active",
  },
];

const orders: AdminOrder[] = [
  {
    id: "#1001",
    customerId: 1,
    customer: "Ahmed Ali",
    restaurant: "Burger Hub",
    total: "Rs. 2,450",
    status: "Delivered",
    date: "06 Aug 2026",
    items: ["Classic Burger x2", "Fries x1", "Coke x2"],
    address: "Islamabad, Pakistan",
    phone: "+92 300 1234567",
  },
  {
    id: "#1002",
    customerId: 2,
    customer: "Fatima Khan",
    restaurant: "Pizza Palace",
    total: "Rs. 1,850",
    status: "Preparing",
    date: "06 Aug 2026",
    items: ["Chicken Pizza x1", "Garlic Bread x1"],
    address: "Rawalpindi, Pakistan",
    phone: "+92 301 9876543",
  },
  {
    id: "#1003",
    customerId: 3,
    customer: "Usman Tariq",
    restaurant: "Desi Kitchen",
    total: "Rs. 950",
    status: "Pending",
    date: "05 Aug 2026",
    items: ["Chicken Karahi x1", "Naan x3"],
    address: "Lahore, Pakistan",
    phone: "+92 333 7654321",
  },
  {
    id: "#1004",
    customerId: 4,
    customer: "Ayesha Malik",
    restaurant: "Chinese Wok",
    total: "Rs. 3,250",
    status: "Cancelled",
    date: "04 Aug 2026",
    items: ["Chicken Chow Mein x2", "Spring Rolls x2"],
    address: "Karachi, Pakistan",
    phone: "+92 321 5551234",
  },
];

const products: AdminProduct[] = [
  {
    id: 1,
    name: "Classic Burger",
    category: "Burgers",
    price: 899,
    rating: 4.8,
  },
  {
    id: 2,
    name: "Chicken Pizza",
    category: "Pizza",
    price: 1299,
    rating: 4.7,
  },
  {
    id: 3,
    name: "Chicken Karahi",
    category: "Pakistani",
    price: 1599,
    rating: 4.9,
  },
  {
    id: 4,
    name: "Chicken Chow Mein",
    category: "Chinese",
    price: 950,
    rating: 4.6,
  },
];

export function getOrders() {
  return orders;
}

export function getCustomers() {
  return customers;
}

export function getProducts() {
  return products;
}

export function getOrderById(id: string) {
  const normalizedId = id.startsWith("#") ? id : `#${id}`;

  return orders.find((order) => order.id === normalizedId);
}

export function getCustomerById(id: string) {
  return customers.find((customer) => customer.id === Number(id));
}