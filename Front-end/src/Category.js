import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";


function Category() {
  const categoryList = [
    "Laptop",
    "Smart phone",
    "Tablet",
    "Smart watch",
    "E book",
    "Accessories",
  ];



  return (
    <>
      <ul className="category">
        {categoryList.map((el, i) => (  
            <Link to={`/${el}`}key={i} className='catLink' >
               <li > {el}</li>
             </Link>
        
        ))}
      </ul>
    </>
  );
}

export default Category;
