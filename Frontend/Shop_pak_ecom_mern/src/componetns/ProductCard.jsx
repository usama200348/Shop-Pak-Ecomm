import React from 'react';
import { Link } from 'react-router-dom';


const ProductCard = ({ product }) => {
  if (!product) return null;

  const originalPrice = product.price || 0;
  const discountedPrice = Math.round(originalPrice * 0.7);

  return (
    <>
      <div className="card bg-base-100 w-full h-full shadow-sm rounded-lg overflow-hidden">
        <figure className="h-56 overflow-hidden">
          <img
            src={product.images || "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9"}
            alt={product.name || "Product"}
            className="w-full h-full object-cover transition duration-500 hover:scale-110"
          />
        </figure>
        <div className="card-body items-center text-center">
          <h2 className="font-bold text-[1.1rem] line-clamp-2">
            {product.name}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-[1rem] font-bold text-green-600">
              Rs {discountedPrice.toLocaleString()}
            </span>
            <span className="text-sm line-through text-gray-400">
              Rs {originalPrice.toLocaleString()}
            </span>
          </div>
          <p className="product-price text-sm text-gray-500 capitalize">
            {product.category || "General"}
          </p>
          <div className="card-actions">
            <Link
              to={`/product/${product._id}`}
              className="btn border text-green-500 border-green-400 bg-white hover:bg-green-400 hover:text-white flex-1"
            >
              View Details
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductCard
