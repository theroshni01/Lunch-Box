import './login.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login({ setIsLoggedIn }) {
    const [action, setAction] = useState('User Login');
    const [username, setUser] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        
        try {
            const response = await axios.post(
                `${process.env.REACT_APP_URL}/login`,
                JSON.stringify({ username, password }),
                {
                    headers: { "Content-Type": "application/json" },
                    withCredentials: true
                }
            );

            if (response.status === 201) {
                const userResponse = await axios.get(
                    `${process.env.REACT_APP_URL}/user`,
                    { withCredentials: true }
                );

                if (userResponse.data.user) {
                    setIsLoggedIn(true);
                    alert('Login Successful');
                    navigate('/', { state: { user: userResponse.data.user } });
                }
            } else {
                alert('Login failed');
            }
        } catch (err) {
            console.log(err);
            alert('An error occurred');
        }
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
