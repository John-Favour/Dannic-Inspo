import { useState } from 'react'
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom'
import './UserButton.css'
import Images from '../Image/Image'
import apiRequest from '../../utils/apiRequest'
import useAuthStore from '../../utils/authStore'
import Avatar from '../avatar/avatar';

const UserButton = () => {
const {currentUser, removeCurrentUser} = useAuthStore()
// console.log(currentUser);


    const navigate =useNavigate()
    const [open, setOpen] = useState(false)
    const [dropArrow, setDropArrow] = useState(false)

const handleLogout = async()=>{
try {
        await apiRequest.post("/users/auth/logout",{})
        removeCurrentUser()
              toast.success("Logged out successfully!");
        navigate("/auth")
} catch (err) {
    console.log(err);
    toast.error(`There was an error ${err}`)
    return ;
}
}

const handleSetOpen = ()=>{
    setOpen((prev)=> !prev)
    setTimeout(()=>
        setOpen(false),10000 )
}

    return currentUser ? (
        <div className="userBtn">
            <Avatar name={currentUser.displayName} size="40px" />
            <Images src="/general/arrow.svg" alt="" onClick={handleSetOpen} className='arrow' />

            {open && (
                <div className="userOptions">
                    <div className="parent">
                        <span>Currently in</span>
                        <Link to={`/profile/${currentUser.username}`} className="name_parent">
                            <div className="img_container">
                      {/* <Images src={currentUser.img || "/general/noAvatar.png"} alt="" /> */}
                                <Avatar name={currentUser.displayName} size="40px" />   
                            </div>
                            <div className="details_container">
                                <h2>{currentUser.displayName}</h2>
                                <h3>{currentUser.username}</h3>
                                <h3>{currentUser.email}</h3>
                            </div>
                        </Link>
                        <div className="other_options">
                            <span>What to do ?</span>
                            <Link className="userOption" to={`/profile/${currentUser.username}`}>Profile</Link>
                            <Link className="userOption" to="/settings">Settings</Link>
                            <div className="userOption" onClick={handleLogout}>Logout</div>
                        </div>
                    </div>
                </div>
            )}
        </div>

    ) : (
        <>
            <Link to="/auth" className='btn btn-danger me-1 userBtnLogin'>Login | Sign Up</Link>

            <div className="dropArrow">
                <img src="/general/arrow.svg" alt="" w={36} h={36} 
                onClick={()=>{setDropArrow((prev)=> !prev)
}}
                />
                {dropArrow && (
                <div className="dropArrowContainer">
                    <Link to="/auth" className='dropArrowOptions '>SignIn | SignUp </Link>
                </div>
                )}
            </div>
        </>
    )

}

export default UserButton