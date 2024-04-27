import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from "react-router-dom"
import {Box} from "@mui/material"

function App() {
  

  return (
    <BrowserRouter>
      <Box sx={{backgroundColor:"#000"}}>
        Navbar
        <Routes>
          <Route path='/' exact element={<Feed/>} />
        </Routes>

      </Box>
    </BrowserRouter>
   
  )
}

export default App
