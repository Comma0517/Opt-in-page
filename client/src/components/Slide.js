import React, { Fragment } from "react";
import "../App.css";
import slide1 from "../public/slide1.jpg"
import slide2 from "../public/slide2.jpg"
import slide3 from "../public/slide3.jpg"

const Slide = () => {
  return (
    <Fragment>
        <div style={{paddingBottom: "30px"}}>
            <img style={{width: "33.3%"}} src={slide1} alt="slide1"/> 
            <img style={{width: "33.3%"}} src={slide2} alt="slide2"/> 
            <img style={{width: "33.3%"}} src={slide3} alt="slide"/> 
        </div>
    </Fragment>
  );
};

export default Slide;
