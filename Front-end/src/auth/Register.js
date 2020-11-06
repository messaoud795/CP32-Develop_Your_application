import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

import axios from "axios";
import "./Register.css";

function Register() {
 const [inputs , setInputs] = useState({
    firstName : "",lastName:"",address:"", email:"",password:""})
    const [errorMsg, setErrorMsg] = useState("");
  const history = useHistory();
 
  const register = (e) => {
    e.preventDefault();
    axios
      .post("/api/user/register", inputs)
      .then(function (response) {
        if (response.data.token) {
          window.localStorage.setItem('token',response.data.token);
          window.localStorage.setItem('firstName',response.data.firstName);
          history.push("/");
        }
        else {setErrorMsg(response.data.msg)}
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="register">
      <Link to="/">
        <img
          className="logo"
          src="https://www.onlinelogomaker.com/blog/wp-content/uploads/2017/06/shopping-online.jpg"
          alt=""
        />
      </Link>
      <div className="register_container">
        <h1>Register</h1>
  <h4 className='error'>{errorMsg}</h4>
        <form action="">
          <h5>First name</h5>
          <input
            type="text"
            name="firstName"
            value={inputs.firstName}
            onChange={(e) => setInputs({...inputs ,[e.target.name] : e.target.value})}
          />

          <h5>Last name</h5>
          <input
            type="text"
            name="lastName"
            value={inputs.lastName}
            onChange={(e) => setInputs({...inputs ,[e.target.name] : e.target.value})}
          />
          <h5>Address</h5>
          <input
            type="text"
            name="address"
            value={inputs.address}
            onChange={(e) => setInputs({...inputs ,[e.target.name] : e.target.value})}
          />
          <h5>E-mail</h5>
          <input
            type="text"
            name="email"
            value={inputs.email}
            onChange={(e) => setInputs({...inputs ,[e.target.name] : e.target.value})}
          />
          <h5>Password</h5>
          <input
            type="password"  
            name="password"
            value={inputs.password}
            onChange={(e) => setInputs({...inputs ,[e.target.name] : e.target.value})}
          />
          <button
            className="register_finishButton"
            onClick={register}
            type="submit"
          >
            Finish
          </button>
        </form>
      </div>
    </div>
  );
}

export default Register;
