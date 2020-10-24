import React, { useState, useEffect} from "react";
import {useParams}from 'react-router-dom'
import axios from "axios";
import Product from './Product'


function SearchProduct() {
    const [product, setproduct] = useState([]);
    var    searchInput=useParams().id;

//search result
  useEffect(() => {
     axios
    .post("/api/product/item/", {
      item: searchInput
    })
    .then( function  (response) {
   setproduct(response.data);})
    .catch(function (error) {
      console.log(error);
    }); 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

    return (
        <div>
{product.length===0?<h2>Product not found</h2>     :
<div><h2>Product found</h2><Product product={product}/></div>}

    
     
        </div>
    )
}

export default SearchProduct
