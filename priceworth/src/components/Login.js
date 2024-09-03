import './login.css'
import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Login({ setIsLoggedIn}) {

    const [action, setAction] = useState("User Login")
	const [username, setUser] = useState("")
	const [password, setPassword] = useState("")
	const navigate = useNavigate();

	const handleLogin = (e) => {
        e.preventDefault();
	let data = JSON.stringify({
  		username: username,
  		password: password
	});

const result =  axios.post(process.env.REACT_APP_URL+"/login", data, 
		{headers:{"Content-Type" : "application/json"}}, 
		{ withCredentials: true })
            .then(result => {
                if (result.status === 201 || result.data === "Success") {
                    axios.get(process.env.REACT_APP_URL+"/user", { withCredentials: true })
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
    <div class="hero">
	<div class="form-box">
		<div class="button-box">
			<button type="button" class={action === "User Login" ? "log-btn grey" : "log-btn"} onClick={()=>{setAction("User Login")}} >User</button>
			<button type="button" class={action === "Admin Login" ? "log-btn grey" : "log-btn"} onClick={()=>{setAction("Admin Login")}}>Admin</button>
		</div>
        <form id="login" class="input-group" 
			onSubmit={handleLogin} method="post">

            <input type="text" class="input-field" 
				placeholder="Enter Username or number" 
				name="username" 
				onChange={(name)=>setUser(name.target.value)}
				required/>
            <input type="password" class="input-field" 
			placeholder="Enter Password" 
			name="password" 
			onChange={(psw)=>setPassword(psw.target.value)}
			required/>
            <button type="submit" class="submit-btn">{action}</button>
        </form>
    
	</div>
    </div>
    
  )
}

export default Login
