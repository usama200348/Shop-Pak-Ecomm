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
  const [showLoadingModal, setShowLoadingModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [role, setRole] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const modalRef = useRef(null);
  const apiUrl = `${import.meta.env.VITE_API_URL}/api/auth/register`;

  const HandleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
      setShowLoadingModal(true);
try {
  console.log("1. Before fetch");

  const res = await fetch(apiUrl, {
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
    setShowLoadingModal(false);
console.log(data);

if (res.ok) {
    setUserData(data);
      setShowSuccessModal(true);

    modalRef.current.showModal();
}
else{
    alert(data.message);
}
} catch (err) {
  console.log("FETCH ERROR:", err);
      setShowLoadingModal(false);

} finally {
  setLoading(false);
}
  };

  const handleSuccess = () => {
    login(userData);
  setShowSuccessModal(false);
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
  required
>
  <option value="" selected disabled> Select Role  </option>
  <option value="user">User</option>
  <option value="admin">Admin</option>
</select>
          </fieldset>
          <button
            type="submit"
            className="btn bg-[#00c950] hover:bg-green-600 hover:text-white w-full"
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

{showLoadingModal && (
  <dialog open className="modal">
    <div className="modal-box text-center">

      <span className="loading loading-spinner loading-lg text-success"></span>

      <h3 className="font-bold text-xl mt-4">
        Creating Your User Account
      </h3>

      <p className="mt-3 text-gray-500">
        Please wait while we create your account...
      </p>

    </div>
  </dialog>
)}

      {/* Success Modal */}
   {showSuccessModal && (
  <dialog open className="modal">
    <div className="modal-box text-center">

      <FaCircleCheck className="text-6xl text-green-500 mx-auto mb-4 animate-bounce" />

      <h3 className="font-bold text-2xl text-green-600">
        Registration Successful
      </h3>

      <p className="py-4">
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
)}
    </>
  );
};

export default Register;