import { BrowserRouter, Route, Routes } from 'react-router-dom'
import React, { useState } from "react";
import Login from './components/Login';
import Home from './components/home';
import Register from './components/register';

function App() {
  return (
    <div className='w-[100vw] h-[100vh] overflow-hidden'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login/>}></Route>
          <Route path='/register' element={<Register/>}></Route>
          <Route path='/home' element={<Home/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
