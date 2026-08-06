import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaMobileAlt,
  FaLaptop,
  FaHeadphones,
  FaGamepad,
  FaArrowRight,
} from "react-icons/fa";
import { motion } from "framer-motion";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const categories = [
    {
      name: "Smartphones",
      slug: "smartphones",
      icon: <FaMobileAlt />,
      color: "from-green-500 to-green-700",
      image:
        "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800",
    },
    {
      name: "Laptops",
      slug: "laptop",
      icon: <FaLaptop />,
      color: "from-blue-500 to-blue-700",
      image:
        "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
    },
    {
      name: "Watches",
      slug: "wearables",
      icon: <FaGamepad />,
      color: "from-purple-500 to-purple-700",
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=800",
    },
    {
      name: "Accessories",
      slug: "accessories",
      icon: <FaHeadphones />,
      color: "from-orange-500 to-orange-700",
      image:
        "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    },
  ];

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/api/products`);
        const data = await res.json();
        setProducts(data);
      } catch (err) {
        console.log(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryCount = (slug) => {
    return products.filter(
      (item) => item.category.toLowerCase() === slug.toLowerCase()
    ).length;
  };

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}

      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">

        <div className="max-w-7xl mx-auto px-5 text-center">

          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .7 }}
            className="text-5xl font-extrabold"
          >
            Shop By Categories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            className="mt-5 text-lg"
          >
            Find your favorite products quickly from our premium categories.
          </motion.p>

        </div>

      </div>

      {/* Categories */}

      <div className="max-w-7xl mx-auto px-5 py-20">

        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-green-500"></span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">

            {categories.map((cat, index) => (

              <motion.div
                key={index}
                whileHover={{
                  y: -10,
                  scale: 1.03,
                }}
                transition={{
                  duration: .3,
                }}
                className="bg-white rounded-3xl shadow-xl overflow-hidden group"
              >

                <div className="relative overflow-hidden">

                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="h-56 w-full object-cover group-hover:scale-110 duration-500"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70`}
                  ></div>

                  <div className="absolute inset-0 flex flex-col items-center justify-center text-white">

                    <div className="text-6xl mb-4">
                      {cat.icon}
                    </div>

                    <h2 className="text-3xl font-bold">
                      {cat.name}
                    </h2>

                  </div>

                </div>

                <div className="p-6 text-center">

                  <p className="text-gray-500 mb-5">
                    {getCategoryCount(cat.slug)} Products Available
                  </p>

                  <Link
                    to={`/products?category=${cat.slug}`}
                    className="btn bg-green-500 hover:bg-green-600 border-none text-white w-full"
                  >
                    Shop Now
                    <FaArrowRight />
                  </Link>

                </div>

              </motion.div>

            ))}

          </div>
        )}

      </div>

      {/* Why Shop */}

      <div className="bg-white py-20">

        <div className="max-w-6xl mx-auto px-5">

          <h2 className="text-4xl font-bold text-center">
            Why Shop With
            <span className="text-green-500">
              {" "}ShopPak?
            </span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-16">

            <div className="rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300">

              <div className="text-5xl mb-4">
                🚚
              </div>

              <h3 className="text-2xl font-bold">
                Fast Delivery
              </h3>

              <p className="text-gray-500 mt-3">
                Nationwide delivery with secure packaging.
              </p>

            </div>

            <div className="rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300">

              <div className="text-5xl mb-4">
                💳
              </div>

              <h3 className="text-2xl font-bold">
                Secure Payment
              </h3>

              <p className="text-gray-500 mt-3">
                JazzCash, EasyPaisa, Cards & COD.
              </p>

            </div>

            <div className="rounded-3xl shadow-lg p-8 text-center hover:-translate-y-2 duration-300">

              <div className="text-5xl mb-4">
                ⭐
              </div>

              <h3 className="text-2xl font-bold">
                Trusted Products
              </h3>

              <p className="text-gray-500 mt-3">
                Genuine quality products at the best prices.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Categories;