import React, { useContext, useRef } from "react";
import DummyImage from "../assets/dummyimages.jpg";
import siteLogo from "../assets/logo.png";
import { FaBars, FaTrash } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "../redux/cartSlice";
import Button from "./Button";

const Navbar = () => {
  const { user, Logout } = useContext(AuthContext);
  const cartItem = useSelector((state) => state.cart.cartItem);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const profileRef = useRef(null);
  const cartList = Array.isArray(cartItem) ? cartItem : [];
  const totalItems = cartList.reduce((sum, item) => sum + (item.qty || 1), 0);
  const subtotal = cartList.reduce(
    (sum, item) => sum + (item.price || 0) * (item.qty || 1),
    0
  );

  const links = [
    { to: "/", label: "Home" },
    { to: "/products", label: "Products" },
    { to: "/categories", label: "Categories" },
    { to: "/contact", label: "Contact" },
  ];

  const navLinkClass = ({ isActive }) =>
    isActive
      ? "text-green-500 font-semibold"
      : "text-gray-800 hover:text-green-500";

  const handleLogout = () => {
    Logout();
    navigate("/login");
  };

  const closeDropdown = () => {
    profileRef.current?.blur();
  };

  return (
    <div className="navbar bg-white shadow-md border-b border-gray-200 sticky top-0 z-40 px-2 sm:px-4">
      <div className="navbar-start">
        <div className="dropdown lg:hidden">
          <button tabIndex={0} type="button" className="btn btn-ghost btn-circle" aria-label="Open menu">
            <FaBars />
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            {links.map((link) => (
              <li key={link.to}>
                <NavLink to={link.to} className={navLinkClass}>
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        <Link className="btn btn-ghost gap-2 text-xl text-gray-800 px-2" to="/">
          <img alt="Site Logo" src={siteLogo} className="h-10 w-auto sm:h-12" />
          <p className="hidden sm:block text-gray-800">
            Shop-<span className="text-green-500">Pak</span>
          </p>
        </Link>
      </div>

      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1 gap-5 font-bold">
          {links.map((link) => (
            <li key={link.to}>
              <NavLink to={link.to} className={navLinkClass}>
                {link.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>

      <div className="navbar-end gap-1">
        <div className="dropdown dropdown-end">
          <button type="button" tabIndex={0} className="btn btn-ghost btn-circle hover:bg-green-100" aria-label="Open cart">
            <div className="indicator">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <span className="badge badge-sm indicator-item">{totalItems}</span>
            </div>
          </button>
          <div tabIndex={0} className="card card-sm dropdown-content bg-base-100 z-50 mt-3 w-[min(20rem,calc(100vw-1rem))] shadow">
            <div className="card-body max-h-96 overflow-y-auto">
              <h2 className="font-bold text-lg">
                {totalItems} Item{totalItems !== 1 && "s"}
              </h2>

              {cartList.length === 0 ? (
                <p className="text-center text-gray-400 py-5">Cart is Empty</p>
              ) : (
                <>
                  {cartList.map((item) => (
                    <div key={item.productId} className="flex items-center gap-3 border-b py-3">
                      <img src={item.imageUrl} alt={item.name} className="w-14 h-14 rounded-lg object-cover" />

                      <div className="min-w-0 flex-1">
                        <h3 className="font-semibold text-sm truncate">{item.name}</h3>
                        <p className="text-xs text-gray-500">Qty: {item.qty}</p>
                        <p className="font-bold text-green-600">Rs {(item.price || 0).toLocaleString()}</p>
                      </div>

                      <button
                        type="button"
                        onClick={() => dispatch(removeFromCart(item.productId))}
                        className="btn btn-circle btn-sm btn-error text-white shrink-0"
                        title="Remove Item"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  ))}

                  <div className="mt-4">
                    <div className="flex justify-between font-bold gap-4">
                      <span>Subtotal</span>
                      <span className="text-green-600">Rs {subtotal.toLocaleString()}</span>
                    </div>

                    <button type="button" className="btn btn-success w-full mt-4" onClick={() => navigate("/cart")}>
                      View Cart
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="dropdown dropdown-end" ref={profileRef}>
          <button type="button" tabIndex={0} className="btn btn-ghost btn-circle avatar" aria-label="Open profile menu">
            <div className="w-10 rounded-full">
              <img alt="Profile avatar" src={DummyImage} />
            </div>
          </button>
          <ul tabIndex={0} className="menu menu-sm dropdown-content bg-base-100 rounded-box z-50 mt-3 w-52 p-2 shadow">
            {user ? (
              <>
                <li>
                  <Link to="/profile" className="capitalize text-gray-800" onClick={closeDropdown}>
                    {user.name}
                  </Link>
                </li>
                {user.role === "admin" && (
                  <>
                    <li>
                      <Link to="/additem" className="capitalize text-gray-800" onClick={closeDropdown}>
                        Add Products
                      </Link>
                    </li>
                    <li>
                      <Link to="/orders" className="capitalize text-gray-800" onClick={closeDropdown}>
                        Orders
                      </Link>
                    </li>
                  </>
                )}
                <li>
                  <Button onClick={handleLogout} className="w-full text-left capitalize text-gray-800">
                    Logout
                  </Button>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to="/login" onClick={closeDropdown}>Login</Link>
                </li>
                <li>
                  <Link to="/register" onClick={closeDropdown}>Register</Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
