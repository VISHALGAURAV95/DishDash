const env=require('dotenv').config();
console.log(env);
const express = require('express');
const cors = require('cors');
const app = express();
const port =process.env.PORT || 5000;
const mongodb = require('./db');
const CreateUser = require('./Routes/CreateUser');
const displaydata=require("./Routes/Displaydata");
const orderdata=require("./Routes/Orderdata")

mongodb();

// Use cors middleware
app.use(cors({
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(express.json());
app.use('/api', CreateUser);
app.use('/api', displaydata);
app.use('/api', orderdata);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
