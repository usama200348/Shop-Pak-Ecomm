import React from 'react';
import { Link } from 'react-router-dom';


const ProductCard = ({product}) => {
  return (
    <>
    <div className="card bg-base-100 max-w-sm shadow-sm">
  <figure className="h-56 overflow-hidden">
    <img  
      src={product.images}
      alt={product.name}
      className="w-full h-full object-cover transition duration-500 hover:scale-110"
       />
  </figure>
  <div className="card-body items-center text-center">
    <h2 className="font-bold text-[1.1rem] line-clamp-2">{"Title: "+product.name}</h2>
    {/* Need To Add Price */}
<div className='flex items-center gap-2'>
  <span className='text-[1rem] font-bold text-green-600'>
  Rs: {(product.price * 0.7).toLocaleString()}
</span>
<span className="text-sm line-through text-gray-400">
  Rs {product.price.toLocaleString()}
</span>

</div>
    {/* Need To Add Category */}
    <p className='product-price'>{"category:  "+product.category}</p>
    <div className="card-actions">
      <Link to={`/product/${product._id}`} className='btn border text-green-500 border-green-400 bg-white hover:bg-green-400 hover:text-white flex-1'>View Details</Link>
    </div>
  </div>
</div>
    </>
  )
}

export default ProductCard