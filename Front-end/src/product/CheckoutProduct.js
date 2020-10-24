import React, { useState,useEffect } from "react";
import "./CheckoutProduct.css";
import { useDispatch , useSelector} from "react-redux";


function CheckoutProduct({ productSelected }) {
  var { basket } = useSelector((state) => ({ ...state.basketReducer }));
  const [quantity, setQuantity] = useState(productSelected.quantityOrdred);
  var dispatch = useDispatch();
  useEffect(() => {
    productSelected.quantityOrdred=quantity;
    window.localStorage.setItem('basketStored',JSON.stringify(basket))
    dispatch({type:"updateTotal"});
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity])
  return (
    <div className="checkoutproduct">
      <img className="chekoutproduct_img" src={productSelected.image} alt="" />
      <div className="checkoutproduct_info">
        <h3>{productSelected.title}</h3>
        <h4>{productSelected.price + "$"}</h4>
        <p>{productSelected.description}</p>
        <div className="checkoutproduct_quantity">
          <span>Quantity</span>
          <input
            type="number"
            id="Quantity"
            value={productSelected.quantityOrdred}
            min="1"
            max="20" 
            onChange={(e) => { if (((e.target.value)>=1)&&((e.target.value)<=20))
              setQuantity(e.target.value)}}
          />  

        <button
          onClick={() => {
            dispatch({
              type: "RemoveFromBasket",
              payload: productSelected.title,
            });
            dispatch({type:"updateTotal"});

          }}
        >
          Remove from basket
        </button>
        </div>

      </div>
    </div>
  );
}

export default CheckoutProduct;
