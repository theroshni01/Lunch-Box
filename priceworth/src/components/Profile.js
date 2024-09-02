import React,{useState} from 'react'
import './login.css'

function Profile() {

    const [name, setName] = useState("")
    const [number, setNumber] = useState("")
    const [person, setPerson] = useState("")
    const [address, setAddress] = useState("")

  return (
    <div>
      <div class="subc-form-box">
       <h1 className='Heading'>Profile</h1>
        <form id="subcribe" class="sub-form" 
			        method="post">

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
            
      <button type="submit" class="submit-btn">Save Details</button>
      </form>

      <h1 className='Heading'>Subscription Details</h1><br />
      <div class="row" >
        <div class="col-sm-4 mb-3 mb-sm-0">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Weekdays</h5>
              <p class="card-text">Person : </p>
            </div>
          </div>
        </div>
        </div>
      </div>
        
    </div>
  )
}

export default Profile