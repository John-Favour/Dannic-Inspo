import './authPage.css'
import { useState } from 'react'
import axios from "axios";
import toast from 'react-hot-toast';
import { useNavigate } from "react-router-dom"

import Images from '../../components/Image/Image'
import apiRequest from '../../utils/apiRequest';
import BackButton from '../../components/backButton/backButton';
import useAuthStore from '../../utils/authStore';


const authPage = () => {
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState("");
   const [acceptedTerms, setAcceptedTerms] = useState(false);


  const navigate = useNavigate()
  const { setCurrentUser } = useAuthStore()

  const handleSubmit = async (e) => {
    e.preventDefault()

 if (!acceptedTerms && isRegister) {
    setError("You must accept the Terms and Conditions.");
    return;
  }

    const formData = new FormData(e.target)
    const data = Object.fromEntries(formData)

    try {
      const res = await apiRequest.post(`/users/auth/${isRegister ? "register" : "login"}`, data)
      setCurrentUser(res.data);
      if ( !isRegister) {
      toast.success("Welcome back!");
      navigate("/")  
      }else{
      localStorage.setItem("emailForVerification", data.email);
      navigate("/DannicInspoVerificationPage");
      }

    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong")
      console.log(err);
      console.log("Axios error:", err.response?.data);

    }
  }

  return (
    <div className='authPage' >
      <BackButton />
      <div className="authContainer">
        {/* <img src="/general/logo.png" alt="" w={36} h={36} /> */}
        <Images src="/general/logo.png" alt="" w={56} h={56} />
        {error && <p className='error'>{error}</p>}
        <h1>{isRegister ? "Create an account" : "Sign-in to your account"} </h1>
        {
          isRegister ? (
            <form key="registerForm" onSubmit={handleSubmit}>
              <div className="formGroup">
                <label htmlFor="username">Username</label>
                <input type="username" name="username" id="username" required placeholder='Username' />
              </div>
              <div className="formGroup">
                <label htmlFor="displayName">Name</label>
                <input type="name" name="displayName" id="displayName" required placeholder='Name' />
              </div>
              <div className="formGroup">
                <label htmlFor="email">Email</label>
                <input type="email" name="email" id="email" required placeholder='Email' />
              </div>
              <div className="formGroup">
                <label htmlFor="password">Password</label>
                <input type="password" name="password" id="password" required placeholder='Password' />
              </div>
              <button>Register</button>
              <div className="form-check mb-3">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="termsCheck"
                  checked={acceptedTerms}
                  onChange={(e) => setAcceptedTerms(e.target.checked)}
                />
                <label className="form-check-label" htmlFor="termsCheck">
                  I agree to the <a href="/terms" target="_blank">Terms & Conditions</a>
                </label>
              <p onClick={() => { setIsRegister(false) }}>Do you have an account? <b>Sign In</b> </p>
              </div>
            </form>
          ) :
            (
              <form action="" key="loginForm" onSubmit={handleSubmit}>
                <div className="formGroup">
                  <label htmlFor="">Email</label>
                  <input type="email" name="email" id="email" required placeholder='Email' />
                </div>
                <div className="formGroup">
                  <label htmlFor="">Password</label>
                  <input type="password" name="password" id="password" required placeholder='Password' />
                </div>
                <button>LogIn</button>
                <p onClick={() => { setIsRegister(true) }}>Dont have an account? <b>Sign Up</b> </p>
                {error && <p className='error'>{error}</p>}

              </form>
            )

        }
      </div>
    </div>
  )
}

export default authPage