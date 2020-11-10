import React,{useEffect, useState} from 'react'
import HeaderAdmin from './HeaderAdmin'
import { useParams } from "react-router-dom";
import axios from 'axios'
import './OrderUpdate.css'
import ConfirmModal from "./ConfirmModal";
import Pop_up from '../PopUp'



function OrderUpdate() {

  const [order, setorder] = useState();
  const [customer, setCustomer]=useState()
  let token = window.localStorage.getItem("token");
  const orderSId = useParams().orderId;
  const [openUpdate, setOpenUpdateStatus] = useState(false);
  let i=0;
  //open and close the confirm form
  const handleOpenUpdate = () => {
    setOpenUpdateStatus(!openUpdate);
  };
//get request for order and client data
  useEffect(() => {
    axios
      .get(`/api/order/update/${orderSId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
     
        setorder(res.data.order);
        setCustomer(res.data.client)
      })
      .catch((err) => console.log(err));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
//display status 
function statusDisplay(j,order){
  j=j+1;
  if(i===1) { 
return order.status.map((stat,i)=><td key={i} rowSpan={order.productsOrdred.length}>{stat.time}</td>)}
}
//update status after modal confirmation
const updateConfirm=(valid)=>{
if(valid){
//update the status
    for (let i in order.status ){
    if(order.status[i].time.length<2)
    {order.status[i].time=new Date().toLocaleString("en-GB", {timeZone: "CET"});break;}}
//update request
axios
    .put("/api/order/status/", order, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      if (response.data) {Pop_up("Status updated successfully")
     }
    })
    .catch(function (error) {
      Pop_up("Error, please retry");
    });
}
}
//open the confirm modal after btn click
function updateStatus() {
  handleOpenUpdate()
}

    return (
        <div className='orderUpdate'> 
         < HeaderAdmin  />
         <div className="orderUpdate_content">
    <h2>{"OrderId tracking "+orderSId}</h2>
    <div className="orderUpdate_details">
    <table className="order_table">
        <tbody>
          <tr key={0}>
            <th>Product</th>
            <th>Quantity</th>
            <th>Created</th><th>Shipped</th><th>Delivred</th><th>Closed</th>
          </tr>
          {order?.productsOrdred.map((product,i) => 
              <tr key={i + 1}>
                <td>
                  {product.product.title}
                </td>
                <td>{product.quantityOrdred}</td>
                {statusDisplay(i,order)}

              </tr>
          )}
        </tbody>
      </table>
<button onClick={updateStatus}>Next step</button>
<ConfirmModal
          open={openUpdate}
          handleOpen={handleOpenUpdate}
          Confirm={updateConfirm}
          text={"please confirm to update this order to next step"}
        /></div>
  <h2>Client info :</h2>
<div className="orderUpdate_client">
        <span>{"Name : "+customer?.firstName+" "+customer?.lastName}</span>
        <span>{"Adress : "+customer?.address}</span>
</div>
</div></div>
    )
}

export default OrderUpdate
