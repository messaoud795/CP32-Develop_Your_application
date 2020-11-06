import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "./OrderTracking.css";

function OrderTracking() {
  const [orders, setorders] = useState([]);
  let token = window.localStorage.getItem("token");
  useEffect(() => {
     axios
      .get("/api/order", { headers: { Authorization: `Bearer ${token}` } })
      .then((res) => {
        res.data.forEach(el=> el._id=el._id.substring(16, 24));
        setorders(res.data.reverse());
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  return (
    <div className="orderTracking">
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
                  <strong>{order._id}</strong>
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
          {orders.map((order, i) => {
            return (
              <tr key={i + 1}>
                <td>
                  <strong>{order._id}</strong>
                </td>
                <td>
                  <table className='productsOrdred'>
                    <tbody>
                      {order.productsOrdred.map((productOrdred, j) => {
                        console.log(productOrdred.product.title)
                        return(<tr key={j} ><td>{productOrdred.product.title}</td></tr>)})}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className='productsOrdred'>
                    <tbody>
                      {order.productsOrdred.map((productOrdred, j) => {
                        return <tr key={j}><td>{productOrdred.product.price}</td></tr>;
                      })}
                    </tbody>
                  </table>
                </td>
                <td>
                  <table className='productsOrdred'>
                    <tbody>
                      {order.productsOrdred.map((productOrdred, j) => {
                        return <tr key={j}><td>{productOrdred.quantityOrdred}</td></tr>;
                      })}
                    </tbody>
                  </table>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrderTracking;
