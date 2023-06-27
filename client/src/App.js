import React, { Fragment, useState } from "react";
import "./App.css";
import "./flag.css";
import ReactFlagsSelect from "react-flags-select";
import background from "./public/Background.png"
import logo from "./public/Logo.png"
import { Divider} from 'antd';
import EmailSet from "./components/EmailSet";
import Slide from "./components/Slide";
import Footer from "./components/Footer";


function App() {
  const [select, setSelect] = useState("US");
  const onSelect = (code) => setSelect(code);
  console.log("SELECT", select);
  return (
    <Fragment >
      <div className="background" style={{ backgroundImage: `url(${background})`}}>
        <div className="container">
          <div className="headerLine" style={{display: "flex"}}>          
            <div>
              <img className="headerLogo" src={logo} alt="logo"/>
            </div>            
            <div className="langBar" style={{paddingTop: "45px"}}>
              {/* <Select
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
              />       */}
              <ReactFlagsSelect
                selected={select}
                onSelect={onSelect}
                countries={["US", "ES"]}
                selectedSize={11}
                optionsSize={11}
                /*showSelectedLabel={showSelectedLabel}
                showOptionLabel={showOptionLabel}
                placeholder={placeholder}
                searchable={searchable}
                searchPlaceholder={searchPlaceholder}
                alignOptionsToRight={alignOptionsToRight}
                fullWidth={fullWidth}
                disabled={disabled} */
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
