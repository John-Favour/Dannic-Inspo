import "./delete.css";
import { useState } from "react";
import useAuthStore from "../../utils/authStore";
import apiRequest from "../../utils/apiRequest";
import Images from '../Image/Image'
import { toast } from "react-hot-toast";
import { format } from "timeago.js";


const DeleteButton = ({ itemId, itemOwnerId, onDelete, deleteText = "Delete",pins }) => {
  const currentUser = useAuthStore((state => state.currentUser));
  const isOwner = currentUser?._id === itemOwnerId;
  const [confirming, setConfirming] = useState(false);

  if (!isOwner) return null; // Only show for creator

  const handleConfirm = async () => {
    try {
      await onDelete(itemId); // Pass your custom delete logic
      setConfirming(false);
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  };
  const handleSetComfirming = () => {
    setConfirming(true);
    setTimeout(() => {
      setConfirming(false);
    }, 15000); // Auto-cancel after 5 seconds
  }

  return (
    <div>
      {!confirming ? (
        <button
        onClick={() => handleSetComfirming()}
        >
        <Images src="/general/delete.svg" alt="" />
          {/* {deleteText} */}
        </button>
      ) : (

        <div className="delete-confirmation">
          <div className="pin-details">
            <span> Title : {pins.title}</span><br />
            <span>Created : {format(pins.createdAt)}</span>
          </div>
          <p>Do you want to delete this Pin?</p>
        <div className="btnDelete">
            <button
            className="cancel"
            onClick={() => setConfirming(false)}
          >
            Cancel
          </button>
          <button
            className="confirm"
            onClick={handleConfirm}
          >
             Delete
          </button>
        </div>
        </div>
      )}
    </div>
  );
};

export default DeleteButton;
