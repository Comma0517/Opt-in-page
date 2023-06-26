const express = require("express");
const app = express();
const cors = require("cors");
const client = require("./db");
const path = require("path");
require('dotenv').config();
const sgMail = require('@sendgrid/mail');
const { log } = require("console");
const PORT = process.env.PORT || 5000;

// process.env.NODE_ENV => production or undefined

// middleware
app.use(cors());
app.use(express.json()); // req.body

if (process.env.NODE_ENV === "production") {
  // service static content
  // npm run build
  app.use(express.static(path.join(__dirname, "client/build")));
}

// ROUTES

// get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodos = await pool.query("SELECT * from todo");
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// create a todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );

    res.status(200).json(newTodo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

// update a todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.status(200).json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

// delete a todo
app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

app.listen(PORT, () => {
  console.log(`Server is starting on port ${PORT}`);
});


// Insert User Email
app.post("/getVerifyCode", async (req, res) => { 
  let verifyCode =0;
  try {    
    const { email } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)    
    verifyCode = Math.floor(100000 + Math.random() * 900000);

    const msg = {
      to: [email], // Change to your recipient
      from: {
        name: 'Applied Mold Inspection of Texas',
        email: `${process.env.SENDER_EMAIL}`
      }, 
      subject: ` Email Verification Code ${verifyCode} `,
      text: 'Your Verify code is below — enter it in your browser.',
      html: '<strong>Your Verify code is below — enter it in your browser.</strong><br><div style="font-size: xx-large; color: blue; text-align: -webkit-center;"><p>' + `${verifyCode}` + '<p/><div/>',
    }

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })
    res.json({verifyCode})
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/SendInitEmail", async (req, res) => { 
  try {    
    const { email } = req.body;
    sgMail.setApiKey(process.env.SENDGRID_API_KEY)    

    const msg = {
      to: [email], // Change to your recipient
      from: {
        name: 'Applied Mold Inspection of Texas',
        email: 'info@amoldi.com'
      }, 
      subject: 'Mold Inspection (inspection of m... Quote Request (quote request ...',
      text: 'Mold Inspection and Quote Request',
      html: ' <Strong >Applied Mold Inspection of Texas<Strong/><br><p>Tax & BlockTM: A Peer-to-Peer Electronic Tax Ecosystem<p/>An ecosystem of tax Apps and services that use machine-enforceable Inter-Blockchain Communication (IBC) protocol to exchange digital assets and data. Tax & Block, a trademark of Pitshou Solutions LLC, aims to provide the best tax filing solutions that reshape tax professionals’ businesses, meet taxpayers’ needs, and potentially serve as a high-impact use case for tax administration improvement using blockchain technology. In the presence of intense competition going on between tax preparation software and tax preparation services, most taxpayers primarily opt for tax preparation software to save some cash. While the tax software option offers flexibility and upfront money saving, this underscores the potential of getting out of your hard work and the maximization of tax returns and/or minimization of tax liability in the back end, especially when dealing with complex taxes. <br>Thank you.',
    }

    sgMail
      .send(msg)
      .then((response) => {
        console.log(response[0].statusCode)
        console.log(response[0].headers)
      })
      .catch((error) => {
        console.error(error)
      })
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

app.post("/insert", async (req, res) => { 
  try{
    const { name, lastname, email, buildtype } = req.body;
    const response = await client.query(
      "INSERT INTO users (name, lastname, email, buildtype) VALUES ($1, $2, $3, $4)",
      [name, lastname, email, buildtype]
    );    
    res.status(201).send(`User inserted successfully`);
  } catch (err) {
    console.error(err);
    res.status(500).send('Internal Server Error');
  }
});

