import './postPage.css'
import Images from '../../components/Image/Image'
import PostInteractions from '../../components/postInteractions/PostInteractions'
import Comment from '../../components/comments/Comment'
import { Link, useParams } from 'react-router-dom'
import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import apiRequest from '../../utils/apiRequest'
import ReadMoreText from '../../components/readMore/readMore'
import Avatar from '../../components/avatar/avatar'


const postPage = () => {

  const {_id} = useParams()
  const id = _id || "64f0b1c8d4f2e3b5c8a9b1a2"; // Fallback ID for testing
  const {isPending,error,data} = useQuery({
    queryKey:["pin",id],
    queryFn:()=> apiRequest.get(`/pins/${id}`).then((res) => res.data),
  })

if(isPending) return "Loading...  ";
if(error) return "An error has occured: "+ error.message ;





if(!data) return "Pin not found!";

  return (
    <div className="postPage">
      
      <div className=" postContainer  ">
          <div className="postImg">
            < PostInteractions postId={id} imageUrl={data} />
<picture>
              <Images src={data.media} w={736}/>

</picture>
          </div>
          <div className="postDetail">
            <Link to={`/profile/${data.user.username}`} className="postUser">
              {/* <Images src={data.user.img || "/general/noAvatar.png" } className="userImg"/>  */}
              <Avatar name={data.user.displayName} size="40px" />
              <span className='username'>{data.user.displayName}</span>
            </Link>
            <div>
              <h1 className='postTitle'>{data.title}</h1>
              <ReadMoreText text={data.description} limit={60} />
            </div>
            <Comment id={data._id} />
          </div>
       
      </div>
    </div>)
}

export default postPage