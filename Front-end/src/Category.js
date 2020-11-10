import React from "react";
import "./Category.css";
import { Link } from "react-router-dom";
import {CategoryList} from './CategoryList'
import {Row, Col} from 'react-bootstrap'


function Category() {
  return (
    <>
     <Row> <ul className="category">

        {CategoryList.map((el, i) => (  
            <Col xs={2} key={i}><Link to={`/${el}`} className='catLink' >
              
               <li > {el}</li>
             </Link> </Col>
        
        ))}
      </ul></Row>
    </>
  );
}

export default Category;
