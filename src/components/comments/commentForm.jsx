import EmojiPicker from "emoji-picker-react";
import { useState } from "react";
import apiRequest from "../../utils/apiRequest";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import useAuthStore from '../../utils/authStore';
import toast from 'react-hot-toast';
import { Link } from "react-router-dom";


export const addComment = async (comment) => {
  const res = await apiRequest.post("/comments", comment);
  return res.data;
};

const CommentForm = ({ id }) => {
  const [open, setOpen] = useState(false);
  const [desc, setDesc] = useState("");
  const currentUser = useAuthStore((state) => state.currentUser);

  const handleEmojiClick = (emoji) => {
    setDesc((prev) => prev + " " + emoji.emoji);
    setOpen(false);
  };

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: addComment,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["comments", id] });
      setDesc("");
      setOpen(false);
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    mutation.mutate({
      description: desc,
      pin: id,
    });
  };

  return (
    <form className="commentForm" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Add a comment"
        onChange={(e) => setDesc(e.target.value)}
        value={desc}
      />
      <div className="emoji">
        <div onClick={() => setOpen((prev) => !prev)}>😊</div>
        {open && (
          <div className="emojiPicker">
            <EmojiPicker onEmojiClick={handleEmojiClick} />
          </div>
        )}
      </div>
      <button type="submit" disabled={mutation.isPending}
        onClick={()=>{
          if (!currentUser) {
                      toast.custom((t) => (
            <div className="custom-toast">
              <span>
                Please... <Link to="/auth" className="link">login</Link> to comment.
              </span>
            </div>
          ));
                      return;
                    }
                    handleSubmit
        }}
          
      className="btn btn-primary"
      >
        {mutation.isPending ? "Posting..." : "Post"}
      
      </button>
    </form>
  );
};

export default CommentForm;