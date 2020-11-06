import React, { useEffect, useState } from "react";
import HeaderAdmin from "./HeaderAdmin";
import axios from "axios";
import "../Order.css";

function OrdersManagement() {
  const [orderList, setorderList] = useState([]);
  let token = window.localStorage.getItem("token");
  useEffect(() => {
    axios
      .get("/api/order/management", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        res.data.forEach((el) =>
          el.orderId.forEach(
            (order) => (order._id = order._id.substring(16, 24))
          )
        );
        setorderList(res.data.reverse());
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  console.log(orderList);

  // function getStatus(orderList) {
  // let status=orderList.map((user)=>user.orderId.map( (order)=>order.status.filter(stat=>stat.time.length>4)));

  //    return

  // }
  console.log(
    orderList.map((user) =>
      user.orderId.map((order) => order.status.map((stat) => stat.time))
    )
  );
  // .map((stat)=>stat.time ))

  return (
    <div>
      <HeaderAdmin />
      <table className="order_table">
        <tbody>
          <tr key={0}>
            <th>Customer Name</th>
            <th>OrderId</th>
            <th>created</th>
            <th>Shipped</th>
            <th>Delivered</th>
            <th>Closed</th>
          </tr>
          {orderList.map((user, j) => {
            return (
              <table>
                <tbody>
                  <tr key={j}>
                    <td>{user.firstName + " " + user.lastName}</td>
                   
                      {user.orderId.map((order, i) => (
                            <tr key={i}>
                              <td>{order._id}</td></tr>
                         
                      ))}
                    {user.orderId.map((order, j) => (
                      <tr key={j}>
                        {order.status.map((stat, i) => (
                          <td key={i}>{stat.time}</td>
                        ))}
                      </tr>
                    ))}
                  </tr>
                </tbody>
              </table>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default OrdersManagement;
