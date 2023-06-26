import React, { Fragment } from "react";
import "./App.css";
import background from "./public/Background.png"
import logo from "./public/Logo.png"
import { Divider, Select} from 'antd';
import EmailSet from "./components/EmailSet";
import Slide from "./components/Slide";
import Footer from "./components/Footer";


function App() {
  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  return (
    <Fragment >
      <div className="background" style={{ backgroundImage: `url(${background})`}}>
        <div className="container">
          <div style={{paddingLeft: "3%", display: "flex"}}>          
            <div>
              <img className="headerLogo" src={logo} alt="logo"/>
            </div>            
            <div className="langBar" style={{paddingTop: "45px"}}>
              <Select
                size="small"
                defaultValue="English"
                style={{
                  width: 90,
                }}
                onChange={handleChange}
                options={[
                  {
                    value: 'English',
                    label: 'English',
                  },
                  {
                    value: 'Spanish',
                    label: 'Spanish',
                  }
                ]}
              />      
            </div>      
          </div>
          <Divider style={{margin: "1px", backgroundColor: "white"}}/>
          <div className="window-grid">
            <EmailSet />
          </div>
          <div>            
            <Slide />
          </div>
        </div>  
        <div style={{ backgroundColor: "#121639"}}>   
          <div className="container">
            <Footer />
          </div>
        </div>      
      </div>
    </Fragment>
  );
}

export default App;
