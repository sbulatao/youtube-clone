import React from 'react'
import './Home.css'
import Sidebar from '../../Components/Sidebar/Sidebar'

export default function Home({ sidebar }) {
  return (
    <>
      <Sidebar sidebar={sidebar}/>
    </>
  )
}
