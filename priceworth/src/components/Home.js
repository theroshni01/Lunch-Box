import React, { useEffect, useState } from 'react'
import './style.css'
import meals from '../assets/meals.webp'
import curd from '../assets/curd.png'
import dosa from '../assets/dosa.jpg'
import idli from '../assets/idli.jpg'
import parata from '../assets/parata1.png'
import pulav1 from '../assets/pulav2.png'
import ghee from '../assets/pulav1.jpg'
import curry2 from '../assets/curry.png'
import curry1 from '../assets/curry2.jpg' 
import butter from '../assets/buttermilk.jpeg'
import poori from '../assets/poori1.png'
import lemon from '../assets/lemon.png'
import Plans from './Plans'
import axios from 'axios' 

function Home( {cartItems, setCartItems}) {

  const [plans, setPlans] = useState([]);

    useEffect(() =>{
        axios.get(process.env.REACT_APP_URL+"/plans" ,
	      {
		      mode : 'no-cors'
	      })
        // .then(res => res.json())
        .then(res => setPlans(res.plans))
    })

  return (
    <div>
        <section class="home" id="home">
            <div class="content">
                <h3>Tasy and fresh <span>Home</span> foods</h3>
                <p>In your busy working days We will provide you a healthy and tasty Home made foods.</p>
                <a href="#products" class="btn">Subscribe now &rarr;</a>
            </div>
        </section>

        <section class="features" id="features">
	
		<h1 class="heading"> Menu <span>List</span> </h1>
	
		<div class="box-container">

    <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                  <div class="card h-100">
                    <img src={meals} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Meals</h5>
                      </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={curry1} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">vegtable curry</h5>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={curry2} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Grains Curry</h5>
                      </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="carousel-item">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                  <div class="card h-100">
                    <img src={pulav1} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Pulav Rice</h5>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={parata} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Parata</h5>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={ghee} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Ghee Rice</h5>
                    </div>
                  </div>
                </div>
                
              </div>
          </div>
          <div class="carousel-item">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                  <div class="card h-100">
                    <img src={curd} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Curd Rice</h5>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={butter} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Butter Milk</h5>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={lemon} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Lemon Rice</h5>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div class="carousel-item">
            <div class="row row-cols-1 row-cols-md-3 g-4">
                <div class="col">
                  <div class="card h-100">
                    <img src={idli} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Idli Sambar</h5>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={poori} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Poori Masal</h5>
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="card h-100">
                    <img src={dosa} class="card-img-top" alt="..." />
                    <div class="card-body">
                      <h5 class="card-title">Dosa</h5>
                    </div>
                  </div>
                </div>
              </div>
          </div>
        </div>
        <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Previous</span>
        </button>
        <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleAutoplaying" data-bs-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="visually-hidden">Next</span>
        </button>
    </div>
	
		</div>
    </section>

    {/* Plans Detals */}
    <section class="features mt-5" id="products">
      <h1 className="heading"> our <span>Plans</span> </h1>
        <div className="row">
          {plans && plans.map(plan => <Plans plan={plan} cartItems={cartItems} setCartItems={setCartItems} />)}
        </div>
    </section>

    {/* Footer  */}
    <section class="footer" id='footer'>
	
        <div class="box-container">

        <div class="box">
            <h3>contact info</h3>
            <a href="#" class="links"> <i class="fas fa-phone"></i> +918884442747 </a>
            <a href="#" class="links"> <i class="fas fa-envelope"></i> developer.priceworth@gmail.com </a>
            <a href="#" class="links"> <i class="fas fa-map-marker-alt"></i> Kudlu Gate, Bangalore - 560068 </a>
        </div>

        <div class="box">
            <h3>quick links</h3>
            <a href="#home" class="links"> <i class="fas fa-arrow-right"></i> home </a>
            <a href="#features" class="links"> <i class="fas fa-arrow-right"></i> Menu List </a>
            <a href="#products" class="links"> <i class="fas fa-arrow-right"></i> Our Plans </a>
        </div>

        <div class="box">
            <h3>For any query</h3>
            <p>Write a message:</p>
            <input type="text" placeholder="your message" class="email" />
            <input type="submit" value="submit" class="btn" />
        </div>

    </div>
    </section>
    </div>
  )
}

export default Home
