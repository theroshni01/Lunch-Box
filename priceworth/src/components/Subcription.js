import React, { useState } from 'react'
import './login.css'
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Subcription() {

        const [name, setName] = useState("")
        const [number, setNumber] = useState("")
        const [person, setPerson] = useState("")
        const [address, setAddress] = useState("")
        const [subcription, setSubscribe] = useState("")
        const [food, setFood] = useState("")
        const navigate = useNavigate();

	const handleSubc = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3001/subscription", 
		{ 
			name, 
			number, 
            person,
            address,
            subcription,
            food
		})
         .then(result => {
				if (result.status === 201) {
                    
					navigate("/mycart");
				}
                 else {
                    alert("Subcription failed");
                }
            })
            .catch(err => console.log(err));
    };

  return (
    <div>
        <div class="subc-form-box">
        <h1 className='Heading'>Subscription Form</h1>
          <form id="subcribe" class="sub-form" 
			onSubmit={handleSubc} method="post">

            <input type="text" class="input-field" 
				placeholder="Enter your Name" 
				name="Name" 
				onChange={(name)=>setName(name.target.value)}
				required/>

            <input type="number" class="input-field" 
			placeholder="Enter phone Number" 
			name="phoneNumber" 
			onChange={(phone)=>setNumber(phone.target.value)}
			required/>

            <input type="number" class="input-field" 
			placeholder="How many person" 
			name="person" 
			onChange={(person)=>setPerson(person.target.value)}
			required/>

            <input type="address" class="input-field" 
			placeholder="Enter your full Address" 
			name="address" 
			onChange={(address)=>setAddress(address.target.value)}
			required/><br /><br />
            
            <div className='radio-btn'>
            <label><h3>Subscription :</h3></label>
            <div className='rd-btn'>
            <input type="radio" class="r-btn"  
			name="subcription"
            value="weekdays" 
			onChange={(sub)=>setSubscribe(sub.target.value)}
			required/>  Weekdays <br />

            <input type="radio" class="r-btn"  
			name="subcription"
            value="weekend" 
			onChange={(sub)=>setSubscribe(sub.target.value)}
			required/>  Weekend <br />

            <input type="radio" class="r-btn"  
			name="subcription" 
            value="alldays"
			onChange={(sub)=>setSubscribe(sub.target.value)}
			required/>  All Days

            </div>
            </div>

            <div className='radio-btn'>
            <label class="head-r"><h3>Food :</h3></label>
            <div className='rd-btn'>
            <input type="checkbox" class="c-btn"  
			name="food"
            value="breakfast" 
			onChange={(food)=>setFood(food.target.value)}
			/>  Breakfast <br />

            <input type="checkbox" class="c-btn"  
			name="food"
            value="lunch" 
			onChange={(food)=>setFood(food.target.value)}
			/> Lunch <br />

            <input type="checkbox" class="c-btn"  
			name="food"
            value="dinner" 
			onChange={(food)=>setFood(food.target.value)}
			/>  Dinner <br />

            <input type="checkbox" class="c-btn"  
			name="food"
            value="all Meals" 
			onChange={(food)=>setFood(food.target.value)}
			/> All Meals 

            </div>
            </div>
            <button type="submit" class="submit-btn">Subscribe</button>
        </form>
        </div>
    </div>
  )
}

export default Subcription