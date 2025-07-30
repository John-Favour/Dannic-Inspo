import './Comment.css'
import Images from '../Image/Image';
import { useState } from 'react';
import apiRequest from '../../utils/apiRequest';
import SingleComment from './SingleComment';
import { useQuery } from '@tanstack/react-query';
import CommentForm from './commentForm';
import { format } from "timeago.js";


const Comment = ({ id }) => {

  const [open, setOpen] = useState(false);


  // const {id} = useParams()
  const { isPending, error, data } = useQuery({
    queryKey: ["comments", id],
    queryFn: () => apiRequest.get(`/comments/${id}`).then((res) => res.data),
  })

  if (isPending) return "Loading...  ";
  if (error) return "An error has occured: " + error.message;
  if (!data) return "comment not found!";


  return (
    <div className='comments'>
      <div className="commentList">

        <span className='commentCount' >{data.length === 0 ? "No Comments" : data.length + " Comment(s)"}</span>
        {/* comment */}
        {
          data.map((comment) => (
            <SingleComment key={comment._id} comment={comment} />
          ))

        }
      </div>
      < CommentForm id={id} />
    </div>
  )
}

export default Comment