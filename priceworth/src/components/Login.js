import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
    const [action, setAction] = useState('User Login');
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

   
	const handleLogin = (e) => {
        e.preventDefault();
        axios.post(process.env.REACT_APP_URL+"/login", 
		{ 
			username, 
			password 
		}, { withCredentials: true })
            .then(result => {
                if (result.status === 201) {
                    axios.get(process.env.REACT_APP_URL+'/user', { withCredentials: true })
                        .then(response => {
                            if (response.data.user) {
                              setIsLoggedIn(true);
                              alert("Login Successfull")
                              navigate("/", { state: { user: response.data.user } });
                            }
                        });
				}
                 else {
                    alert("Login failed");
                }
            })
            .catch(err => console.log(err));
    };

    return (
        <div className="hero">
            <div className="form-box">
                <div className="button-box">
                    <button
                        type="button"
                        className={action === 'User Login' ? 'log-btn grey' : 'log-btn'}
                        onClick={() => setAction('User Login')}
                    >
                        User
                    </button>
                    <button
                        type="button"
                        className={action === 'Admin Login' ? 'log-btn grey' : 'log-btn'}
                        onClick={() => setAction('Admin Login')}
                    >
                        Admin
                    </button>
                </div>
                <form id="login" className="input-group" onSubmit={handleLogin} method="post">
                    <input
                        type="text"
                        className="input-field"
                        placeholder="Enter Username or number"
                        name="username"
                        onChange={(e) => setUser(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        className="input-field"
                        placeholder="Enter Password"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="submit-btn">{action}</button>
                </form>
            </div>
        </div>
    );
}

export default Login;
