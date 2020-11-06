import Pop_up from "../PopUp";
import axios from "axios";


async function  UpdateRequest(formData,token,productId) {

    await axios
    .put(`/api/product/update/${productId}`, formData, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(function (response) {
      if (response.data) {Pop_up("Product updated successfully")
      return (response.data);}
    })
    .catch(function (error) {
      Pop_up("Error, please retry");
    });


    
}

export default UpdateRequest