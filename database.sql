CREATE DATABASE whitepaper;

CREATE TABLE USERS
(
    id SERIAL PRIMARY KEY,
    name TEXT,
    lastname TEXT,
    email TEXT,
    buildtype INT,
    verifyCode INT,
    created_at TIMESTAMP DEFAULT NOW()
);