import React from 'react'
import  { useState,useEffect } from 'react';
import './Home.css'
import Product from './product/Product'
import Category from './Category'
import axios from 'axios';



function Home() {
  const [error,setError]=useState(null);
  const[products,setProducts]=useState([]);

  useEffect(()=>{
    axios.get('/api/product/home')
     .then (res=>{setProducts (res.data)
 })
     .catch(err=>{setError(err);
      console.log(error)});
// eslint-disable-next-line react-hooks/exhaustive-deps
    },[]);
    console.log(products)
    return (
        <div className="home">
         <Category/>
          <img className="home_image"
          src="https://www.luluhypermarket.com/medias/1903-450-online.jpg?context=bWFzdGVyfGltYWdlc3wyMTkwMTd8aW1hZ2UvanBlZ3xoZmIvaDg0Lzk3NDAxMDQwNDA0NzgvMTkwM8OXNDUwLW9ubGluZS5qcGd8ZWRlOGY3OTdkNDE1Nzc1NGE4MGZhYzQ3YThhNzRkNGIwNWIxYWZlOTYwZjJhYmFlZWYzNmE1OTcxZjYyNDczYw" alt=""/>  
        <div className="home_row">
          {products.map((product, i)=><Product key={i} product={product}/> )  }     
        </div>
        </div>
    )
}

export default Home



  