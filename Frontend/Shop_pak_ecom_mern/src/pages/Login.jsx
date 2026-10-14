import React, { useContext, useState, useRef } from 'react';
import { AuthContext } from '../context/AuthContext';
import { FaCircleCheck } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { API_URL } from '../config/api';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');
    const [userData, setUserData] = useState(null);
    const { login } = useContext(AuthContext);
    const modalRef = useRef(null);
    const navigate = useNavigate();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrorMessage('');
        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email,
                    password,
                }),
            });
            const data = await res.json();

            if (res.ok) {
                setUserData(data);
                setEmail("");
                setPassword("");
                modalRef.current.showModal();
            } else {
                setErrorMessage(data.message || "Invalid email or password");
            }
        } catch (error) {
            console.error("Login Error:", error.message);
            setErrorMessage("Network error: Could not reach backend server. Please make sure the backend is running.");
        } finally {
            setLoading(false);
        }
    };

const HandleContinue=()=>{
    login(userData);
    modalRef.current.close();
    navigate('/');
};

  return (
    <>
    <div className='flex justify-center items-center min-h-screen'>
        <form onSubmit={handleSubmit} className='bg-white shadow-xl rounded-2xl p-8 w-full max-w-md'>
            <h2 className='text-3xl font-bold text-center mb-6'>Login</h2>
            {errorMessage && (
              <div className="alert alert-error text-sm py-2 mb-4">
                <span>{errorMessage}</span>
              </div>
            )}
            <fieldset className="fieldset">
  <legend className="fieldset-legend">Email</legend>
  <input type="email" className="input input-bordered w-full" placeholder="Enter Email" value={email} onChange={(e)=>setEmail(e.target.value)} required />
</fieldset>
            <fieldset className="fieldset">
  <legend className="fieldset-legend">Password</legend>
  <input type="password" className="input input-bordered w-full" placeholder="Enter Password" value={password} onChange={(e)=>setPassword(e.target.value)} required />
</fieldset>
<button type='submit' className='btn bg-green-500 hover:bg-green-600 hover:text-white w-full text-gray-800 mt-2' >Login</button>
{/* <a className='btn bg-green-500 w-full text-gray-800 mt-2'>Login</a> */}
      <p className='text-center mt-5'>Don't Have An Account 
        <Link to={'/register'}
        className='text-green-600 gap-2 font-semibold hover:underline'><span className='text-green-500 ml-1'>Click Here</span></Link>
        </p>
        </form>
    </div>

    {loading && (
        <>
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm'>
        <div className='bg-white rounded-2xl p-8 shadow-xl flex flex-col items-center gap-4'>
            <span className='loading loading-spinner loading-lg text-green-500'></span>
       <h3 className='text-xl font-bold'>Logging You In</h3>
        <p className='text-gray-500'>
            Please Wait For A Moment
        </p>
        </div>
        </div>
        </>
    )}
  
  <dialog ref={modalRef} className="modal">
  <div className="modal-box text-center">

  <div className="text-6xl mb-4"><FaCircleCheck className="text-6xl text-green-500 mx-auto mb-4 animate-bounce" /></div>
    <h3 className="text-3xl font-bold text-green-600 mt-3">
      Login Successful
    </h3>

    <p className="mt-2 text-lg">
      Welcome,
    </p>

    <h2 className="text-2xl font-bold text-green-500">
      {userData?.user?.name || userData?.name}
    </h2>

    <div className="modal-action justify-center">
      <button
        className="btn btn-success"
        onClick={HandleContinue}
      >
        Continue
      </button>
    </div>

  </div>
</dialog>
    </>
  )
}

export default Login