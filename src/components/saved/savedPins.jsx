import { useQuery } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import Images from "../Image/Image";
import { Link } from "react-router-dom";
import "./savepin.css"

const SavedPins = ({ userId }) => {
  const { isPending, error, data } = useQuery({
    queryKey: ["savedPins", userId],
    queryFn: () =>
      apiRequest.get(`/pins/saved/${userId}`).then((res) => res.data),
  });

  if (isPending) return "Loading saved pins...";
  if (error) return "Error loading saved pins: " + error.message;
  if (!data || data.length === 0) return "No saved pins yet.";

  return (
    <div className="gallery">
      {
      data.filter((pin) => pin && pin._id) // 💡 Only allow valid pins
        .map((pin) => (
<div className='ImageGallery' style={{ gridRowEnd: `span ${Math.ceil(pin.height / 100)}` }} key={pin._id}>
              <Images src={pin.media} alt={pin.title || "Saved Pin"}  key={pin._id} className="pinItem" w={372}/>
          <Link to={`/pin/${pin._id}`} className="overlay" /> 
                 <button className='saveButton'>Save</button>
           <div className="overlayIcons">
            <button>
              <Images src="/general/share.svg" alt=""
              />
            </button>
          </div>
    </div>
        ))}

     {/* <div className='ImageGallery' style={{ gridRowEnd: `span ${Math.ceil(pin.height / 100)}` }}>
          <Images src={pin.media} alt="" w={372} h={optimizedHeight} />
          <Link to={`/pin/${pin._id}`} className='overlay' />
          <button className='saveButton'>Save</button>
          <div className="overlayIcons">
            <button>
              <Images src="/general/share.svg" alt=""
              />
            </button>
          </div>
        </div> */}
        </div>
  );
};

export default SavedPins;
