# 🛍️ ShopPak - MERN E-Commerce Platform

![ShopPak Logo](../SHOPAK-ECOM-MERN/Frontend/Shop_pak_ecom_mern/src/assets/logo.png)

<p align="center">
  <b>Shop Smart. Pay Less.</b><br>
  A modern full-stack E-Commerce web application built with the MERN Stack.
</p>

---

## 📖 About The Project

**ShopPak** is a complete MERN Stack E-Commerce platform designed to provide customers with a smooth online shopping experience while giving administrators complete control over products, orders, and inventory.

The application includes secure authentication, product management, shopping cart, checkout, order management, image uploading, responsive design, and an intuitive admin dashboard.

---

# 🚀 Live Features

### 👤 User Features

- User Registration & Login
- JWT Authentication
- Protected Routes
- Browse Products
- Search Products
- Category Filtering
- Product Detail Page
- Add to Cart
- Update Cart Quantity
- Remove from Cart
- Buy Now
- Checkout
- Order Placement
- Order History
- Responsive Design
- Beautiful UI
- Animated Components

---

### 👨‍💼 Admin Features

- Secure Admin Authentication
- Add New Products
- Edit Existing Products
- Delete Products
- Upload Product Images
- Manage Inventory
- View All Orders
- Update Order Status
- Product Featured Section
- Admin Protected Routes

---

# ✨ Key Features

- ✅ MERN Stack Architecture
- ✅ JWT Authentication
- ✅ Protected API Routes
- ✅ Role Based Authorization
- ✅ Cloudinary Image Upload
- ✅ MongoDB Database
- ✅ REST API
- ✅ Responsive UI
- ✅ DaisyUI + TailwindCSS
- ✅ Framer Motion Animations
- ✅ Shopping Cart
- ✅ Checkout System
- ✅ Order Management
- ✅ Email Notification
- ✅ Mobile Friendly
- ✅ Clean Code Structure

---

# 🛠 Tech Stack

## Frontend

- React.js
- React Router DOM
- Redux Toolkit
- Context API
- Tailwind CSS
- DaisyUI
- Framer Motion
- React Icons
- Vite

---

## Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Multer
- Cloudinary
- Nodemailer
- BcryptJS
- dotenv

---

# 📂 Folder Structure

```
ShopPak/
│
├── client/
│   ├── src/
│   │   ├── assets/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   ├── redux/
│   │   ├── App.jsx
│   │   └── main.jsx
│   │
│   └── public/
│
├── server/
│   ├── config/
│   ├── controller/
│   ├── middleware/
│   ├── model/
│   ├── routes/
│   ├── utils/
│   ├── uploads/
│   └── server.js
│
└── README.md
```

---

# 📸 Screenshots

## 🏠 Home Page

- Hero Banner
- Featured Products
- Category Sections
- Professional Design

---

## 🛒 Product Page

- Product Cards
- Search
- Filters
- Categories

---

## 📦 Product Details

- Product Images
- Product Description
- Reviews
- Stock Status
- Quantity Selector
- Add To Cart
- Buy Now

---

## 🛍 Cart

- Update Quantity
- Remove Product
- Order Summary

---

## 💳 Checkout

- Shipping Details
- Payment Method
- Order Summary
- Order Confirmation

---

## 👤 Profile

- User Information
- Order History

---

## 👨‍💼 Admin Dashboard

- Add Products
- Edit Products
- Delete Products
- View Orders
- Update Order Status

---

# 🔒 Authentication

ShopPak uses **JWT (JSON Web Token)** authentication.

Features include:

- Login
- Register
- Protected Routes
- Admin Routes
- Token Verification
- Role Based Access

---

# 🖼 Image Upload

Product images are uploaded using:

- Multer
- Cloudinary

---

# 📦 Order Flow

```
Customer

↓

Browse Products

↓

Add to Cart

↓

Checkout

↓

Place Order

↓

Save Order in MongoDB

↓

Send Email Confirmation

↓

Admin Views Order

↓

Update Status

↓

Delivered
```

---

# 📧 Email Notifications

When an order is placed:

- Order is saved in MongoDB
- Confirmation email is sent
- Order ID included
- Payment information included

---

# 💾 Database Models

### User

- Name
- Email
- Password
- Role

---

### Product

- Name
- Brand
- Category
- Price
- Stock
- Description
- Images
- Featured

---

### Order

- User
- Items
- Address
- Total Amount
- Payment ID
- Status

---

# ⚙ Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/shoppak-ecommerce.git
```

---

## Install Client

```bash
cd client
npm install
```

---

## Install Server

```bash
cd server
npm install
```

---

## Environment Variables

Create a **.env** file inside the server folder.

```env
PORT=5000

MONGO_URI=your_mongodb_uri

JWT_SECRET=your_secret

EMAIL_USER=your_email

EMAIL_PASS=your_password

CLOUDINARY_CLOUD_NAME=xxxx

CLOUDINARY_API_KEY=xxxx

CLOUDINARY_API_SECRET=xxxx
```

---

## Start Backend

```bash
npm run server
```

---

## Start Frontend

```bash
npm run dev
```

---

# 📱 Responsive Design

Works perfectly on:

- Desktop
- Laptop
- Tablet
- Mobile

---

# 🎨 UI Highlights

- Modern Design
- Glassmorphism
- Soft Shadows
- Rounded Components
- Smooth Animations
- Hover Effects
- Responsive Layout
- Clean Typography

---

# 🔮 Future Improvements

- Stripe Payment Integration
- JazzCash API
- EasyPaisa API
- Product Reviews
- Wishlist
- Coupons
- Invoice PDF
- Admin Analytics Dashboard
- Sales Charts
- Multi Vendor Support
- Notifications
- Live Chat
- Dark Mode

---

# 🤝 Contributing

Contributions are welcome.

1. Fork the project

2. Create a feature branch

```bash
git checkout -b feature-name
```

3. Commit changes

```bash
git commit -m "Added new feature"
```

4. Push

```bash
git push origin feature-name
```

5. Create Pull Request

---

# 👨‍💻 Developer

**Muhammad Usama Sohail**

Software Engineer | MERN Stack Developer

### Linkedin Profile 
https://www.linkedin.com/in/usama-sohail-a83431213/

### Skills

- React.js
- Node.js
- Express.js
- MongoDB
- JavaScript
- Tailwind CSS
- Redux Toolkit
- Cloudinary
- JWT Authentication

---

# ⭐ Support

If you like this project, please consider giving it a ⭐ on GitHub.

It motivates me to build more amazing open-source projects.

---

# 📄 License

This project is licensed under the MIT License.

---

<p align="center">
Made with ❤️ using the MERN Stack
</p>
