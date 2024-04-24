import React from 'react'
import Sidebar from '../Components/Sidebar'
import Chat from '../Components/Chat'
import '../style.scss'

const Home = () => {
  return (
    <div className='home'style={{backgroundPosition:"fixed",backgroundAttachment:"fixed"}}>
      <div className="container">
        <Sidebar/>
        <Chat/>
      </div>
    </div>
  )
}

export default Home;