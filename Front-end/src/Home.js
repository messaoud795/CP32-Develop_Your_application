import React from 'react'
import  { useState,useEffect } from 'react';
import './Home.css'
import Product from './product/Product'
import Category from './Category'
import axios from 'axios';
import flyer from './res/pictures/flyer.jpg'



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
    return (
        <div className="home">
         <Category />
          <img className="home_image"
          src={flyer} alt=""/>  
        <div className="home_row">
          {products.map((product, i)=><Product key={i} product={product}/> )  }     
        </div>
        </div>
    )
}

export default Home



  