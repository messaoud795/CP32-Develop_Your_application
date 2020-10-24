import React from "react";
import "./Product.css";
import { useDispatch } from "react-redux";


function Product({ product }) {
  var dispatch = useDispatch();
  const addProduct = () => {
        dispatch({
          type: "addToBasket",
          payload: product,
        });
        dispatch({type:"updateTotal"});

  };
  return (
    <div className="product">
      <div className="product_info">
        <p>{product.title}</p>
        <p>{product.price + "$"}</p>
      </div>
      <img src={product.image} alt="" />
      <div className="product_description">
        <p>{product.description}</p>
      </div>
      <button onClick={addProduct}>Add to basket </button>
    </div>
  );
}

export default Product;
