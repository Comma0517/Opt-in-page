import React from "react";
import "../App.css";
import logo from "../public/Logo.png"
import footer1 from "../public/Footer1.png"
import footer2 from "../public/Footer2.png"
import footer3 from "../public/Footer3.png"
import footer4 from "../public/Footer4.png"
import { Divider, Row, Col } from 'antd';

const Footer = () => {
  return (
    <div>
        <div style={{textAlign: "-webkit-center"}}>            
            <img style={{width: "250px"}} src={logo} alt="logo"/> 
        </div>
        <p style={{color: "yellow", textAlignLast: "center"}}>Powered by Pitshou Solutions LLC</p>
        <p style={{color: "white", textAlignLast: "center"}}>Applied Mold Inspection of Texas, c/o Pitshou Solutions LLC, 1000 Main Street Suite 2300, Houston TX 77002</p>
        <Divider style={{backgroundColor: "white", margin: "20px 0 15px 0"}}></Divider>
        <Row
            gutter={{
                xs: 8,
                sm: 16,
                md: 24,
                lg: 32,
            }}
            >
            <Col className="gutter-row" span={8}>
                <p style={{color: "white", margin: "5px"}}>© 2023 All rights reserved.</p>
            </Col>
            <Col className="gutter-row" span={7}>
                <div>
                    <img style={{width: "30px", color: "white", marginRight: "5%"}} src={footer1} alt="footer1"/>  
                    <img style={{width: "30px", color: "white", marginRight: "5%"}} src={footer2} alt="footer2"/>  
                    <img style={{width: "30px", color: "white", marginRight: "5%"}} src={footer3} alt="footer3"/>  
                    <img style={{width: "30px", color: "white", marginRight: "5%"}} src={footer4} alt="footer4"/>  
                </div>
            </Col>
            <Col className="gutter-row" span={4}>
            <p style={{color: "white", margin: "5px"}}>Privacy policy</p>
            </Col>
            <Col className="gutter-row" span={5}>
            <p style={{color: "white", margin: "5px"}}>Terms and Condition</p>
            </Col>
        </Row>
    </div>
  );
};

export default Footer;
