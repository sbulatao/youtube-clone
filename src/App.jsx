import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home/Home'
import Video from './Pages/Video/Video'

export default function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/video/:categoryId/:videoId' element={<Video />}/>
      </Routes>
    </div>
  )
}
