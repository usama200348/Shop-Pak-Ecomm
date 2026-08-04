import React, { useEffect, useMemo, useState } from "react";
import ProductCard from "../componetns/ProductCard";
import { FaSearch, FaFilter } from "react-icons/fa";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/api/products");
        const data = await res.json();

        setProducts(data);
      } catch (error) {
        console.log(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const categories = [
    "All",
    ...new Set(products.map((item) => item.category)),
  ];

  const filteredProducts = useMemo(() => {
    let items = [...products];

    if (category !== "All") {
      items = items.filter((item) => item.category === category);
    }

    if (search) {
      items = items.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      items.sort((a, b) => a.price - b.price);
    }

    if (sort === "high") {
      items.sort((a, b) => b.price - a.price);
    }

    if (sort === "newest") {
      items.reverse();
    }

    return items;
  }, [products, search, category, sort]);

  return (
    <div className="bg-gray-50 min-h-screen">

      {/* HERO */}

      <div className="bg-gradient-to-r from-green-600 to-green-400 text-white py-20">
        <div className="max-w-7xl mx-auto px-5 text-center">

          <h1 className="text-5xl font-extrabold">
            Shop Our Products
          </h1>

          <p className="mt-5 text-lg opacity-90">
            Discover premium quality products at unbeatable prices.
          </p>

        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 py-10">

        {/* FILTER BAR */}

        <div className="bg-white rounded-2xl shadow-md p-5 mb-10">

          <div className="grid lg:grid-cols-4 gap-5">

            {/* Search */}

            <div className="relative">

              <FaSearch className="absolute left-4 top-4 text-gray-400" />

              <input
                type="text"
                placeholder="Search products..."
                className="input input-bordered w-full pl-10"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />

            </div>

            {/* Category */}

            <select
              className="select select-bordered w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              {categories.map((cat) => (
                <option
                  key={cat}
                  value={cat}
                >
                  {cat}
                </option>
              ))}
            </select>

            {/* Sort */}

            <select
              className="select select-bordered w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">Sort By</option>
              <option value="low">Price Low → High</option>
              <option value="high">Price High → Low</option>
              <option value="newest">Newest</option>
            </select>

            <button className="btn bg-green-500 hover:bg-green-600 text-white border-none">
              <FaFilter />
              Filters
            </button>

          </div>
        </div>

        {/* Product Count */}

        <div className="flex justify-between items-center mb-8">

          <h2 className="text-3xl font-bold">
            Products
          </h2>

          <span className="badge badge-success badge-lg">
            {filteredProducts.length} Products
          </span>

        </div>

        {/* Products */}

        {loading ? (
          <div className="flex justify-center py-24">

            <span className="loading loading-spinner loading-lg text-green-500"></span>

          </div>
        ) : filteredProducts.length === 0 ? (
          <div className="text-center py-20">

            <h2 className="text-3xl font-bold">
              No Products Found
            </h2>

            <p className="text-gray-500 mt-3">
              Try changing filters.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

            {filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                product={product}
              />
            ))}

          </div>
        )}
      </div>
    </div>
  );
};

export default Products;