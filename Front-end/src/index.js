import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {  Provider } from "react-redux";
import { createStore , combineReducers} from "redux";

//create the basket state
//initialize the basket state with the local storage
const initialValue=()=>JSON.parse(window.localStorage.getItem('basketStored'))||[]
let i=initialValue();
let s=i.reduce((sum,item)=>sum+(item.price*item.quantityOrdred),0)

function basketReducer(state={basket:i, total:s}, action) {
switch (action.type) {
  case "addToBasket":         
  if ((state.basket.filter(el=>el.title===action.payload.title)).length===0)
  {return {basket:[...state.basket, action.payload]}};     /* falls through */
  case"updateTotal": {
    let S=state.basket.reduce((sum,item)=>sum+(item.price*item.quantityOrdred),0);
      return {...state, total : S};    /* falls through */
  }
  case "RemoveFromBasket":
     return {basket:state.basket.filter(el=>(el.title!==action.payload))};
  default : return state;}/* falls through */
}
//search product
function searchReducer(state={productFound:[]}, action) {
  switch (action.type) {
    case "searchProduct": 
    return {productFound:[action.payload]};  /* falls through */
    default : return state;}
  }
//connect user
// function userReducer(state={userFistName:null}, action) {
//   switch (action.type) {
//     case "userConnected": 
//     return {userFistName:action.payload}; /* falls through */
//     default : return state;}
//   }


// combine reducers
const rootreducer=combineReducers({basketReducer,searchReducer});

//create the store
const store = createStore(rootreducer , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


ReactDOM.render(
  <React.StrictMode>
  <Provider store={store}>
    <App />
  </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
