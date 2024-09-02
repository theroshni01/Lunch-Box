import React, {Fragment, useState} from 'react'

function Cart({cartItems, setCartItems}) {

  const [person, setPerson] = useState(1)

  function increasePerson() 
  {
    setPerson((state) => state+1);
  }

  function decreasePerson() 
  {
    if(person>1)
      setPerson((state) => state-1);
  }

  return (
    <div className='mycart'>
    <div class="container container-fluid">
        <h5 class="heading mt-5">Your Cart: <span>{cartItems.length} Subscription</span></h5>
        
        <div class="row d-flex justify-content-between">
            <div class="col-12 col-lg-8">
              {cartItems.map((item) =>
              <Fragment>
                <hr />
                <div class="cart-item">
                  <div class="row">
                    <div class="col-5 col-lg-3">
                      <h5 className='heading'>{item.title}</h5>
                      <p>{item.category}</p>
                    </div>

                    <div class="col-4 col-lg-2 mt-4 mt-lg-0">
                        <p id="card_item_price">{item.price}
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-rupee" viewBox="0 0 16 16">
                          <path d="M4 3.06h2.726c1.22 0 2.12.575 2.325 1.724H4v1.051h5.051C8.855 7.001 8 7.558 6.788 7.558H4v1.317L8.437 14h2.11L6.095 8.884h.855c2.316-.018 3.465-1.476 3.688-3.049H12V4.784h-1.345c-.08-.778-.357-1.335-.793-1.732H12V2H4z"/>
                        </svg>
                        </p>
                    </div>

                    <div class="col-4 col-lg-3 mt-4 mt-lg-0">
                        <div class="stockCounter d-inline">
                            <span class="btn btn-danger minus" onClick={decreasePerson} >-</span>
                            <input type="number" class="form-control count d-inline" value="1" readOnly />

                            <span class="btn btn-primary plus" onClick={increasePerson}>+</span>
                        </div>
                    </div>

                    <div class="col-4 col-lg-1 mt-4 mt-lg-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="red" class="bi bi-trash-fill" viewBox="0 0 16 16">
                    <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
                    </svg>
                    </div>

                  </div>
                </div>
              </Fragment>
            )}  
            <hr />
          </div>

          <div class="col-12 col-lg-3 my-4">
              <div id="order_summary">
                  <h4>Order Summary</h4>
                  <hr />
                  <p>Subtotal:  <span class="order-summary-values">1 (Units)</span></p>
                  <p>Est. total: <span class="order-summary-values">$245.67</span></p>
  
                  <hr />
                  <button id="checkout_btn" class="btn btn-primary btn-block">Place Order</button>
              </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Cart
