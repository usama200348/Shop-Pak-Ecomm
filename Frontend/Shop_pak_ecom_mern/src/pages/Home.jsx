import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import ProductCard from "../componetns/ProductCard";
import Banner from "../assets/Home_Banner.png";
import {
  FaShippingFast,
  FaShieldAlt,
  FaHeadset,
  FaTags,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [smartphones, setSmartphones] = useState([]);
  const [laptops, setLaptops] = useState([]);
  const [wearables, setWearables] = useState([]);
  const [accessories, setAccessories] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await res.json();

        setProducts(data.slice(0, 4));

        setSmartphones(
          data.filter(
            (item) => item.category.toLowerCase() === "smartphones"
          )
        );

        setLaptops(
          data.filter(
            (item) => item.category.toLowerCase() === "laptop"
          )
        );

        setWearables(
          data.filter(
            (item) => item.category.toLowerCase() === "wearables"
          )
        );

        setAccessories(
          data.filter(
            (item) => item.category.toLowerCase() === "accessories"
          )
        );
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, []);

  const CategorySection = ({ title, items }) => (
    <>
      <div className="flex justify-center my-12">
        <h2 className="text-4xl font-bold text-gray-800">
          {title.split(" ")[0]}{" "}
          <span className="text-green-500">
            {title.split(" ").slice(1).join(" ")}
          </span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {items.slice(0, 4).map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-5">

      {/* Hero Section */}

      <section className="grid lg:grid-cols-2 gap-10 items-center py-20">

        <motion.div
          initial={{ opacity: 0, x: -70 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
        >
          <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full">
            Pakistan's Trusted Online Store
          </span>

          <h1 className="text-5xl lg:text-6xl font-extrabold mt-6 leading-tight">
            Shop Smart.
            <br />
            <span className="text-green-500">
              Pay Less.
            </span>
          </h1>

          <p className="text-gray-500 mt-6 text-lg leading-8">
            Discover premium products at unbeatable prices. Fast delivery,
            secure payments and effortless online shopping—all in one place.
          </p>

          <div className="flex gap-4 mt-8">

            <Link
              to="/products"
              className="btn bg-green-500 hover:bg-green-600 border-none text-white px-8"
            >
              Shop Now
            </Link>

            <Link
              to="/products"
              className="btn btn-outline border-green-500 text-green-500 hover:bg-green-500 hover:text-white"
            >
              Explore
            </Link>

          </div>

        </motion.div>

        <motion.div
          animate={{ y: [0, -15, 0] }}
          transition={{
            repeat: Infinity,
            duration: 4,
          }}
        >
          <img
            src={Banner}
            alt="Banner"
            className="rounded-3xl shadow-2xl"
          />
        </motion.div>

      </section>

      {/* Features */}

      <section className="grid grid-cols-2 lg:grid-cols-4 gap-6 my-20">

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-2 duration-300">
          <FaShippingFast className="text-5xl text-green-500 mx-auto" />
          <h3 className="font-bold mt-4">Free Shipping</h3>
          <p className="text-gray-500 mt-2">On every order</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-2 duration-300">
          <FaShieldAlt className="text-5xl text-green-500 mx-auto" />
          <h3 className="font-bold mt-4">Secure Payment</h3>
          <p className="text-gray-500 mt-2">100% Safe Checkout</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-2 duration-300">
          <FaHeadset className="text-5xl text-green-500 mx-auto" />
          <h3 className="font-bold mt-4">24/7 Support</h3>
          <p className="text-gray-500 mt-2">Customer Care</p>
        </div>

        <div className="bg-white rounded-2xl shadow-md p-6 text-center hover:-translate-y-2 duration-300">
          <FaTags className="text-5xl text-green-500 mx-auto" />
          <h3 className="font-bold mt-4">Best Prices</h3>
          <p className="text-gray-500 mt-2">Daily Discounts</p>
        </div>

      </section>

      {/* Featured Products */}

      <div className="flex justify-center my-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Featured <span className="text-green-500">Products</span>
        </h2>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
          />
        ))}
      </div>

      {/* Categories */}

      <CategorySection
        title="Smart Phones"
        items={smartphones}
      />

      <CategorySection
        title="Laptops"
        items={laptops}
      />

      <CategorySection
        title="Watches"
        items={wearables}
      />

      <CategorySection
        title="Accessories"
        items={accessories}
      />

    </div>
  );
};

export default Home;