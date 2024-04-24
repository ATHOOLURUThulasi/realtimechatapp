import React from 'react'
// import Navbar from './Navbar';
import Navbar from "./Navbar"
import Search from './Search'
// import Chat from './Chat'
import Chats from './Chats'
// import Chats from "./Chats"
const Sidebar = () => {
  return (
    <div className='sidebar' style={{width:"250px"}}>
      <Navbar></Navbar>
      <Search></Search>
      <Chats></Chats>
       </div>
  )
}
export default Sidebar;