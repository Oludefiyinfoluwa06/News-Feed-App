import React from 'react'
import { Outlet } from 'react-router-dom'
import NavContent from '../components/NavContent'

const RootLayout = () => {
  return (
    <div>
      <NavContent />
      <main>
        <Outlet />
      </main>
    </div>
  )
}

export default RootLayout