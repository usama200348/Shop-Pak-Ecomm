import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {FaTrash,FaPlus,FaMinus,FaShoppingCart,FaArrowLeft} from "react-icons/fa";
import {
  removeFromCart,
  increaseQty,
  decreaseQty,
} from "../redux/cartSlice";
import { motion } from "framer-motion";

const Cart = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const cartItems = useSelector((state) => state.cart.cartItem);

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal > 5000 ? 0 : 250;

  const tax = Math.round(subtotal * 0.05);

  const total = subtotal + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">

        <FaShoppingCart className="text-8xl text-gray-300 mb-6" />

        <h1 className="text-4xl font-bold">
          Your Cart is Empty
        </h1>

        <p className="text-gray-500 mt-3">
          Looks like you haven't added anything yet.
        </p>

        <Link
          to="/products"
          className="btn bg-green-500 hover:bg-green-600 text-white mt-8"
        >
          Start Shopping
        </Link>

      </div>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen py-10">

      <div className="max-w-7xl mx-auto px-5">

        <div className="flex items-center justify-between mb-10">

          <h1 className="text-4xl font-bold">
            Shopping Cart
          </h1>

          <span className="badge badge-success badge-lg">
            {cartItems.length} Items
          </span>

        </div>

        <div className="grid lg:grid-cols-3 gap-8">

          {/* LEFT */}

          <div className="lg:col-span-2 space-y-6">

            {cartItems.map((item) => (
              <motion.div
                key={item.productId}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white rounded-3xl shadow-lg p-5"
              >
                <div className="flex flex-col md:flex-row gap-5">

                  <img
                    src={item.imageUrl}
                    alt={item.name}
                    className="w-44 h-44 object-contain rounded-xl bg-gray-50"
                  />

                  <div className="flex-1">

                    <h2 className="text-2xl font-bold">
                      {item.name}
                    </h2>

                    <p className="text-green-600 font-bold mt-2">
                      Rs {item.price.toLocaleString()}
                    </p>

                    {/* Quantity */}

                    <div className="flex items-center gap-3 mt-5">

                      <button
                        className="btn btn-circle btn-sm"
                        onClick={() =>
                          dispatch(decreaseQty(item.productId))
                        }
                      >
                        <FaMinus />
                      </button>

                      <span className="text-lg font-bold">
                        {item.qty}
                      </span>

                      <button
                        className="btn btn-circle btn-sm"
                        onClick={() =>
                          dispatch(increaseQty(item.productId))
                        }
                      >
                        <FaPlus />
                      </button>

                    </div>

                  </div>

                  <div className="flex flex-col justify-between items-end">

                    <button
                      className="btn btn-error btn-circle"
                      onClick={() =>
                        dispatch(removeFromCart(item.productId))
                      }
                    >
                      <FaTrash />
                    </button>

                    <h2 className="font-bold text-xl text-green-600">
                      Rs {(item.price * item.qty).toLocaleString()}
                    </h2>

                  </div>

                </div>
              </motion.div>
            ))}

            <Link
              to="/products"
              className="btn btn-outline border-green-500 text-green-600"
            >
              <FaArrowLeft />
              Continue   Shopping
            </Link>

          </div>

          {/* RIGHT */}

          <motion.div
            initial={{ x: 100 }}
            animate={{ x: 0 }}
            className="bg-white rounded-3xl shadow-xl p-8 h-fit sticky top-28"
          >

            <h2 className="text-3xl font-bold mb-8">
              Order Summary
            </h2>

            <div className="space-y-5">

              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>
                  Rs {subtotal.toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Shipping</span>

                <span className="text-green-600">
                  {shipping === 0
                    ? "FREE"
                    : `Rs ${shipping}`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Tax</span>
                <span>Rs {tax}</span>
              </div>

              <hr />

              <div className="flex justify-between text-2xl font-bold">

                <span>Total</span>

                <span className="text-green-600">
                  Rs {total.toLocaleString()}
                </span>

              </div>

            </div>

            <button
              onClick={() => navigate("/checkout")}
              className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-10"
            >
              Proceed to Checkout
            </button>

          </motion.div>

        </div>

      </div>

    </div>
  );
};

export default Cart;