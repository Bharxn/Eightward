import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Navbar, Home, Levels, Learn, Online, Docs, Login } from './components'
import './css/bundle.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <Navbar/>
      <Routes>
        <Route path="/" element = {<Home/>}/>
        <Route path="/levels" element = {<Levels/>}/>
        <Route path="/learn" element = {<Learn/>}/>
        <Route path="/online" element = {<Online/>}/>
        <Route path="/docs" element = {<Docs/>}/>
        <Route path="/login" element = {<Login/>}/>
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
)
