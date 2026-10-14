import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FaArrowRight, FaCreditCard, FaShippingFast, FaStar } from "react-icons/fa";
import { motion } from "framer-motion";
import { API_URL } from "../config/api";
import { CATEGORY_OPTIONS, categoryMatches } from "../config/categories";

const Categories = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(`${API_URL}/api/products`);
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Categories fetch error:", err.message);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const getCategoryCount = (slug) => {
    if (!Array.isArray(products)) return 0;
    return products.filter((item) => categoryMatches(item?.category, slug)).length;
  };

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">
      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white py-16 sm:py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">
          <motion.h1
            initial={{ opacity: 0, y: -60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="text-4xl sm:text-5xl font-extrabold"
          >
            Shop By Categories
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3 }}
            className="mt-5 text-base sm:text-lg"
          >
            Find your favorite products quickly from our premium categories.
          </motion.p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-14 sm:py-20">
        {loading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg text-green-500"></span>
          </div>
        ) : error ? (
          <div className="alert alert-error max-w-lg mx-auto my-8">
            <span>Failed to load products: {error}</span>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATEGORY_OPTIONS.map((cat) => {
              const CategoryIcon = cat.icon;

              return (
                <motion.div
                  key={cat.slug}
                  whileHover={{ y: -10, scale: 1.03 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white rounded-lg shadow-xl overflow-hidden group"
                >
                  <div className="relative overflow-hidden">
                    <img
                      src={cat.image}
                      alt={cat.name}
                      className="h-56 w-full object-cover group-hover:scale-110 duration-500"
                    />

                    <div className={`absolute inset-0 bg-gradient-to-t ${cat.color} opacity-70`}></div>

                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <div className="text-6xl mb-4">
                        <CategoryIcon />
                      </div>

                      <h2 className="text-3xl font-bold">{cat.name}</h2>
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
              );
            })}
          </div>
        )}
      </div>

      <div className="bg-white py-16 sm:py-20">
        <div className="max-w-6xl mx-auto px-5">
          <h2 className="text-3xl sm:text-4xl font-bold text-center">
            Why Shop With
            <span className="text-green-500"> ShopPak?</span>
          </h2>

          <div className="grid md:grid-cols-3 gap-8 mt-12 sm:mt-16">
            <div className="rounded-lg shadow-lg p-8 text-center hover:-translate-y-2 duration-300">
              <FaShippingFast className="text-5xl mb-4 mx-auto text-green-500" />
              <h3 className="text-2xl font-bold">Fast Delivery</h3>
              <p className="text-gray-500 mt-3">Nationwide delivery with secure packaging.</p>
            </div>

            <div className="rounded-lg shadow-lg p-8 text-center hover:-translate-y-2 duration-300">
              <FaCreditCard className="text-5xl mb-4 mx-auto text-blue-500" />
              <h3 className="text-2xl font-bold">Secure Payment</h3>
              <p className="text-gray-500 mt-3">JazzCash, EasyPaisa, cards, and COD.</p>
            </div>

            <div className="rounded-lg shadow-lg p-8 text-center hover:-translate-y-2 duration-300">
              <FaStar className="text-5xl mb-4 mx-auto text-yellow-500" />
              <h3 className="text-2xl font-bold">Trusted Products</h3>
              <p className="text-gray-500 mt-3">Genuine quality products at the best prices.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Categories;
