import { useMutation, useQueryClient } from "@tanstack/react-query";
import apiRequest from "../../utils/apiRequest";


const followUser = async (username)=>{
    const res = await apiRequest.post(`/users/follow/${username}`)
    return res.data;
}
const FollowButton = ({ isFollowing, username }) => {


    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: followUser,
        onSuccess: () => {
            queryClient.invalidateQueries({queryKey: ["profile", username]}); // Invalidate the comments query to refresh data
            // Optionally, you can show a success message or perform other actions
        },
    })

    return (
        <button 
        onClick={()=>mutation.mutate(username)}
         disabled={mutation.isPending} >
            {isFollowing ? "Unfollow" :
             ("Follow")
            } 
             </button>
    )
}

export default FollowButton