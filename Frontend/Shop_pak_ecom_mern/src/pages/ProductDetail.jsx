  import React, { useState,useEffect, useRef, useContext } from 'react'
  import { Provider, useDispatch } from 'react-redux';
  import {FaStar,FaTruck,FaUndo,FaShieldAlt,FaShoppingCart,FaBolt} from "react-icons/fa";
  import {FaCircleCheck} from 'react-icons/fa6'
  import { Link, useNavigate, useParams } from 'react-router-dom'
  import Button from '../componetns/Button';
import { addToCart } from '../redux/cartSlice';
import { AuthContext } from '../context/AuthContext';

  const ProductDetail = () => {
    const {id} = useParams();
    const [product,setProduct] = useState(null);
    const [loading,setLoading] = useState(true);
    const [redirect,setRedirect] = useState("")
    const [qty,setQty] = useState(1)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const modalRef = useRef(null)
    const {user} = useContext(AuthContext);
    
    useEffect(()=>{
      const fetchSingleProduct=async ()=>{
      try{
        const res = await fetch(`/api/products/${id}`);
        const data = await res.json();
        console.log("Data:", JSON.stringify(data, null, 2));
        setProduct(data);
      }catch(error){
        console.log("Error While Fetching Single Product With Id" , error.message);
      }finally{
        setLoading(false);
      }
    }
  fetchSingleProduct();
    },[id])

// Handle Cart 

const HandleAddToCart = ()=>{

  if (!user) {
    navigate('/login');
    return;
  }

  if (product) {
    dispatch(addToCart({
      productId:product._id,
      name:product.name,
      price:product.price,
      imageUrl:product.images,
      qty:1
    }));
    setRedirect('/cart')
    modalRef.current.showModal();
  }
}

const HandleBuyNow = () => {

  if (!user) {
    navigate("/login");
    return;
  }

  dispatch(
    addToCart({
      productId: product._id,
      name: product.name,
      price: product.price,
      imageUrl: product.images,
      qty: 1,
    })
  );

  setRedirect("/checkout");
  modalRef.current.showModal();
};
  if (loading) {
    return(
      <div className='flex justify-center items-center h-screen'>
        <span className='loading loading-spinner loading-lg text-green-500'></span>
      </div>
    );
  };

  const oldPrice = Math.round(product.price*1.2);

    return (
      
      <>

      {/* Modal */}
      <dialog ref={modalRef} className="modal">
  <div className="modal-box text-center">

    <FaCircleCheck className="text-6xl text-green-500 mx-auto mb-4 animate-bounce" />

    <h3 className="text-3xl font-bold text-green-600">
      Product Added Successfully
    </h3>

    <p className="mt-2 text-gray-500">
      Your product has been added to the cart.
    </p>

    <div className="modal-action justify-center">

      <button
  className="btn bg-green-500 hover:bg-green-600 text-white flex-1"
  onClick={() => {
    modalRef.current.close();

    if (redirect === "/cart") {
      navigate("/cart");
    } else {
      navigate("/checkout");
    }
        navigate(redirect);

  }}
>
  OK
</button>
      <button
        className="btn bg-orange-500 hover:bg-orange-600 border-none text-white flex-1"
        onClick={() => {
          modalRef.current.close();
          navigate("/");
        }}
      >
        Continue Shopping
      </button>

    </div>

  </div>
</dialog>
      {/* Product Detail */}
    <div className='bg-gray-50 min-h-screen py-8'>
      {/* Breadcrumbs */}
      <div className="breadcrumbs text-sm mt-3 flex justify-around">
    <ul>
      <li><Link to={'/'}>Home</Link></li>
      <li><Link to={'/products'}>Shop</Link></li>
<li>
  <Link to={`/products?category=${product.category.toLowerCase()}`}>
    {product.category}
  </Link>
</li>      <li><a href="#">{product.name}</a></li> 
    </ul>
  </div>

  {/* Product Detail */}

  <div className='max-w-7xl mx-auto px-5 grid  lg:grid-cols-2 gap-14 '>
    {/* Image */}
    <div className='bg-white rounded-3xl shadow-xl overflow-hidden group'>

      <img
      // src={product.images}
        src={`${product.images}?w=800&auto=format&fit=crop&q=80`}
      alt={product.name}
      className='w-full h-[550px] object-contain p-8 transition duration-500 hover:scale-105'
      />
    </div>

    <div>
      <span className='badge badge-success badge-lg mb-4 mt-6 p-4.5 text-xl font-semibold'>
        {product.category}
      </span>
      <h1 className='text-5xl font-bold text-gray-800 leading-tight '>{product.name}</h1>
  
  <div className='flex items-center gap-2 mt-4'>
  <div className='flex text-yellow-400'>
    <FaStar/>
    <FaStar/>
    <FaStar/>
    <FaStar/>
    <FaStar/>
  </div>
  <span className='text-gray-800'>{product.numReviews}</span>
  </div>
  {/* Price */}
  <div className='mt-7 flex items-center gap-4'>
    <h2 className='text-3xl font-bold text-green-500'><span className='text-gray-800'>Rs</span> {product.price.toLocaleString()} <span className='badge badge-error text-gray-800'>20%</span></h2>
  </div>
  <div className="mt-6">
    {product.stock>0?(
      <span className='text-green-600 font-bold'>In Stock ({product.stock}) Left</span>
    ):(
      <span className='text-red-500 font-bold'>Out Of Stock</span>
    )}
  </div>
  {/* Quantity */}
  <div className='mt-8 flex flex-col lg:flex-row lg:items-center gap-5'>
    <h3 className='font-semibold text-green-400'>Quantity</h3>
    <div className='flex border rounded-lg overflow-hidden'>
      <button className='px-4 py-2 bg-gray-100 hover:bg-green-500 hover:text-white' onClick={()=>qty>1 && setQty(qty-1)}>-</button>
      <span className='px-6 py-2 font-bold'>{qty}</span>
      <button className='px-4 py-2 bg-gray-100 hover:bg-green-500 hover:text-white' onClick={()=>setQty(qty+1)}>+</button>
    </div>
    {/* Add To Cart */}
<div className="flex gap-4 flex-1">

  {user?.role === "admin" ? (

    <Link
      to={`/edititem/${product._id}`}
      className="btn bg-orange-600 hover:bg-orange-700 border-none text-white flex-1"
    >
      Edit Product
    </Link>

  ) : (

    <>
      <Button
        className="btn bg-green-500 hover:bg-green-600 border-none text-white flex-1"
        onClick={HandleAddToCart}
      >
        <FaShoppingCart className="mr-2" />
        Add to Cart
      </Button>

      <Button
        className="btn bg-orange-500 hover:bg-orange-600 border-none text-white flex-1"
        onClick={HandleBuyNow}
      >
        <FaBolt className="mr-2" />
        Buy Now
      </Button>
    </>

  )}

</div>
  </div>
  {/* Product Features */}

  <div className='grid grid-cols-3 gap-5 mt-12'>
    <div className='bg-white rounded-xl shadow-md p-4 text-center'>
      <FaTruck className='mx-auto text-2xl text-green-500 mb-2'/>
      <p className='font-semibold text-sm'>Free Delivery</p>
    </div>
    <div className='bg-white rounded-xl shadow-md p-4 text-center'>
      <FaUndo className='mx-auto text-2xl text-blue-500 mb-2'/>
      <p className='font-semibold text-sm'>7 Days Return</p>
    </div>
    <div className='bg-white rounded-xl shadow-md p-4 text-center'>
      <FaShieldAlt className='mx-auto text-2xl text-purple-500 mb-2'/>
      <p className='font-semibold text-sm'>Warranty Claim</p>
    </div>
  </div>
    </div>
    {/* Description */}
    <div className='max-w-8xl  px-5 mt-16'>
  <div className='bg-white rounded-3xl font-bold mb-5'>
    <h2 className='text-3xl font-bold mb-5'>Product Description</h2>
    <p className='text-gray-600 leading-8 text-lg'>{product.description}</p>
  </div>
    </div>
  </div>

    </div>
    </>
    )
  }

  export default ProductDetail