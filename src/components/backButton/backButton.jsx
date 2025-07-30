import { useNavigate } from "react-router-dom";
import './BackButton.css'; // Create this CSS file

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="btn  d-flex align-items-center gap-2 back-btn"
      onClick={() => navigate(-1)}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="25"
        height="25"
        fill="currentColor"
        className="bi bi-arrow-left"
        viewBox="0 0 16 16"
      >
        <path
          fillRule="evenodd"
          d="M15 8a.5.5 0 0 1-.5.5H3.707l3.147 3.146a.5.5 0 0 1-.708.708l-4-4a.5.5 0 0 1 0-.708l4-4a.5.5 0 1 1 .708.708L3.707 7.5H14.5A.5.5 0 0 1 15 8z"
        />
      </svg>
      <span className="back-text">Back</span>
    </button>
  );
};

export default BackButton;
