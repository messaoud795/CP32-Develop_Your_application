import React, { useEffect, useState } from "react";
import "./Header.css";
import { Link, useHistory } from "react-router-dom";
import SearchIcon from "@material-ui/icons/Search";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import logo from "./res/pictures/logo.jpg";
import { Row, Col } from "react-bootstrap";

function Header() {
  var { basket } = useSelector((state) => ({ ...state.basketReducer }));
  var userFistName = window.localStorage.getItem("firstName");
  const [searchInput, setsearchInput] = useState("");
  const [connect, setConnect] = useState("");
  var history = useHistory();

  //save basket to local storage
  useEffect(() => {
    window.localStorage.setItem("basketStored", JSON.stringify(basket));
  }, [basket]);
  //switch to sign in and out
  useEffect(() => {
    userFistName ? setConnect("Sign out") : setConnect("Sign in");
  }, [userFistName]);
  //search product
  const findProduct = (e) => {
    e.preventDefault();
    history.push(`/search/${searchInput}`);
    setsearchInput("");
  };
  return (
      <Row className="header">
        {/* logo on the left   */}
        <Col xs={{span:2 , order : 1}} md={{span:2 , order : 1}} > 
          <Link to="/">
            <img className="header-logo" src={logo} alt="" />
          </Link>
        </Col>
        {/* search box */}
        <Col xs={{span:12 , order : 3}} md={{span:4 , order : 1}}  className="header_search">
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
        </Col>
        <Col xs={{span:8, order : 2}} md={{span:6 , order : 1}} className="header_nav">
          <Row >
            {/*Basket*/}
            <Col xs={3}>
              <Link to="/checkout" className="header_Basket">
                {/* basket icon with a number */}
                <span>{basket.length}</span>
                <FontAwesomeIcon
                  icon={faShoppingCart}
                  className="shopping_basket_logo"
                />
              </Link>
            </Col>
            {/* Order */}
            <Col xs={3} className="header_option">
              <Link to="/order/tracking" className="header_link">
                <span className="hearder_optionLineTwo">Orders Tracking</span>
              </Link>
            </Col>
            {/* Sign In and out */}
            <Col xs={3} className="header_userAuth">
              {/* Name of the user connected */}
              <div className="header_link">
                {userFistName && (
                  <div className="header_option">
                    <span className="hearder_optionLineTwo">
                      {"Welcome  " + userFistName}
                    </span>
                  </div>
                )}
              </div>
              <div className="header_option">
                <Link to="/login" className="header_link">
                  <span className="hearder_optionLineTwo">{connect}</span>
                </Link>
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
  );
}

export default Header;
