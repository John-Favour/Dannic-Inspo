import Images from "../Image/Image"
import Avatar from "../avatar/avatar";

import { format } from "timeago.js";

const SingleComment = ({comment}) => {
  return (
 <div className="comment">
          {/* <Images src={comment.user.img || "/general/noAvatar.png"} alt="" /> */}
    <Avatar name={comment.user.displayName} size="40px" />
          {/* <Images src="/general/noAvatar.png" alt="" /> */}
          <div className="commentContents">
            <span className='commentUsername'>{comment.user.displayName}</span>
            <p className='commentText'>
    {comment.description}
            </p>
            <span className="commentTime">{format(comment.createdAt)}</span>
          </div>
        </div>
)
}

export default SingleComment