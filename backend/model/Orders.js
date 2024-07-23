const mongoose=require("mongoose");

  

const orderschema=mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
},
order_data: {
    type: Array,
    required: true,
},
})

module.exports=mongoose.model("orders",orderschema)