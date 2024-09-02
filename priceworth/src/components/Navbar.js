import React from 'react'
import './style.css'
import axios from 'axios'
import { useNavigate } from "react-router-dom";

function Navbar({ isLoggedIn, setIsLoggedIn, cartItems }) 
{
	const navigate = useNavigate();

	const handleLogout = () => {
        axios.post(process.env.REACT_APP_URL+"/logout", {}, { withCredentials: true })
            .then(response => {
                if (response.status === 200) {
                    setIsLoggedIn(false);
					alert("Logout Successful")
                    navigate("/");
                }
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
    };

  return (
   <div className='nav'>
        <header className="header">
		<a href="/" className="logo">Price Worth</a>
		<nav className="navbar">
			<a href="/">home</a>
			<a href="#features">Menu List</a>
			<a href="#products">Our Plans</a>
			<a href="#footer">Contact Us</a>
		</nav>
	
		<div className="icons">
				<div className="profile" id="login-btn">
			 		<a href="/profile">
					 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-person-circle" viewBox="0 0 16 16">
					<path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0"/>
					<path fill-rule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8m8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1"/>
					</svg>
					</a>
				</div>
				<div className="profile" id="login-btn">
			 		<a href="/mycart">
					 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" class="bi bi-cart4" viewBox="0 0 16 16">
					<path d="M0 2.5A.5.5 0 0 1 .5 2H2a.5.5 0 0 1 .485.379L2.89 4H14.5a.5.5 0 0 1 .485.621l-1.5 6A.5.5 0 0 1 13 11H4a.5.5 0 0 1-.485-.379L1.61 3H.5a.5.5 0 0 1-.5-.5M3.14 5l.5 2H5V5zM6 5v2h2V5zm3 0v2h2V5zm3 0v2h1.36l.5-2zm1.11 3H12v2h.61zM11 8H9v2h2zM8 8H6v2h2zM5 8H3.89l.5 2H5zm0 5a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0m9-1a1 1 0 1 0 0 2 1 1 0 0 0 0-2m-2 1a2 2 0 1 1 4 0 2 2 0 0 1-4 0"/>
					</svg>
					<span class="badge translate-middle rounded-pill bg-dange"> {cartItems.length} </span>
					</a>
				</div>
			{!isLoggedIn ? (
				
				<div className="login" id="login-btn">
			 		<a href="/login">Login</a>
				</div>
			):(
				<div className="fas fa-user" id="login-btn">
            		<button className="logout" onClick={handleLogout}>Logout</button>
				</div>
				
			)
			}	

			</div>
	
	</header>
   </div>
  )
}

export default Navbar
