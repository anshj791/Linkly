import React, { useEffect } from 'react'
import UrlShortnerHeropage from '../src/pages/UrlShortnerHeropage';
import { Route, Routes } from 'react-router-dom';
import SigninPage from './pages/SigninPage';
import LoginPage from './pages/LoginPage';
import {Toaster} from 'sonner';
import { useDispatch } from "react-redux";
import { fetchCurrentUser } from "./store/slice/authSlice.js";



const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <div className='h-screen w-full'>
          <Routes>
            <Route path='/' element={<UrlShortnerHeropage />} />
            <Route path= '/signin' element={<SigninPage/>} />
            <Route path='/login' element={<LoginPage />} />
          </Routes>

          <Toaster
          richColors
          position="top-center"         
        />
    </div>
  )
}

export default App
