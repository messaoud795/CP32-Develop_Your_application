import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import './Order.css'
import Header from "./Header";
import axios from "axios";


function Order() {
    var { basket, total } = useSelector((state) => ({ ...state.basketReducer }));
  let token=  window.localStorage.getItem('token');


function saveOrder() {
  axios
      .post("/api/order", {
        basket: basket,}, { headers: { Authorization: `Bearer ${token}` }} )
      .then(function (response) {
        if (response.data) {
        
          
        }
      })
      .catch(function (error) {
        console.log(error);
      });  
}



  return (
    <div > 
    <Header/>
           {  (basket.length===0)?
            (<div> <h2>  Make your first order </h2> </div>):
    (<div className="order">
      <h2>Your order : </h2>
      <div className="order_content">
      <table className="order_table">
        <tbody>
          <tr key={0}>
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        
        {basket.map((product, i) => { return(
            <tr key={i+1}>
              <td> <strong>{product.title}</strong></td>
              <td>{product.price}</td>
              <td>{product.quantityOrdred}</td>
            </tr>
            )
        })}</tbody>
    
      </table>
      <div className="order_total">
    <span>{ "Total price  " + total+ "$"} </span> 
    <Link to='/order/tracking'>
    <button onClick={saveOrder}> Confirm your order </button></Link></div>
    </div>
    </div>)}
    </div>
  );
}

export default Order;
