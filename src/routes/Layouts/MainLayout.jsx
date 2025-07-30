import './MainLayout.css'
import { Outlet } from "react-router";
import LeftBar from '../../components/LeftBar/LeftBar'
import TopBar from '../../components/TopBar/TopBar'
// import Gallery from '../../components/gallery/gallery'


const MainLayout = () => {
   return (
<div className="app">
      <LeftBar />
      <div className="content">
        < TopBar />
        {/* < Gallery /> */}
        <Outlet />
      </div>
    </div>  )
}

export default MainLayout

