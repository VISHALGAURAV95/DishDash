const express = require('express');
const router = express.Router();
const Order = require("../model/Orders");

router.post('/orderData', async (req, res) => {
  let data = req.body.order_data;
  await data.splice(0, 0, { Order_date: req.body.order_date });
  // console.log("1231242343242354", req.body.email);

  // Check if the email exists in the database
  let eId = await Order.findOne({ 'email': req.body.email });
  console.log(eId);
  if (eId === null) {
    try {
      console.log(data);
      console.log("1231242343242354", req.body.email);
      await Order.create({
        email: req.body.email,
        order_data: [data]
      }).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: " + error.message); // Updated line
    }
  } else {
    try {
      await Order.findOneAndUpdate(
        { email: req.body.email },
        { $push: { order_data: data } }
      ).then(() => {
        res.json({ success: true });
      });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Server Error: " + error.message); // Updated line
    }
  }
});

router.post('/myOrderData', async (req, res) => {
  try {
    // console.log(req.body.email);
    let eId = await Order.findOne({ 'email': req.body.email });
    //console.log(eId)
    res.json({ orderData: eId });
  } catch (error) {
    res.status(500).send("Error: " + error.message); // Updated line
  }
});

module.exports = router;
