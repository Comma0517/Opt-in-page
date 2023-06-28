import React, { Fragment } from "react";
import "../App.css";
import { Slide } from 'react-slideshow-image';
import 'react-slideshow-image/dist/styles.css'
import slide1 from "../public/slide1.jpg"
import slide2 from "../public/slide2.jpg"
import slide3 from "../public/slide3.jpg"

const Slideshow  = () => {
  return (
    <Fragment>
        {/* <div style={{paddingBottom: "30px"}}>
            <img style={{width: "33.3%"}} src={slide1} alt="slide1"/> 
            <img style={{width: "33.3%"}} src={slide2} alt="slide2"/> 
            <img style={{width: "33.3%"}} src={slide3} alt="slide3"/> 
        </div> */}
         <div className="slide-container" style={{paddingBottom: "30px"}}>
            <Slide>
                {/* <div>
                    <img style={{width: "33.3%"}} src={slide1} alt="slide1"/> 
                    <img style={{width: "33.3%"}} src={slide2} alt="slide2"/> 
                    <img style={{width: "33.3%"}} src={slide3} alt="slide3"/> 
                </div> */}
                <div style={{textAlign: "center"}}>
                    <img style={{width: "60%"}} src={slide1} alt="slide1"/>
                </div>
                <div style={{textAlign: "center"}}>
                    <img style={{width: "60%"}} src={slide2} alt="slide2"/>
                </div>
                <div style={{textAlign: "center"}}>
                    <img style={{width: "60%"}} src={slide3} alt="slide3"/>
                </div>
            </Slide>
        </div>
    </Fragment>
  );
};

export default Slideshow ;
