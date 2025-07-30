import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiRequest from "../../utils/apiRequest";
import Images from '../../components/Image/Image'
import "./verifyEmail.css"
import BackButton from "../backButton/backButton";
import toast from "react-hot-toast";


const VerifyEmail = ({ userId }) => {
  const [code, setCode] = useState("");
  const [error, setError] = useState("");
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const storedEmail = localStorage.getItem("emailForVerification");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      setError("Email not found. Please sign up again.");
      // setTimeout(() => navigate("/signup"), 3000);
    }
  }, []);

  const handleVerify = async () => {
    if (!/^\d{6}$/.test(code)) {
      setError("Please enter a valid 6-digit code.");
      return;
    }

    setIsLoading(true);
    try {
      const res = await apiRequest.post("/users/verify-email", { email, token: code });
      alert("Email verified successfully!");
      localStorage.removeItem("emailForVerification");
            toast.success("Email verification successful");
      navigate("/auth");
    } catch (err) {
      setError(err.response?.data?.message || "Verification failed");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="authPage">
      <BackButton />
      <div className="authContainer">
                <Images src="/general/logo.png" alt="" w={56} h={56} />
      <h2>Verify Your Email</h2>
      <p>Enter the 6-digit code sent to your email</p>
      <input
        type="text"
        value={code}
        onChange={(e) => {
          setCode(e.target.value);
          if (error) setError("");
        }}
        placeholder="Enter code"
        maxLength={6}
      />
      {error && <p className="error">{error}</p>}
      <button onClick={handleVerify} disabled={isLoading}>
        {isLoading ? "Verifying..." : "Verify"}
      </button>

      </div>
          </div>
  );
};

export default VerifyEmail;
