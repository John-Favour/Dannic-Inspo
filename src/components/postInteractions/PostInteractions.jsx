import "./PostInt.css"
import Images from '../Image/Image';
import ShareModal from "../shareModal/shareModal";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";
import { useState } from "react";
import toast from 'react-hot-toast';
import useAuthStore from '../../utils/authStore';
import { Link } from "react-router-dom";



const interact = async (id, type) => {
  const res = await apiRequest.post(`/pins/interact/${id}`, { type });

  return res.data;
};

const PostInteractions = ({ postId, imageUrl }) => {
  const queryClient = useQueryClient();
  const [downloaded, setDownloaded] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const currentUser = useAuthStore((state) => state.currentUser);


  const mutation = useMutation({
    mutationFn: ({ id, type }) => interact(id, type),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["interactionCheck", postId] });
    },
  });

  const { isPending, error, data } = useQuery({
    queryKey: ["interactionCheck", postId],
    queryFn: () =>
      apiRequest
        .get(`/pins/interaction-check/${postId}`)
        .then((res) => res.data),
  });
  if (isPending || error) return;


  const IMAGEKIT_URL = "https://ik.imagekit.io/dandy2030"; // replace with your real endpoint

  const fullImageUrl = `${imageUrl.media}`;
  const shareUrl = `${fullImageUrl}`

  const handleDownload = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const extension = blob.type.split("/")[1] || "jpg";
      const fileName = `download-${Date.now()}.${extension}`;

      const link = document.createElement("a");
      link.href = URL.createObjectURL(blob);
      link.download = fileName;
      link.click();

      URL.revokeObjectURL(link.href);
      toast.success("Image downloaded successfully!");
      setDownloaded(false); // Reset downloaded state after download
    } catch (error) {
      toast.error("Failed to download image.");
      return;
    }
  };
  if (!data) return "No interactions found";

  return (
    <div className="postInteractions">
      <div className="interactionIcons">
        <svg
          width="30"
          height="30"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          onClick={() => {
            if (!currentUser) {
           toast.custom((t) => (
  <div className="custom-toast">
    <span>
      Please <Link to="/auth" className="link">login</Link> to like this post.
    </span>
  </div>
));              return;
            }
            mutation.mutate({ id: postId, type: "like" });
          }
          }
        >
          <path
            d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
            stroke={data.isLiked ? "#e50829" : "#000000"}
            strokeWidth="2"
            fill={data.isLiked ? "#e50829" : "none"}
          />
        </svg>
        {data.likeCount}
        <div className="download">
          <Images src="/general/share.svg" alt=""
            onClick={() => setShowShare((prev) => !prev)}
          />
          {
            showShare &&
            (
              <ShareModal url={shareUrl} onClose={() => setShowShare(false)} />
            )
          }
        </div>

        <div className="download">
          <Images src="/general/more.svg" alt=""
            onClick={() => setDownloaded((prev) => !prev)}
          />
          {
            downloaded &&
            (
              <p className="downloadText" onClick={() => handleDownload(fullImageUrl)}>Download</p>
            )
          }
        </div>
      </div>
      <button
        disabled={mutation.isPending}
        onClick={() => {
          if (!currentUser) {
            toast.custom((t) => (
  <div className="custom-toast">
    <span>
      Please <Link to="/auth" className="link">login</Link> to save this post.
    </span>
  </div>
));
            return;
          }
          mutation.mutate({ id: postId, type: "save" });
        }
        }
      >
        {data.isSaved ? "Saved" : "Save"}
      </button>
    </div>
  );
};

export default PostInteractions;