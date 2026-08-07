/* eslint-disable @typescript-eslint/no-require-imports */
require("dotenv").config();

const mongoose = require("mongoose");
const Product = require("./models/Product");

const products = [
  {
    legacyId: 1,
    restaurantId: 1,
    category: "burgers",
    name: "Classic Cheeseburger",
    image: "/images/menu/burger1.jpg",
    description:
      "Juicy halal beef with cheddar cheese and fresh vegetables.",
    price: 899,
    rating: 4.8,
  },

  {
    legacyId: 2,
    restaurantId: 1,
    category: "burgers",
    name: "Double Beef Burger",
    image: "/images/menu/burger2.jpg",
    description:
      "Double beef patties with signature sauce.",
    price: 1299,
    rating: 4.9,
  },

  {
    legacyId: 3,
    restaurantId: 1,
    category: "burgers",
    name: "Chicken Burger",
    image: "/images/menu/burger3.jpg",
    description:
      "Crispy chicken burger with lettuce and mayo.",
    price: 799,
    rating: 4.7,
  },

  {
    legacyId: 4,
    restaurantId: 1,
    category: "burgers",
    name: "French Fries",
    image: "/images/menu/fries.jpg",
    description:
      "Golden crispy fries with ketchup.",
    price: 399,
    rating: 4.6,
  },

  {
    legacyId: 5,
    restaurantId: 2,
    category: "pizza",
    name: "Pepperoni Pizza",
    image: "/images/menu/pizza1.jpg",
    description:
      "Loaded with mozzarella and pepperoni.",
    price: 1699,
    rating: 4.9,
  },

  {
    legacyId: 6,
    restaurantId: 2,
    category: "pizza",
    name: "Chicken Fajita Pizza",
    image: "/images/menu/pizza2.jpg",
    description:
      "Chicken, capsicum and mozzarella.",
    price: 1599,
    rating: 4.8,
  },

  {
    legacyId: 7,
    restaurantId: 4,
    category: "chinese",
    name: "Chicken Chow Mein",
    image: "/images/menu/chowmein.jpg",
    description:
      "Stir-fried noodles with chicken and vegetables.",
    price: 899,
    rating: 4.7,
  },

  {
    legacyId: 8,
    restaurantId: 4,
    category: "chinese",
    name: "Chicken Fried Rice",
    image: "/images/menu/fried-rice.jpg",
    description:
      "Classic Chinese fried rice.",
    price: 799,
    rating: 4.8,
  },

  {
    legacyId: 9,
    restaurantId: 6,
    category: "pakistani",
    name: "Chicken Biryani",
    image: "/images/menu/biryani.jpg",
    description:
      "Traditional Karachi style chicken biryani.",
    price: 699,
    rating: 4.9,
  },

  {
    legacyId: 10,
    restaurantId: 6,
    category: "pakistani",
    name: "Chicken Karahi",
    image: "/images/menu/karahi.jpg",
    description:
      "Spicy chicken karahi cooked in tomato gravy.",
    price: 1499,
    rating: 4.8,
  },

  {
    legacyId: 11,
    restaurantId: 5,
    category: "italian",
    name: "Creamy Alfredo Pasta",
    image: "/images/menu/alfredo.jpg",
    description:
      "Creamy pasta with grilled chicken.",
    price: 1199,
    rating: 4.8,
  },

  {
    legacyId: 12,
    restaurantId: 5,
    category: "italian",
    name: "Lasagna",
    image: "/images/menu/lasagna.jpg",
    description:
      "Layers of pasta with rich meat sauce.",
    price: 1399,
    rating: 4.9,
  },

  {
    legacyId: 13,
    restaurantId: 3,
    category: "bbq",
    name: "Chicken Tikka",
    image: "/images/menu/tikka.jpg",
    description:
      "Charcoal grilled chicken tikka.",
    price: 599,
    rating: 4.8,
  },

  {
    legacyId: 14,
    restaurantId: 3,
    category: "bbq",
    name: "Seekh Kebab",
    image: "/images/menu/seekh-kebab.jpg",
    description:
      "Juicy beef seekh kebabs.",
    price: 699,
    rating: 4.9,
  },

  {
    legacyId: 15,
    restaurantId: 5,
    category: "desserts",
    name: "Chocolate Brownie",
    image: "/images/menu/brownie.jpg",
    description:
      "Rich chocolate brownie served warm.",
    price: 499,
    rating: 4.8,
  },

  {
    legacyId: 16,
    restaurantId: 5,
    category: "desserts",
    name: "Ice Cream Sundae",
    image: "/images/menu/sundae.jpg",
    description:
      "Vanilla ice cream with chocolate syrup.",
    price: 599,
    rating: 4.9,
  },

  {
    legacyId: 17,
    restaurantId: 5,
    category: "drinks",
    name: "Fresh Mango Shake",
    image: "/images/menu/mango-shake.jpg",
    description:
      "Fresh mangoes blended with milk.",
    price: 399,
    rating: 4.9,
  },

  {
    legacyId: 18,
    restaurantId: 5,
    category: "drinks",
    name: "Cold Coffee",
    image: "/images/menu/cold-coffee.jpg",
    description:
      "Creamy chilled coffee with whipped cream.",
    price: 449,
    rating: 4.8,
  },
];

async function seedProducts() {
  try {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI is missing from .env");
    }

    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    for (const product of products) {
      await Product.findOneAndUpdate(
        { legacyId: product.legacyId },
        {
          ...product,
          available: true,
        },
        {
          upsert: true,
          new: true,
          setDefaultsOnInsert: true,
        }
      );
    }

    console.log(
      `Successfully seeded ${products.length} products.`
    );

    await mongoose.disconnect();

    console.log("MongoDB disconnected");

    process.exit(0);
  } catch (error) {
    console.error("Seed error:", error);

    await mongoose.disconnect();

    process.exit(1);
  }
}

seedProducts();