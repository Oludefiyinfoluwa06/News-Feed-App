import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { FaBars } from 'react-icons/fa'
import { Button, Nav } from 'react-bootstrap'
import { useAuth } from '../hooks/useAuth'

const NavContent = () => {
  const [showSidebar, setShowSidebar] = useState(false)
  const { currentUser, logout } = useAuth()

  const navigate = useNavigate()

  const handleLogout = async () => {
    await logout()
    navigate('/login')
  }

  const handleShowSidebar = () => {
    setShowSidebar(prev => !prev)
  }

  return (
    <>
      <Nav className='d-flex align-items-center justify-content-between p-4 shadow'>
        <label>Welcome, {currentUser.email}</label>
        <div className='d-flex align-items-center justify-content-end gap-3'>
          <Button className='px-3 py-1' onClick={handleLogout}>Logout</Button>
          <div className="d-flex align-items-center justify-content-center" style={{ cursor: 'pointer' }} onClick={handleShowSidebar}>
            <FaBars />
          </div>
        </div>
      </Nav>

      <aside className='position-absolute top-0 bg-white shadow h-100 d-flex align-items-start justify-content-start gap-lg-5 flex-column' style={showSidebar ? { left: '0', transition: '.3s' } : { left: '-100%', transition: '.3s' }}>
        <h2 className='p-5'>News Feed</h2>
        <ul className='d-flex align-items-start justify-content-start gap-3 flex-column'>
          <li className='w-100 p-lg-3 mb-3'><Link onClick={() => setShowSidebar(false)} className='text-black text-decoration-none' to="/">Dashboard</Link></li>
          <li className='w-100 p-lg-3 mb-3'><Link onClick={() => setShowSidebar(false)} className='text-black text-decoration-none' to="/add-news-feed">Add News Feed</Link></li>
          <li className='w-100 p-lg-3 mb-3'><Link onClick={() => setShowSidebar(false)} className='text-black text-decoration-none' to="/news-feeds">Manage News Feed</Link></li>
          <li className='w-100 p-lg-3'><Link onClick={() => setShowSidebar(false)} className='text-black text-decoration-none' to="/performance-reports">Performance Reports</Link></li>
        </ul>
      </aside>
    </>
  )
}

export default NavContent
