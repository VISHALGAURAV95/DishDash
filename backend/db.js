const mongoose = require("mongoose");
const mongouri = process.env.MONGO_URI;

const mongodb = async () => {
  try {
    await mongoose.connect(mongouri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log("Connected successfully");

    // Define the schema
    const food_items = new mongoose.Schema({
      CategoryName: String,
      name: String,
      image: String,
      options: [{
        half: { type: String, default: "" },
        full: { type: String, default: "" },
      }],
      description: String,
    });

    // Create the model
    const food_item = mongoose.model("food_items", food_items);

    const food_category_schema = new mongoose.Schema({
      CategoryName: String,
    });

    // Create the model for food_category
    const food_category = mongoose.model("food_category", food_category_schema);

    // Query to find all food items
    global.foodItems = await food_item.find({});
    global.foodCategory = await food_category.find({});
    // console.log(foodItems);

  } catch (error) {
    console.error("Connection error:", error);
  }
};

// Call the mongodb function to connect and fetch data
// mongodb();

module.exports = mongodb;
