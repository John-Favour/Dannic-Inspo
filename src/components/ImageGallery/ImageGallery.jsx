import './ImageGallery.css'
import { Link } from "react-router-dom"
import Images from '../Image/Image'
import useAuthStore from '../../utils/authStore';
import DeleteButton from '../delete/deleteComp';
import { useQueryClient } from '@tanstack/react-query';

import { toast } from 'react-hot-toast';
import apiRequest from '../../utils/apiRequest';





const ImageGallery = ({ item }) => {
  const optimizedHeight = (372 * item.height) / item.width

const currentUser = useAuthStore((state) => state.currentUser);
const queryClient = useQueryClient();

const handleDelete = async (pinId) => {
  try {
    await apiRequest.delete(`/pins/delete/${item._id}`);
    queryClient.invalidateQueries({ queryKey: ["pins"] });
    toast.success("Pin deleted successfully!");

    queryClient.invalidateQueries({ queryKey: ["profile", currentUser.username] });

  } catch (error) {
    console.error("Failed to delete pin:", error);
  }
}

  return (
    <div className='ImageGallery' style={{ gridRowEnd: `span ${Math.ceil(item.height / 100)}` }}>
      <Images src={item.media} alt="" w={372} h={optimizedHeight} />
      <Link to={`/pin/${item._id}`} className='overlay' />
      <button className='saveButton'>Save</button>
      <div className="overlayIcons">
        <button>
          <Images src="/general/share.svg" alt=""
          />
        </button>
            {/* 🔥 Show Delete only if this user owns it */}
        {currentUser?._id === item.user && (
          <DeleteButton
            itemId={item._id}
            itemOwnerId={item.user}
            onDelete={handleDelete}
            deleteText="Delete"
            pins={item}
          />
        )}
      </div>
    </div>

  )
}

export default ImageGallery