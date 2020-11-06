import React, { useEffect, useState } from "react";
import '../Header.css'
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";



function HeaderAdmin() {
  var userFistName  = window.localStorage.getItem("firstName");
  const [searchInput, setsearchInput] = useState("");
  const [connect, setConnect] = useState('')
  var history = useHistory();
 
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
        </div>
            
        {/* Order */}
        <Link to="/admin/orders" className="header_link">
          <div className="header_option">
            <span className="hearder_optionLineTwo">Orders Management</span>
          </div>
        </Link>
          {/* Name of the user connected */}
          <div className="header_link" >
          {userFistName && <div className="header_option">
            <span className="hearder_optionLineTwo"> {"Welcome " + userFistName}</span>
            </div>}
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

export default HeaderAdmin;

