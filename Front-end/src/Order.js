import React from "react";
import { useSelector } from "react-redux";
import './Order.css'
import Header from "./Header";
import PopUp from './PopUp'
import axios from "axios";
import { useHistory } from "react-router-dom";

function Order() {
var { basket, total } = useSelector((state) => ({ ...state.basketReducer }));
  let token=  window.localStorage.getItem('token');
const history=useHistory();
  //save order to the database 
  function saveOrder() {
       axios.post("/api/order/create",{
         basket:basket,
         time: new Date().toLocaleString("en-GB", {timeZone: "CET"}),
         price:total},
         { headers: { Authorization: `Bearer ${token}` }})
         .then(function(response){      
           PopUp ("Order launched")
          history.push('/order/tracking')})
           .catch(function (error) {
            PopUp ("Error , please try again")})
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
          <tr key={0} className="table row">
          <th>Product</th>
          <th>Price</th>
          <th>Quantity</th>
        </tr>
        
        {basket.map((productSelected, i) => { return(
            <tr key={i+1}>
              <td> <strong>{productSelected.product.title}</strong></td>
              <td>{productSelected.product.price}</td>
              <td>{productSelected.quantityOrdred}</td>
            </tr>
            )
        })}</tbody>
    
      </table>
      <div className="order_total">
    <span>{ "Total price  " + total+ "$"} </span> 
    <button onClick={saveOrder}> Confirm your order </button></div>
    </div>
    </div>)}
    </div>
  );
}

export default Order;
