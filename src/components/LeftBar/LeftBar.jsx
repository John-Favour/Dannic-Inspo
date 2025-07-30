import './LeftBar.css'
import Images from '../Image/Image'
import BackButton from '../backButton/backButton';
import { Image, ImageKitProvider } from '@imagekit/react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const LeftBar = () => {

  const [type, setType] = useState("");



  return (
    // <div className='leftBar'>
    <div className="d-flex flex-column leftBar shadow-sm p-3" style={{ width: '80px', height: '100vh', }}>
<BackButton/>
      <Link to="/" className="mb-4 text-center text-decoration-none gen-logo">
        <Images src="/general/logo.png" alt="" />
      </Link>

      <Link to="/" className="mb-4 text-center text-decoration-none text-dark" >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" 
          onClick={() => setType("home")} className={type === "home" ? " active svg" : " svg inactive"} >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9l9-6 9 6v10a2 2 0 01-2 2h-4a2 2 0 01-2-2v-4H9v4a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
        </svg>
      </Link>

      <Link to="/create" className="mb-4 text-center text-decoration-none text-dark">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" 
          onClick={() => setType("create")} className={type === "create" ? " active svg" : " svg inactive"}>
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
        </svg>
      </Link>

      <Link to="#" className="mb-4 text-center text-decoration-none text-dark">
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke="currentColor" 
      onClick={() => setType("profile")} className={type === "profile" ? " active svg" : " svg inactive"}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14V11c0-2.485-1.514-4.5-3.5-4.5S11 8.515 11 11v3a2.032 2.032 0 01-.595 1.595L9 17h6zm-3 5a2 2 0 002-2H10a2 2 0 002 2z"/>
</svg>
      </Link>

      <Link to="#" className="mb-4 text-center text-decoration-none text-dark">
<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" 
      onClick={() => setType("notifications")} className={type === "notifications" ? " active svg" : " svg inactive"}>
  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 9a9 9 0 100-18 9 9 0 000 18z"/>
</svg>
      </Link>
      <Link to="#" className="mt-auto text-center text-decoration-none text-dark">
        <Images src="/general/settings.svg" alt="" />
      </Link>
      {/* </div> */}

    </div>
  )
}

export default LeftBar