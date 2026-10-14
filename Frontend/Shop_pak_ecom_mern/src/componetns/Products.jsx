import React, { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import ProductCard from "../componetns/ProductCard";
import { FaSearch, FaFilter } from "react-icons/fa";
import { API_URL } from "../config/api";
import { CATEGORY_OPTIONS, categoryMatches, getCategoryOption } from "../config/categories";

const Products = () => {
  const [searchParams] = useSearchParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("");

  const urlCategory = searchParams.get("category");

  useEffect(() => {
    if (urlCategory) {
      setCategory(getCategoryOption(urlCategory)?.slug || urlCategory);
    }
  }, [urlCategory]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const params = new URLSearchParams();
        if (urlCategory) params.set("category", urlCategory);

        const res = await fetch(`${API_URL}/api/products${params.toString() ? `?${params}` : ""}`);
        if (!res.ok) {
          throw new Error(`Failed to fetch products: ${res.statusText}`);
        }
        const data = await res.json();
        setProducts(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Products fetch error:", err.message);
        setError(err.message);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [urlCategory]);

  const categories = [
    { label: "All", value: "All" },
    ...CATEGORY_OPTIONS.map((item) => ({ label: item.name, value: item.slug })),
  ];

  const filteredProducts = useMemo(() => {
    let items = Array.isArray(products) ? [...products] : [];

    if (category !== "All" && !urlCategory) {
      items = items.filter((item) => categoryMatches(item?.category, category));
    }

    if (search) {
      items = items.filter((item) =>
        item?.name?.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (sort === "low") {
      items.sort((a, b) => (a.price || 0) - (b.price || 0));
    }

    if (sort === "high") {
      items.sort((a, b) => (b.price || 0) - (a.price || 0));
    }

    if (sort === "newest") {
      items.sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0));
    }

    return items;
  }, [products, search, category, sort, urlCategory]);

  return (
    <div className="bg-gray-50 min-h-screen overflow-x-hidden">

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

        <div className="bg-white rounded-lg shadow-md p-4 sm:p-5 mb-10">

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
                  key={cat.value}
                  value={cat.value}
                >
                  {cat.label}
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

        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 mb-8">

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
        ) : error ? (
          <div className="text-center py-20">

            <h2 className="text-3xl font-bold text-red-500">
              Failed to Load Products
            </h2>

            <p className="text-gray-500 mt-3">
              {error}
            </p>

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
