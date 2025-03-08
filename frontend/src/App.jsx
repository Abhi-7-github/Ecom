import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {BrowserRouter,Routes,Route} from "react-router-dom"
import './App.css'
import Login from './pages/login'
import Home from './pages/Home'
import Navbar from './pages/Navbar'
import Createproudct from './components/Createproudct'
import SellerProcutPage from './pages/SellerProductPage'

function App() {
  

  return (
    <>
      <BrowserRouter>
        <Navbar/>
       <Routes>
            <Route  path="/"  element={<Home/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/create" element={<Createproudct/>}></Route>
            <Route path="/" element={<Createproudct/>}></Route>
            <Route path="/modify" element={<SellerProcutPage/>}></Route>
       </Routes>
     </BrowserRouter>


    </>
  )
}

export default App
