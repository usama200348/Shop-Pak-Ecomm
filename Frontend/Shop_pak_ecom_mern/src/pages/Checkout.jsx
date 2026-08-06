import React, { useRef, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaEnvelope,
  FaMoneyBillWave,
  FaCreditCard,
  FaCheckCircle,
} from "react-icons/fa";
import EasyPaisa from "../assets/easypaisa.png";
import JazzCash from "../assets/jazzcash.webp";
import { motion } from "framer-motion";
import { clearCart } from "../redux/cartSlice";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.cartItem || []);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const [payment, setPayment] = useState("cod");

  // State for form controls
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    city: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.qty,
    0
  );

  const shipping = subtotal > 5000 ? 0 : 250;
  const tax = Math.round(subtotal * 0.05);
  const total = subtotal + shipping + tax;

  const placeOrder = async (e) => {
    e.preventDefault();

    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const body = {
        items: cartItems.map((item) => ({
          productId: item.productId,
          qty: item.qty,
          price: item.price,

        })),

        totalAmount: total,

        address: {
          fullName: formData.fullName,
          street: formData.address,
          city: formData.city,
          phone: formData.phone,
          email: formData.email,
          postalCode: "75290",
          country: "Pakistan",
        },

paymentId:
payment==="cod"
? "COD"
: "PAY"+Date.now()

};

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${userInfo?.token}`,
        },
        body: JSON.stringify(body),
      });

      const data = await res.json();

      if (res.ok) {
        modalRef.current.showModal();
      } else {
        alert(data.message || "Something went wrong");
      }
    } catch (err) {
      console.error(err);
      alert("Order Failed");
    }
  };

  const handleContinue = () => {
    dispatch(clearCart());
    modalRef.current.close();
    navigate("/");
  };

  return (
    <>
      {/* Success Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box text-center">
          <FaCheckCircle className="text-7xl text-green-500 mx-auto animate-bounce" />
          <h2 className="text-3xl font-bold mt-5 text-green-600">
            Order Placed Successfully!
          </h2>
          <p className="mt-4 text-gray-500">
            Thank you for shopping with ShopPak.
          </p>
          <div className="modal-action justify-center">
            <button
              className="btn bg-green-500 hover:bg-green-600 text-white"
              onClick={handleContinue}
            >
              Done
            </button>
          </div>
        </div>
      </dialog>

      <div className="bg-gray-100 min-h-screen py-10">
        <div className="max-w-7xl mx-auto px-5">
          <h1 className="text-4xl font-bold mb-10">Checkout</h1>

          {/* Form wrapper linking the order summary button via form ID */}
          <form id="checkout-form" onSubmit={placeOrder}>
            <div className="grid lg:grid-cols-3 gap-8">
              {/* Left Column: Form Details */}
              <motion.div
                initial={{ opacity: 0, x: -80 }}
                animate={{ opacity: 1, x: 0 }}
                className="lg:col-span-2 bg-white rounded-3xl shadow-xl p-8"
              >
                <h2 className="text-2xl font-bold mb-8">Shipping Details</h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="font-semibold">Full Name</label>
                    <div className="relative mt-2">
                      <FaUser className="absolute left-4 top-4 text-gray-400" />
                      <input
                        name="fullName"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full pl-10"
                        placeholder="Enter Name"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold">Email</label>
                    <div className="relative mt-2">
                      <FaEnvelope className="absolute left-4 top-4 text-gray-400" />
                      <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="input input-bordered w-full pl-10"
                        placeholder="Email"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold">Phone</label>
                    <div className="relative mt-2">
                      <FaPhone className="absolute left-4 top-4 text-gray-400" />
                      <input
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        type="number"
                        className="input input-bordered w-full pl-10"
                        placeholder="03XXXXXXXXX"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-semibold">City</label>
                    <input
                      name="city"
                      value={formData.city}
                      onChange={handleChange}
                      required
                      className="input input-bordered w-full mt-2"
                      placeholder="Karachi"
                    />
                  </div>
                </div>

                <div className="mt-6">
                  <label className="font-semibold">Shipping Address</label>
                  <div className="relative mt-2">
                    <FaMapMarkerAlt className="absolute left-4 top-4 text-gray-400" />
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      rows={4}
                      className="textarea textarea-bordered w-full pl-10"
                      placeholder="Complete Address"
                    />
                  </div>
                </div>

                {/* Payment Selection */}
                <h2 className="text-2xl font-bold mt-10 mb-6">
                  Payment Method
                </h2>

                <div className="grid md:grid-cols-2 gap-5">
                  <label
                    className={`border rounded-2xl p-5 cursor-pointer transition ${
                      payment === "cod" ? "border-green-500 bg-green-50" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={payment === "cod"}
                      onChange={() => setPayment("cod")}
                      className="hidden"
                    />
                    <FaMoneyBillWave className="text-4xl text-green-500 mb-3" />
                    <h3 className="font-bold">Cash On Delivery</h3>
                  </label>

                  <label
                    className={`border rounded-2xl p-5 cursor-pointer transition ${
                      payment === "card" ? "border-green-500 bg-green-50" : ""
                    }`}
                  >
                    <input
                      type="radio"
                      checked={payment === "card"}
                      onChange={() => setPayment("card")}
                      className="hidden"
                    />
                    <FaCreditCard className="text-4xl text-blue-500 mb-3" />
                    <h3 className="font-bold">Credit / Debit Card</h3>
                  </label>

                  <label
                    className={`border rounded-2xl p-5 cursor-pointer ${
                      payment === "jazzcash"
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      checked={payment === "jazzcash"}
                      onChange={() => setPayment("jazzcash")}
                    />
                    <img src={JazzCash} alt="JazzCash" className="w-14 mb-3" />
                    <h3 className="font-bold">JazzCash</h3>
                  </label>

                  <label
                    className={`border rounded-2xl p-5 cursor-pointer ${
                      payment === "easypaisa"
                        ? "border-green-500 bg-green-50"
                        : ""
                    }`}
                  >
                    <input
                      type="radio"
                      className="hidden"
                      checked={payment === "easypaisa"}
                      onChange={() => setPayment("easypaisa")}
                    />
                    <img
                      src={EasyPaisa}
                      alt="EasyPaisa"
                      className="w-14 mb-3"
                    />
                    <h3 className="font-bold">EasyPaisa</h3>
                  </label>
                </div>
              </motion.div>

              {/* Right Column: Summary */}
              <motion.div
                initial={{ opacity: 0, x: 80 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white rounded-3xl shadow-xl p-8 h-fit sticky top-28"
              >
                <h2 className="text-2xl font-bold mb-6">Order Summary</h2>

                <div className="space-y-4">
                  {cartItems.map((item) => (
                    <div
                      key={item.productId}
                      className="flex justify-between"
                    >
                      <span>
                        {item.name} × {item.qty}
                      </span>
                      <span>
                        Rs {(item.price * item.qty).toLocaleString()}
                      </span>
                    </div>
                  ))}

                  <hr />

                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rs {subtotal.toLocaleString()}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span className="text-green-600">
                      {shipping === 0 ? "FREE" : `Rs ${shipping}`}
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
                  type="submit"
                  form="checkout-form"
                  className="btn bg-orange-500 hover:bg-orange-600 text-white w-full mt-8"
                >
                  Place Order
                </button>
              </motion.div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Checkout;