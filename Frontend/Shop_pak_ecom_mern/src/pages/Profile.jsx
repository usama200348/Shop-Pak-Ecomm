import React, { useContext, useEffect, useState } from "react";
import {
  FaUserCircle,
  FaUser,
  FaEnvelope,
  FaLock,
  FaUserShield,
  FaCheckCircle,
  FaSave,
} from "react-icons/fa";
import { AuthContext } from "../context/AuthContext";

const Profile = () => {
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    verified: false,
  });

  useEffect(() => {
    getProfile();
  }, []);

  const getProfile = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/profile`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setFormData({
          name: data.name,
          email: data.email,
          password: "",
          role: data.role,
          verified: data.verified,
        });
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.type === "checkbox"
          ? e.target.checked
          : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setSaving(true);

    try {
      const user = JSON.parse(localStorage.getItem("userInfo"));

      const res = await fetch("/api/auth/profile", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        localStorage.setItem("userInfo", JSON.stringify(data));
        login(data);

        alert("Profile Updated Successfully");
      } else {
        alert(data.message);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <span className="loading loading-spinner loading-lg text-success"></span>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-100 via-white to-green-50 py-12 px-5">
      <div className="max-w-5xl mx-auto">

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">

          {/* Header */}

          <div className="bg-gradient-to-r from-green-500 to-green-700 h-48 relative">

            <div className="absolute left-1/2 -bottom-16 -translate-x-1/2">

              <div className="bg-white rounded-full p-2 shadow-xl">

                <FaUserCircle className="text-[130px] text-green-600" />

              </div>

            </div>

          </div>

          {/* Body */}

          <div className="pt-24 pb-10 px-8">

            <div className="flex flex-col items-center">

              <h2 className="text-3xl font-bold">
                {formData.name}
              </h2>

              <p className="text-gray-500">
                {formData.email}
              </p>

              <div className="flex gap-3 mt-4">

                <span
                  className={`badge badge-lg ${
                    formData.role === "admin"
                      ? "badge-error"
                      : "badge-success"
                  }`}
                >
                  <FaUserShield />
                  {formData.role.toUpperCase()}
                </span>

                <span
                  className={`badge badge-lg ${
                    formData.verified
                      ? "badge-primary"
                      : "badge-warning"
                  }`}
                >
                  <FaCheckCircle />

                  {formData.verified
                    ? "Verified"
                    : "Not Verified"}
                </span>

              </div>

            </div>

            <form
              onSubmit={handleSubmit}
              className="grid md:grid-cols-2 gap-6 mt-12"
            >

              <div>

                <label className="font-semibold">
                  Full Name
                </label>

                <div className="relative mt-2">

                  <FaUser className="absolute left-4 top-4 text-gray-400" />

                  <input
                    className="input input-bordered w-full pl-11"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div>

                <label className="font-semibold">
                  Email
                </label>

                <div className="relative mt-2">

                  <FaEnvelope className="absolute left-4 top-4 text-gray-400" />

                  <input
                    className="input input-bordered w-full pl-11"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="md:col-span-2">

                <label className="font-semibold">
                  Change Password
                </label>

                <div className="relative mt-2">

                  <FaLock className="absolute left-4 top-4 text-gray-400" />

                  <input
                    type="password"
                    placeholder="Update Password (Optional)"
                    className="input input-bordered w-full pl-11"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                  />

                </div>

              </div>

              <div className="md:col-span-2 mt-4">

                <button
                  className={`btn btn-success w-full text-lg ${
                    saving && "btn-disabled"
                  }`}
                >
                  {saving ? (
                    <>
                      <span className="loading loading-spinner"></span>

                      Updating...
                    </>
                  ) : (
                    <>
                      <FaSave />

                      Save Changes
                    </>
                  )}
                </button>

              </div>

            </form>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Profile;