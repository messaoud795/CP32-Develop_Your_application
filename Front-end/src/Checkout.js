import React from 'react'
import './Checkout.css'
import CheckoutProduct from './product/CheckoutProduct'
import PopUp from './PopUp'
import { useSelector } from "react-redux";
import axios from "axios";
import { Link } from "react-router-dom";


function Checkout() {
    var { basket, total } = useSelector((state) => ({ ...state.basketReducer }));
    var token  = window.localStorage.getItem("token");

  //save basket to the database if user is connected
  function saveBasket() {
    if (token){ 
       axios.post("/api/basket",{
         basket:basket,
         time: new Date().toLocaleString("en-GB", {timeZone: "CET"})},
         { headers: { Authorization: `Bearer ${token}` }})
         .then(function(response){
            PopUp ("Basket Saved Successfully to the database")})
           .catch(function (error) {
            PopUp ("Error , please try again")})
      }
  }


    return (
        <div className='checkout'>
            {basket.length===0?
             (<h2> you shopping basket is empty</h2>):
             (<div className="checkout_order">
                 
             <div className="checkout_ordercart">
                <h3>Your basket: </h3> 
             <h4>{"Total Price : "+ total+"$"}</h4>
             <button className="checkout_saveBtn" onClick={saveBasket}>Save</button>
             <Link to='/order'>
             <button className="checkout_orderBtn"> Order </button></Link>
             </div>
            
            <h2> You have these items in your Basket :</h2>
              { basket.map((productSelected, i)=>
       <CheckoutProduct key={i} productSelected={productSelected.product} quantityOrdred={productSelected.quantityOrdred}/>)}
           </div>    
    )}
        </div>
    )
}

export default Checkout
