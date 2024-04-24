import { auth } from '../firebase'
import { signOut } from 'firebase/auth'
import { AuthContext } from '../context/AuthContext'
import { useContext } from 'react'
const Navbar = () => {
  const {currentUser}=useContext(AuthContext)
  console.log("pallavi",currentUser)
    return (
      <div className='navbar'>
        <span className='logo'>TalkSquare</span>
        <div className='user'>
          <img src={currentUser.photoURL} alt=''/>
          <span>{currentUser.displayName}</span>
          <button style={{fontSize:"12px",borderRadius:"2px",backgroundColor:"cornsilk",color:"black",padding:"4px"}} className='bbb' onClick={()=>signOut(auth)}>logout</button>
        </div>
      </div>
    )
  }
  
  export default Navbar;