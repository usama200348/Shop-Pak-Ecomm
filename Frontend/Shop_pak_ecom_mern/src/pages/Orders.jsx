import React, { useEffect, useState } from "react";
import {FaShoppingBag,FaSearch,FaTruck,FaCheckCircle,FaClock,FaEye} from "react-icons/fa";

const Orders = () => {
  const [search, setSearch] = useState("");
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);


useEffect(() => {
  const fetchOrders = async () => {
    try {
      const userInfo = JSON.parse(localStorage.getItem("userInfo"));

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/order`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${userInfo.token}`,
        },
      });

      const data = await res.json();

      console.log(data);

      if (res.ok) {
        setOrders(data);
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
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
  const filteredOrders = orders.filter((order) =>
  order.user?.name?.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 p-8">

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

      {/* Stats */}

      <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Total Orders</p>
            <h2 className="text-3xl font-bold">{orders.length}</h2>
          </div>

          <FaShoppingBag className="text-5xl text-green-500" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Pending</p>
            <h2 className="text-3xl font-bold">
              {orders.filter((o) => o.status?.toLowerCase() === "pending").length}
            </h2>
          </div>

          <FaClock className="text-5xl text-yellow-500" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Delivered</p>
            <h2 className="text-3xl font-bold">
              {orders.filter((o) => o.status?.toLowerCase() === "delivered").length}
            </h2>
          </div>

          <FaCheckCircle className="text-5xl text-green-600" />
        </div>

        <div className="bg-white rounded-2xl shadow-lg p-6 flex justify-between items-center">
          <div>
            <p className="text-gray-500">Shipped</p>
            <h2 className="text-3xl font-bold">
              {orders.filter((o) => o.status?.toLowerCase() === "cancelled").length}
            </h2>
          </div>

          <FaTruck className="text-5xl text-blue-500" />
        </div>

      </div>

      {/* Orders Table */}

      <div className="bg-white rounded-3xl shadow-xl overflow-hidden">

        <div className="overflow-x-auto">

          <table className="table">

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
  {filteredOrders.map((order) => (
    <tr key={order._id}>

      <td>{order._id.slice(-6).toUpperCase()}</td>

      <td>{order.user?.name}</td>

      <td>{order.items?.length}</td>

      <td>Rs {order.totalAmount.toLocaleString()}</td>

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
        {new Date(order.createdAt).toLocaleDateString()}
      </td>

      <td>
        <button className="btn btn-info btn-sm">
          <FaEye />
        </button>
      </td>

    </tr>
  ))}
</tbody>

          </table>

        </div>
      </div>
    </div>
  );
};

export default Orders;