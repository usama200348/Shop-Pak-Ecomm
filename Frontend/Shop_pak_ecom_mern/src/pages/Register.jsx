import React, { useContext, useRef, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import {FaCircleCheck} from 'react-icons/fa6'

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading,setLoading] = useState(false);
  const [userData, setUserData] = useState(null);
  const [role, setRole] = useState("user");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const modalRef = useRef(null);

  const HandleSubmit = async (e) => {
    setLoading(true)
    e.preventDefault();

    try {
const res = await fetch(`${import.meta.env.VITE_API_URL}/api/auth/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setUserData(data);
        modalRef.current.showModal();
        // Optional: Clear form
        setName("");
        setEmail("");
        setPassword("");
      } else {
        alert(data.message || "Failed While Registering Your Account");
      }
    } catch (error) {
      console.log("Error While Registering:", error.message);
    }finally{
      setLoading(false);
    }
  };

  const handleSuccess = () => {
    login(userData);
    modalRef.current.close();
    navigate("/");
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <form
          onSubmit={HandleSubmit}
          className="bg-white shadow-lg rounded-xl p-8 w-full max-w-md"
        >
          <h2 className="text-3xl font-bold text-center mb-6">
            Register
          </h2>

          <fieldset className="fieldset mb-3">
            <legend className="fieldset-legend">Full Name</legend>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="fieldset mb-3">
            <legend className="fieldset-legend">Email</legend>
            <input
              type="email"
              className="input input-bordered w-full"
              placeholder="Enter Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </fieldset>

          <fieldset className="fieldset mb-5">
            <legend className="fieldset-legend">Password</legend>
            <input
              type="password"
              className="input input-bordered w-full"
              placeholder="Enter Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </fieldset>
          <fieldset className="fieldset mb-5">
            <legend className="fieldset-legend">Role</legend>

            <select
              className="select select-bordered w-full"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="user" selected disabled>Select Role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </fieldset>
          <button
            type="submit"
            className="btn btn-success w-full"
          >
            Register
          </button>

          <p className="text-center mt-5">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-green-600 font-semibold hover:underline"
            >
              Login
            </Link>
          </p>
        </form>
      </div>


{loading && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm ">
    <div className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-4">
      <span className="loading loading-spinner loading-lg text-green-500"></span>
<h3 className="text-xl font-bold">Creating Your User Account</h3>
<p className="text-gray-500 text-center">Please Wait While Registering Your Account</p>
    </div>
  </div>
)}

      {/* Success Modal */}
      <dialog ref={modalRef} className="modal">
        <div className="modal-box text-center">
          <div className="text-6xl mb-4"><FaCircleCheck className="text-6xl text-green-500 mx-auto mb-4 animate-bounce" /></div>

          <h3 className="font-bold text-2xl text-green-600">
            Registration Successful
          </h3>

          <p className="py-4 text-gray-500">
            Your account has been created successfully.
          </p>

          <div className="modal-action justify-center">
            <button
              className="btn btn-success"
              onClick={handleSuccess}
            >
              Continue
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
};

export default Register;