import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import axios from "axios";

function Header() {
  var { basket } = useSelector((state) => ({ ...state.basketReducer }));
  const [searchInput, setsearchInput] = useState("");
  const [connect, setConnect] = useState('')
  var history = useHistory();
  var userFistName  = window.localStorage.getItem("firstName");
  var token  = window.localStorage.getItem("token");


//save basket to local storage
  useEffect(() => {
    window.localStorage.setItem("basketStored", JSON.stringify(basket));
  }, [basket]);
//switch to sign in and out 
  useEffect(() => {
    userFistName ? setConnect("Sign out"):setConnect("Sign in")
 }, [userFistName]);
 //search product 
  const findProduct = (e) => {
    e.preventDefault();
    history.push(`/search/${searchInput}`);
    setsearchInput("");
  };
  //save basket to the database if user is connected
function saveBasket() {
  if (token){ 
    console.log("axios launched")
     axios.post("/api/basket",{
       basket:basket,time: new Date().toLocaleString("en-GB", {timeZone: "CET"})})
       .then(function(response){
         console.log(response.data)
       })
}
  
}

  return (
    <nav className="header">
      {/* logo on the left   */}
      <Link to="/">
        <img
          className="header-logo"
          src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
          alt=""
        />
      </Link>
      {/* search box */}
      <div className="header_search">
        <form className="header_search_form" onSubmit={findProduct}>
          <input
            type="text"
            className="header_searchInput"
            placeholder="Search for a product"
            value={searchInput}
            onChange={(e) => setsearchInput(e.target.value)}
          />

          <button type="submit">
            <SearchIcon className="header_searchIcon" />
          </button>
        </form>
      </div>

      <div className="header_nav">
        {/* Name of the user connected */}
        <div className="header_link" >
          {userFistName && <div className="header_option">
            <span className="hearder_optionLineTwo">Welcome </span>
            <span className="hearder_optionLineTwo"> { userFistName}</span>
            </div>}
        </div>

        {/*Basket*/}
        <Link to="/checkout" className="header_link" onClick={saveBasket}>
          <div className="header_optionBasket">
            {/* basket icon with a number */}
            <span>{basket.length}</span>
            <FontAwesomeIcon
              icon={faShoppingCart}
              className="shopping_basket_logo"
            />
          </div>
        </Link>

        {/* Order */}
        <Link to="/order" className="header_link">
          <div className="header_option">
            <span className="hearder_optionLineTwo">Orders</span>
          </div>
        </Link>
        {/* Sign In and out */}
        <Link to="/login" className="header_link">
          <div className="header_option">
            <span className="hearder_optionLineTwo" >{connect}</span>
          </div>
        </Link>
      </div>
    </nav>
  );
}

export default Header;
