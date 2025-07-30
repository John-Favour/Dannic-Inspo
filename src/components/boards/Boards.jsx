import { Link } from "react-router-dom"
import apiRequest from "../../utils/apiRequest"
import { useQuery } from '@tanstack/react-query'
import Images from "../Image/Image"
import "./boards.css"

// Timeago for formatting time

const Boards = ({userId}) => {

  const {isPending,error,data} = useQuery({
    queryKey:["boards",userId],
    queryFn: ()=> apiRequest.get(`/boards/${userId}`).then((res) => res.data),
  })

if(isPending) return "Loading...  ";
if(error) return "An error has occured: "+ error.message;
if(!data) return "Board not found!";

console.log(data ,"Boards");

    return (
        <div className='Collections'>
          
          {data?.map((board)=>(
             <Link to={`/search?boardId=${board._id}`} className="collection" key={board._id}>
                <Images src={board.firstPin.media} alt="" />
                <div className="collectionInfo">
                    <h1>{board.title}</h1>
                    <span>{board.pinCount} Pins {board.createdAt}</span>
                </div>
            </Link>
          ))}
        </div>
    )
}

export default Boards