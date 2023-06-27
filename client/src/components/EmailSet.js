import React, { Fragment, useState, useRef } from "react";
import { Input, Radio, Space, Button, message, Modal } from 'antd';
import ReCAPTCHA from 'react-google-recaptcha';
import axios from 'axios';
import "../App.css";
const API_HOST = process.env.REACT_APP_BASE_URL

const EmailSet = () => {
    const captchaRef = useRef(null);
    const [value, setValue] = useState(1);
    const [name, setName] = useState("");
    const [lastname, setLastname] = useState("");
    const [email, setEmail] = useState("");
    const [isValid, setIsValid] = useState(false);
    const [messages, setMessages] = useState("");
    const [messageApi, contextHolder] = message.useMessage();
    const [verifyCode, setVerifyCode] = useState(0);
    const [num, setNum] = useState(0);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const emailRegex = /\S+@\S+\.\S+/;
    let number;

    const onChange = (e) => {
      setValue(e.target.value);
    };

    const showModal = () => {
        insertUser();
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleInputChange = (event) => {
        const email = event.target.value;
        if (emailRegex.test(email)) {
            setIsValid(true);        
            setEmail(email);
            setMessages('');
        } else {
            setIsValid(false);
            setMessages('Please enter a valid email!');
        }
    }

    const insertUser = async () => {
        if (!name) {
            warnigName();
        }else if(!lastname){
            warnigLastname();
        }else if (!email) {
            warnigEmail();
        } else {            
            setIsModalOpen(true);
            try {
                await fetch( `${API_HOST}/getVerifyCode`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ email: email}),
                }).then(res => {return res.json()})
                .then(data => {number = data.verifyCode})
                setNum(number)
            } catch (err) {
                console.error(err);
            }
        }
    };
    
    const handleOk = async () => {
        if(num.toString() == verifyCode){
            try {
                await fetch( `${API_HOST}/insert`, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ name: name, lastname: lastname, email: email, buildtype: value}),
                });
                setIsModalOpen(false);                
                success();
                sendFirstEmail();
            } catch (err) {
                console.error(err);
            }
        }else{
            warningVerify();
        }
    };

    const sendFirstEmail = async () => {
        try {
            await fetch( `${API_HOST}/SendInitEmail`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email: email}),
            });
        } catch (err) {
            console.error(err);
        }
    }

    const success = () => {
        messageApi.open({
          type: 'success',
          content: 'User Email Insert has been successful.',
        });
      };

    const warningVerify = () => {
    messageApi.open({
        type: 'warning',
        content: 'Email Verification Code is not Correct!',
    });
    };

    const warnigEmail = () => {
        messageApi.open({
          type: 'warning',
          content: 'Contact Email is required!',
        });
      };
    
    const warnigName = () => {
        messageApi.open({
            type: 'warning',
            content: 'FirstName is required!',
        });
    };

    const warnigLastname = () => {
        messageApi.open({
            type: 'warning',
            content: 'LastName is required!',
        });
    };

  return (
    <Fragment>
        {contextHolder}
        <Modal width="300px" title="Email Verification" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
            <Input onChange={(e) => setVerifyCode(e.target.value)}  size="large" placeholder="Enter Verify Code" />
        </Modal>
        <div className="emailSet">
            <div>
              <p style={{color: "white", textAlignLast: "center", fontSize: "22px"}}>Applying scientific knowledge and technology to thoroughly inspect buildings for mold growth related problems.</p>
            </div>
            <div>
                <p style={{color: "white"}}>Building Types*</p>
                <Radio.Group onChange={onChange} value={value}>
                    <Space direction="vertical">
                        <Radio style={{color: "white"}} value={1}>Public buildings Residential and commercial buildings</Radio>
                        <Radio style={{color: "white"}} value={2}>Single family homes</Radio>
                    </Space>
                </Radio.Group>
            </div>
            <p style={{color: "white", textAlignLast: "center"}}>Fill out the form below to get started and receive a quote from us!</p>
            <div>              
              <p style={{color: "white"}}>Name*</p>
              <div onClick={() => setName("")}>
                <Input onChange={(e) => setName(e.target.value)}  size="large" placeholder="Enter First Name" />
              </div>
            </div>
            <div>              
              <p style={{color: "white"}}>Last Name*</p>
              <Input onChange={(e) => setLastname(e.target.value)} size="large" placeholder="Enter Last Name" />
            </div>
            <div>
                <p style={{color: "white"}}>Email Address*</p>
                <Input onChange={(e) => handleInputChange(e)} size="large" placeholder="Enter Email Address" />              
                <div style={{color: "red"}} className={`messages ${isValid ? 'success' : 'error'}`}>
                    {messages}
                </div>
            </div>
            <div style={{paddingTop: "20px"}}>
                <ReCAPTCHA theme="dark" sitekey={process.env.REACT_APP_SITE_KEY} ref={captchaRef} />
            </div>
            <div style={{paddingTop: "20px"}}>
                <Button onClick={() => showModal()} style={{ width: "120px"}} type="primary" danger>
                    Submit
                </Button>
            </div>
            <p style={{color: "red", textAlignLast: "center"}}>No credit card required</p>
        </div>
    </Fragment>
  );
};

export default EmailSet;
