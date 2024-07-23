const express = require('express');
const router = express.Router();


router.post("/food_items",(req,res)=>{
  try {
    res.send([global.foodItems,global.foodCategory]);
    // console.log(global.foodItems);
  } catch (error) {
    console.log(error);
    res.send("Server Error");
  }
})

module.exports = router;