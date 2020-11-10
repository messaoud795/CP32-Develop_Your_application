import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./OrderTracking.css";
import Header from './Header'

function OrderTracking() {
  const [orders, setorders] = useState([]);
  let token = window.localStorage.getItem("token");

  useEffect(() => {
     axios
      .get("/api/order", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        setorders(res.data.reverse());
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
      

  return (
    <div>
      <Header></Header>

  {    orders.length===0?
  (setTimeout(()=><h2> Create your first order</h2>,1000)):
    (<div className="orderTracking">
  <h2>Tracking :</h2>

      <table className="order_table">
        <tbody>
          <tr key={0}>
            <th>OrderId</th>
            <th>created</th>
            <th>shipped</th>
            <th>delivered</th>
            <th>closed</th>
          </tr>
          {orders.map((order, i) => {
            return (
              <tr key={i + 1}>
                <td>
                  <strong>{order.sid}</strong>
                </td>
                {order.status.map((status,i)=>{return<td key={i}>{status.time}</td>})}
               
              </tr>
            );
          })}
        </tbody>
      </table>

      <h2>Orders Content :</h2>
      <table className="order_table">
        <tbody>
          <tr key={0}>
            <th>OrderId</th>
            <th>Product</th>
            <th>Price</th>
            <th>Quantity</th>
          </tr>
          {orders.map((order,i) => {
            return (
              <tr key={i + 1}>
                <td>
                  <strong>{order.sid}</strong>
                </td>
                <td>
                  <table className='productsOrdred'>
                    <tbody>
                      {order.productsOrdred.map((productOrdred, z) => 
                     <tr key={z} ><td>{productOrdred.product?.title}</td></tr>
                        )}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className='productsOrdred'>
                    <tbody>
                      {order.productsOrdred.map((productOrdred, j) => {
                        return <tr key={j}><td>{productOrdred.product?.price}</td></tr>;
                      })}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className='productsOrdred'>
                    <tbody>
                      {order.productsOrdred.map((productOrdred, j) => {
                        return <tr key={j}><td>{productOrdred.quantityOrdred}</td></tr>
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>)}
    </div>
  );
}

export default OrderTracking;
