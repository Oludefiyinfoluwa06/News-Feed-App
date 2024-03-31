import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"

import { useAuth } from "./hooks/useAuth"

// layouts
import RootLayout from './layouts/RootLayout'

// pages
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import { AddNewsFeed } from "./pages/AddNewsFeed"
import { NewsFeeds } from "./pages/NewsFeeds"
import { ViewNewsFeed } from "./pages/ViewNewsFeed"
import { EditNewsFeed } from "./pages/EditNewsFeed"

const App = () => {
  const { currentUser } = useAuth()

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/login' element={!currentUser ? <Login /> : <Navigate to='/' />} />
        <Route path='/signup' element={!currentUser ? < Signup /> : <Navigate to='/' />} />
        <Route path='/' element={currentUser ? <RootLayout /> : <Navigate to='/login' />}>
          <Route index element={<NewsFeeds />} />
          <Route path="add-news-feed" element={<AddNewsFeed />} />
          <Route path=":id" element={<ViewNewsFeed />} />
          <Route path=":id/edit" element={<EditNewsFeed />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
