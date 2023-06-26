const { Client } = require("pg");

const client = new Client({
  user: "postgres",
  password: "123456",
  host: "localhost",
  port: 5432,
  database: "whitepaper",
});

client.connect((err) => {
  if (err) {
    console.error('Connection error', err.stack);
  } else {
    console.log('Connected to the database');
  }
});

module.exports = {
  query: (text, params) => client.query(text, params)
};
