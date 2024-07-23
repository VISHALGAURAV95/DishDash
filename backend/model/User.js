const mongoose=require("mongoose");



const UserScehema=mongoose.Schema({
  
  name: {
    type: String,
    required: true, // corrected "require" to "required"
  },
  Email: {
    type: String,
    required: true, // corrected "require" to "required"
  },
  location: {
    type: String,
    required: true, // corrected "require" to "required"
  },
  password: {
    type: String,
    required: true, // corrected "require" to "required"
  },
  date: {
    type: Date,
    default: Date.now
  }
});



   module.exports=mongoose.model("User",UserScehema);