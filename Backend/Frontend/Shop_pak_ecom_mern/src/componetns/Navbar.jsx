import React, { useRef } from 'react';
import DummyImage from '../assets/dummyimages.jpg';
import siteLogo from '../assets/logo.png';
import { FaTrash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import {useSelector} from 'react-redux'
import { removeFromCart } from '../redux/cartSlice';
import { useDispatch } from 'react-redux';
import Button from './Button';

const Navbar = () => {
  const {user,Logout}=useContext(AuthContext);
  const cartItem = useSelector((state)=>state.cart.cartItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null); 
  const totalItems = cartItem.reduce(
  (sum, item) => sum + item.qty,
  0
);
const subtotal = cartItem.reduce(
  (sum, item) => sum + item.price * item.qty,
  0
);

const handleLogout = ()=>{
    Logout();
    console.log("User Logged Out");
    
    navigate('/login')
  }

  const closeDropdown = ()=>{
    profileRef.current?.blue();
  };
  return (
    <>
<div className="navbar bg-white shadow-md border-b border-gray-200 btn btn-ghost btn-circle-avatar" ref={profileRef} tabIndex={0} role='button'>
  <div className="navbar-start ">
 <Link className='btn btn-ghost gap-2 text-xl text-gray-800' to={'/'}>
 <img
 alt = "Site Logo"
 src={siteLogo}
 width={65}
 height={40}
 />
 
 <p className='text-gray-800'>Shop-<span className='text-green-500'>Pak</span></p>
 </Link>
 </div>
  <div className="navbar-center hidden lg:flex">
      <ul 
        tabIndex="-1"
        className="menu menu-horizontal px-1 gap-5 font-bold">

<NavLink
  to="/"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-800 hover:text-green-500"
  }
>
  Home
</NavLink>

<NavLink
  to="/products"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-800 hover:text-green-500"
  }
>
  Products
</NavLink>

<NavLink
  to="/categories"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-800 hover:text-green-500"
  }
>
  Categories
</NavLink>

<NavLink
  to="/contact"
  className={({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-800 hover:text-green-500"
  }
>
  Contact
</NavLink>
      </ul>
  </div>
 
  <div className="navbar-end ">
    <div className="dropdown dropdown-end ">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle mr-1.5 hover:bg-green-500">
        <div className="indicator ">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"> <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /> </svg>
          <span>{totalItems}</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-sm dropdown-content bg-base-100 z-1 mt-3 w-75 shadow">
        <div className="card-body">
         <div className="card-body max-h-96 overflow-y-auto">

  <h2 className="font-bold text-lg">
    {totalItems} Item{totalItems !== 1 && "s"}
  </h2>

  {cartItem.length === 0 ? (

    <p className="text-center text-gray-400 py-5">
      Cart is Empty
    </p>

  ) : (

    <>
      {cartItem.map((item) => (
        <div
          key={item.productId}
          className="flex items-center gap-3 border-b py-3"
        >
          <img
            src={item.imageUrl}
            alt={item.name}
            className="w-14 h-14 rounded-lg object-cover"
          />

          <div className="flex-1">
            <h3 className="font-semibold text-sm line-clamp-1">
              {item.name}
            </h3>

            <p className="text-xs text-gray-500">
              Qty: {item.qty}
            </p>

            <p className="font-bold text-green-600">
              Rs {item.price.toLocaleString()}
            </p>
          </div>

  <button
    onClick={() => dispatch(removeFromCart(item.productId))}
    className="btn btn-circle btn-sm btn-error text-white"
    title="Remove Item"
  >
    <FaTrash />
  </button>
        </div>
      ))}

      <div className="mt-4">
        <div className="flex justify-between font-bold">
          <span>Subtotal</span>

          <span className="text-green-600">
            Rs {subtotal.toLocaleString()}
          </span>
        </div>

        <button
          className="btn btn-success w-full mt-4"
          onClick={() => navigate("/cart")}
        >
          View Cart
        </button>
      </div>
    </>
  )}

</div>
         
        </div>
      </div>
    </div>
    <div className="dropdown dropdown-end">
      <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
        <div className="w-10 rounded-full">
          <img
            alt="Tailwind CSS Navbar component"
            src={DummyImage} />
        </div>
      </div>
      <ul
        tabIndex="-1"
        className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow">
        <li>
          {user?(
            <>
            <Link to={'/profile'} className='capitalize text-gray-800'>{user.name}</Link>
           {user.role === "admin" && (
<>
<Link
        to="/additem"
        className="capitalize text-gray-800"
        onClick={closeDropdown}
      >
        Add Products
      </Link>
<Link
        to="/orders"
        className="capitalize text-gray-800"
        onClick={closeDropdown}
      >
        Orders
      </Link>
      </>
    )}
            <Button onClick={handleLogout} className='w-full text-left capitalize text-gray-800'>Logout</Button>
            </>
          ):(
          <>
          <Link to={'/login'} onClick={closeDropdown}>Login</Link>
          <Link to={'/register'} onClick={closeDropdown}>Register</Link>
          </>
          )}
        </li>
      </ul>
    </div>
  </div>
</div>   
    </>
  )
}

export default Navbar