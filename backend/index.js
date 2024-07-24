const env=require('dotenv').config();
// console.log(env);
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
const allowedOrigins = [
  'https://dish-dash-frontend.vercel.app',
  'https://dish-dash-frontend-kmhrbeaxg-vishalgaurav95s-projects.vercel.app',
  // Add more origins as needed
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
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
