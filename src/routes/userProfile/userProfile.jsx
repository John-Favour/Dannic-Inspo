import './userProfile.css'
import Images from '../../components/Image/Image'
import { useState } from 'react'
import Boards from '../../components/boards/Boards'
import Gallery from '../../components/gallery/gallery'
import { useQuery } from '@tanstack/react-query'
import { useParams } from 'react-router-dom';
import apiRequest from '../../utils/apiRequest'
import FollowButton from './followButton';
import SavedPins from '../../components/saved/savedPins'
import DeletePinButton from '../../components/delete/deleteComp'

const userProfile = () => {
const [type,setType] = useState("saved");



  const {username} = useParams();
  const {isPending,error,data} = useQuery({
    queryKey:["profile",username],
    queryFn:()=> apiRequest.get(`/users/${username}`).then((res) => res.data),
  })

if(isPending) return "Loading...  ";
if(error)  {"An error has occured: "+ error.message;
// console.log(error.message);
}

if(!data) return "User not found!";




  return (
    <div className="profilePage">
      {/* <Images src="/general/noAvatar.png" alt="" className='profileImg'/>V */}
      <Images src= {data.img ||"/general/noAvatar.png"}
        alt="profile image"
        className='profileImg'
        w={100}
        h={100}
      />
      <h1 className='profileName'>{data.displayName}</h1>
      <span className='profileUsername'>{data.username}</span>
      <div className="followCounts">{data.followerCount}followers . {data.followingCount} folowing</div>
      <div className='profileInteraction'>
        {/* <Images src="/general/noAvatar.png" alt=""/>V */}
        <img src="/general/share.svg" alt="" />
        <div className="profileBtns">
          <button>Message</button>
          <FollowButton isFollowing={data.isFollowing} 
          username ={data.username}
          />
        </div>
        <img src="/general/more.svg" alt="" />
        {/* <Images src="/general/more.svg" alt="" /> */}
      </div>
      <div className="profileOptions">
        <span onClick={()=>setType("created")} className={type==="created" ? "active2" : ""}>Created</span>
        <span onClick={()=>setType("saved")} className={type==="saved" ? "active2" : ""}>Saved</span>
      </div>
     {type==="created" ? <Gallery userId={data._id}  /> : 
     (
      <SavedPins userId={data._id}  />
     )
    //  (
    //   <Boards userId={data._id}  />
    //  )
     }

    </div>
  )
}

export default userProfile