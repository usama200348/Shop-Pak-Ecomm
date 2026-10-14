require("dotenv").config();
const bcrypt = require("bcryptjs");

const connectDB = require("./config/db");

const User = require("./model/User.model");
const Product = require("./model/Product");
const Order = require("./model/Order");

const seedData = async () => {
  try {
    await connectDB();

    // Delete old data
    await Order.deleteMany();
    await Product.deleteMany();
    await User.deleteMany();

    // ================= USERS =================
    const admin = await User.create({
      name: "Admin",
      email: "admin@test.com",
      password: await bcrypt.hash("admin123", 10),
      role: "admin",
      verified: true,
    });

    const user1 = await User.create({
      name: "Muhammad Usama",
      email: "usama@test.com",
      password: await bcrypt.hash("user123", 10),
      role: "user",
      verified: true,
    });

    const user2 = await User.create({
      name: "Ali Khan",
      email: "ali@test.com",
      password: await bcrypt.hash("user123", 10),
      role: "user",
      verified: true,
    });

    // ================= PRODUCTS =================
    const products = await Product.insertMany([
      {
        name: "iPhone 16 Pro Max",
        description: "Apple flagship smartphone",
        price: 189999,
        category: "Smartphones",
        stock: 15,
        images:
          "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9",
      },
      {
        name: "Samsung Galaxy S25 Ultra",
        description: "Samsung premium flagship",
        price: 174999,
        category: "Smartphones",
        stock: 20,
        images:
          "https://images.unsplash.com/photo-1598327105666-5b89351aff97",
      },
      {
        name: "MacBook Air M4",
        description: "Apple M4 Laptop",
        price: 329999,
        category: "Laptop",
        stock: 8,
        images:
          "https://images.unsplash.com/photo-1517336714739-489689fd1ca8",
      },
      {
        name: "Sony WH-1000XM5",
        description: "Noise Cancelling Headphones",
        price: 89999,
        category: "Accessories",
        stock: 25,
        images:
          "https://images.unsplash.com/photo-1505740420928-5e560c06d30e",
      },
      {
        name: "Apple Watch Series 10",
        description: "Smart Watch",
        price: 129999,
        category: "Wearables",
        stock: 12,
        images:
          "https://images.unsplash.com/photo-1546868871-7041f2a55e12",
      },
    ]);

    // ================= ORDERS =================
    await Order.insertMany([
      {
        user: user1._id,
        items: [
          {
            productId: products[0]._id,
            qty: 1,
            price: products[0].price,
          },
        ],
        totalAmount: products[0].price,
        address: {
          fullName: "Muhammad Usama",
          street: "House 1105",
          city: "Karachi",
          postalCode: "75290",
          country: "Pakistan",
        },
        paymentId: "PAY100001",
        status: "pending",
      },
      {
        user: user2._id,
        items: [
          {
            productId: products[2]._id,
            qty: 1,
            price: products[2].price,
          },
        ],
        totalAmount: products[2].price,
        address: {
          fullName: "Ali Khan",
          street: "Johar Town",
          city: "Lahore",
          postalCode: "54000",
          country: "Pakistan",
        },
        paymentId: "PAY100002",
        status: "shipped",
      },
      {
        user: user1._id,
        items: [
          {
            productId: products[3]._id,
            qty: 2,
            price: products[3].price,
          },
        ],
        totalAmount: products[3].price * 2,
        address: {
          fullName: "Muhammad Usama",
          street: "Block 15",
          city: "Karachi",
          postalCode: "75290",
          country: "Pakistan",
        },
        paymentId: "PAY100003",
        status: "delivered",
      },
    ]);

    console.log("====================================");
    console.log("Dummy Data Inserted Successfully");
    console.log("====================================");

    console.log("Admin Login");
    console.log("Email: admin@test.com");
    console.log("Password: admin123");

    console.log("------------------------------------");

    console.log("User Login");
    console.log("Email: usama@test.com");
    console.log("Password: user123");

    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

seedData();