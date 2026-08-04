import React from "react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaClock,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ContactUs = () => {
  return (
    <div className="bg-gray-50 min-h-screen">

      {/* Hero */}
      <section className="relative bg-gradient-to-r from-green-600 via-green-500 to-emerald-600 text-white overflow-hidden">

        <div className="absolute inset-0 bg-black/20"></div>

        <div className="relative max-w-7xl mx-auto px-6 py-24 text-center">

          <motion.h1
            initial={{ opacity: 0, y: -40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: .8 }}
            className="text-5xl md:text-6xl font-extrabold"
          >
            Contact <span className="text-yellow-300">ShopPak</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: .3 }}
            className="mt-6 text-lg max-w-2xl mx-auto text-green-100"
          >
            We'd love to hear from you. Whether you have a question,
            feedback or need support, our team is here to help.
          </motion.p>

        </div>

      </section>

      {/* Contact Cards */}

      <section className="max-w-7xl mx-auto px-6 -mt-16 relative z-10">

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <FaPhoneAlt className="text-5xl text-green-500 mx-auto mb-5" />

            <h3 className="text-xl font-bold">
              Phone
            </h3>

            <p className="text-gray-500 mt-3">
              +92 300 1234567
            </p>

            <p className="text-gray-500">
              +92 321 7654321
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <FaEnvelope className="text-5xl text-blue-500 mx-auto mb-5" />

            <h3 className="text-xl font-bold">
              Email
            </h3>

            <p className="text-gray-500 mt-3">
              support@shoppak.com
            </p>

            <p className="text-gray-500">
              info@shoppak.com
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <FaMapMarkerAlt className="text-5xl text-red-500 mx-auto mb-5" />

            <h3 className="text-xl font-bold">
              Address
            </h3>

            <p className="text-gray-500 mt-3">
              Shahrah-e-Faisal
            </p>

            <p className="text-gray-500">
              Karachi, Pakistan
            </p>

          </motion.div>

          <motion.div
            whileHover={{ y: -8 }}
            className="bg-white rounded-3xl shadow-xl p-8 text-center"
          >
            <FaClock className="text-5xl text-orange-500 mx-auto mb-5" />

            <h3 className="text-xl font-bold">
              Working Hours
            </h3>

            <p className="text-gray-500 mt-3">
              Mon - Sat
            </p>

            <p className="text-gray-500">
              9:00 AM - 8:00 PM
            </p>

          </motion.div>

        </div>

      </section>
      {/* Contact Form Section */}

<section className="max-w-7xl mx-auto px-6 py-20">

  <div className="grid lg:grid-cols-2 gap-12">

    {/* Left */}

    <motion.div
      initial={{ opacity: 0, x: -80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: .7 }}
      viewport={{ once: true }}
      className="bg-white rounded-3xl shadow-xl p-8"
    >

      <h2 className="text-4xl font-bold mb-3">
        Send us a Message
      </h2>

      <p className="text-gray-500 mb-8">
        Have a question? Fill out the form below and our support team
        will get back to you within 24 hours.
      </p>

      <form className="space-y-6">

        <div className="grid md:grid-cols-2 gap-5">

          <input
            type="text"
            placeholder="Full Name"
            className="input input-bordered w-full"
          />

          <input
            type="email"
            placeholder="Email Address"
            className="input input-bordered w-full"
          />

        </div>

        <input
          type="text"
          placeholder="Subject"
          className="input input-bordered w-full"
        />

        <textarea
          rows="6"
          placeholder="Write your message..."
          className="textarea textarea-bordered w-full"
        ></textarea>

        <button className="btn bg-green-500 hover:bg-green-600 border-none text-white w-full text-lg">

          Send Message

        </button>

      </form>

    </motion.div>

    {/* Right */}

    <motion.div
      initial={{ opacity: 0, x: 80 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ duration: .7 }}
      viewport={{ once: true }}
      className="space-y-6"
    >

      <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-3xl text-white p-8 shadow-xl">

        <h2 className="text-3xl font-bold mb-5">
          Why Shop With Us?
        </h2>

        <ul className="space-y-5">

          <li className="flex items-center gap-4">
            ✅ Fast Nationwide Delivery
          </li>

          <li className="flex items-center gap-4">
            ✅ Secure Payments
          </li>

          <li className="flex items-center gap-4">
            ✅ Original Products
          </li>

          <li className="flex items-center gap-4">
            ✅ Easy Returns
          </li>

          <li className="flex items-center gap-4">
            ✅ 24/7 Customer Support
          </li>

        </ul>

      </div>

      <div className="bg-white rounded-3xl shadow-xl p-8">

        <h2 className="text-2xl font-bold mb-5">

          Customer Support

        </h2>

        <p className="text-gray-500 leading-8">

          Our customer service representatives are available
          every day to answer your questions regarding
          orders, payments, shipping and returns.

        </p>

        <button className="btn btn-outline border-green-500 text-green-500 hover:bg-green-500 hover:text-white mt-6">

          Live Chat

        </button>

      </div>

    </motion.div>

  </div>

</section>
    </div>
  );
};

export default ContactUs;