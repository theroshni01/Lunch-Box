import React, { useState } from 'react'
import './style.css'
import {toast} from 'react-toastify'

function Plans({plan, cartItems, setCartItems}) {

  const [person, setPerson] = useState(1)

  function addToCart() {
    const itemExist = cartItems.find((item) => item.plan._id == plan._id)
    if(!itemExist)
    {
      const newItem = {plan, person}
      setCartItems((state) => [...state, newItem]);
      toast.success("Subscription added Succefully")
    }
  }

  return (
        <div class="col-sm-4 mb-3 mb-sm-0">
        <div class="card p-3 rounded">
          <div class="card-body d-flex flex-column">
            <h5 class="card-title">{plan.title}</h5>
            <h5 className='card-title'>{plan.category}</h5>
            <p class="card-text">{plan.text}</p>
            <p class="card-text">{plan.price}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
              <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
            </svg>
            </p>
            <button href={"/plans/"+plan._id} onClick={addToCart} class="btn btn-primary">Purchase</button>
          </div>
        </div>
        </div>

  )}

export default Plans