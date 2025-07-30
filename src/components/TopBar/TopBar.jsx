import './TopBar.css'
import UserButton from '../UserButton/UserButton'
import Images from '../Image/Image'
import { useNavigate } from 'react-router-dom'

const TopBar = ({item}) => {

  const navigate = useNavigate()
  const handleSubmit = (e) =>{
    e.preventDefault();

    navigate(`/search?search=${e.target[0].value}`)
  }
  return (
    <div className='topBar'>
      

        <form onSubmit={handleSubmit} className="searchDiv">
        <Images src="/general/search.svg" alt="" />
        <input type="search" placeholder='Search' />
      </form>

        <UserButton />
    </div>
  )    
}

export default TopBar