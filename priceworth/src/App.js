import './App.css';
import Home from './components/Home';
import Navbar from './components/Navbar';
import {React, useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import axios from 'axios'
import Subcription from './components/Subcription';
import Profile from './components/Profile';
import Cart from './components/Cart';
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
// import { CartProvider } from './components/ContextReducer';

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
      axios.get('https://lunch-box-backend.onrender.com/user', { withCredentials: true })
          .then(response => {
              if (response.data.user) {
                  setIsLoggedIn(true);
              } else {
                  setIsLoggedIn(false);
              }
          })
          .catch(() => setIsLoggedIn(false));
  }, []);

  return (

    <div className="App">

    {/* <CartProvider> */}
      <BrowserRouter>
      <ToastContainer theme='dark' position='top-center'/>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} cartItems={cartItems} />
            <Routes>
                <Route path="/" element={<Home cartItems={cartItems} setCartItems={setCartItems} />} />
                <Route path='/login' element={isLoggedIn ? (<Navigate to="/" /> ): (<Login setIsLoggedIn={setIsLoggedIn} /> )} />
                {/* <Route path='/subscription' element={isLoggedIn ? (<Subcription /> ): (<Login setIsLoggedIn={setIsLoggedIn} /> )} /> */}
                <Route path='/profile' element={isLoggedIn ? ( <Profile /> ): (<Login setIsLoggedIn={setIsLoggedIn} /> )} />
                <Route path='/mycart' element={<Cart cartItems={cartItems} setCartItems={setCartItems} />} />
            </Routes>
        </BrowserRouter>
    {/* </CartProvider>ss */}

    </div>
  );
}

export default App;
