import React, { useEffect, useState } from "react";
import { FaShoppingBag, FaSearch, FaTruck, FaCheckCircle, FaClock, FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { API_URL } from "../config/api";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const userInfo = JSON.parse(localStorage.getItem("userInfo"));

        if (!userInfo || !userInfo.token) {
          setError("You must be logged in to view orders.");
          setLoading(false);
          return;
        }

        const endpoint = userInfo.role === "admin"
          ? `${API_URL}/api/order`
          : `${API_URL}/api/order/myorders`;

        const res = await fetch(endpoint, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${userInfo.token}`,
          },
        });

        const data = await res.json();

        if (res.ok) {
          setOrders(Array.isArray(data) ? data : []);
        } else {
          setError(data.message || "Failed to load orders");
          setOrders([]);
        }
      } catch (err) {
        console.error("Orders fetch error:", err);
        setError("Network error: Could not reach backend server.");
        setOrders([]);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  const orderList = Array.isArray(orders) ? orders : [];
  const filteredOrders = orderList.filter((order) =>
    (order.user?.name || "").toLowerCase().includes(search.toLowerCase()) ||
    (order._id || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-4 sm:p-8 overflow-x-hidden">

      {/* Header */}

      <div className="flex flex-col lg:flex-row justify-between items-center gap-5 mb-8">

        <div>
          <h1 className="text-4xl font-bold text-gray-800">
            Orders Dashboard
          </h1>

          <p className="text-gray-500 mt-2">
            View and manage customer orders.
          </p>
        </div>

        <div className="relative w-full lg:w-96">

          <FaSearch className="absolute left-4 top-4 text-gray-400" />

          <input
            type="text"
            placeholder="Search Customer..."
            className="input input-bordered w-full pl-12"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>
      </div>

      {error && (
        <div className="alert alert-error mb-8">
          <span>{error}</span>
          {!localStorage.getItem("userInfo") && (
            <Link to="/login" className="btn btn-sm btn-outline ml-4">
              Login
            </Link>
          )}
        </div>
      )}

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold">{orderList.length}</h2>
          </div>

          <FaShoppingBag className="text-5xl text-green-500" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold">
              {orderList.filter((o) => o?.status?.toLowerCase() === "pending").length}
            </h2>
          </div>

          <FaClock className="text-5xl text-yellow-500" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Delivered</p>
            <h2 className="text-3xl font-bold">
              {orderList.filter((o) => o?.status?.toLowerCase() === "delivered").length}
            </h2>
          </div>

          <FaCheckCircle className="text-5xl text-green-600" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Shipped</p>
            <h2 className="text-3xl font-bold">
              {orderList.filter((o) => o?.status?.toLowerCase() === "shipped").length}
            </h2>
          </div>

          <FaTruck className="text-5xl text-blue-500" />
        </div>

      </div>

      {/* Orders Table */}

      <div className="bg-white rounded-lg shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="table min-w-225">

            <thead className="bg-green-600 text-white">

              <tr>
                <th>Order ID</th>
                <th>Customer</th>
                <th>Items</th>
                <th>Total</th>
                <th>Payment</th>
                <th>Status</th>
                <th>Date</th>
                <th className="text-center">Action</th>
              </tr>

            </thead>

            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan="8" className="text-center py-8 text-gray-500">
                    No orders found.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((order) => (
                  <tr key={order._id}>

                    <td className="font-mono text-xs">{order._id ? order._id.slice(-6).toUpperCase() : "-"}</td>

                    <td>{order.user?.name || "Customer"}</td>

                    <td>{order.items?.length || 0}</td>

                    <td>Rs {(order.totalAmount || 0).toLocaleString()}</td>

                    <td>
                      <span
                        className={`badge ${
                          order.paymentId
                            ? "badge-success"
                            : "badge-warning"
                        }`}
                      >
                        {order.paymentId ? "Paid" : "COD"}
                      </span>
                    </td>

                    <td>
                      <span
                        className={`badge ${
                          order.status === "delivered"
                            ? "badge-success"
                            : order.status === "pending"
                            ? "badge-warning"
                            : order.status === "cancelled"
                            ? "badge-error"
                            : "badge-info"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>

                    <td>
                      {order.createdAt ? new Date(order.createdAt).toLocaleDateString() : "-"}
                    </td>

                    <td>
                      <button className="btn btn-info btn-sm">
                        <FaEye />
                      </button>
                    </td>

                  </tr>
                ))
              )}
            </tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default Orders;
