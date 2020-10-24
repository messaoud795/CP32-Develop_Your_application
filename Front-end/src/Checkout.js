import React from 'react'
import './Checkout.css'
import CheckoutProduct from './product/CheckoutProduct'
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";


function Checkout() {
    var { basket, total } = useSelector((state) => ({ ...state.basketReducer }));

    return (
        <div className='checkout'>
            {basket.length===0?
             (<h2> you shopping basket is empty</h2>):
             (<div className="checkout_order">
             <div className="checkout_ordercart"><h3>Total Price</h3>
             <h4>{total+"$"}</h4>
             <Link to='/order'>
             <button className="checkout_orderBtn"> Order your basket </button></Link>
             </div>
            
            <h2> You have these items in your Basket :</h2>
              { basket.map((productSelected, i)=>
                    <CheckoutProduct key={i} productSelected={productSelected}/>)}
           </div>    
    )}
        </div>
    )
}

export default Checkout
