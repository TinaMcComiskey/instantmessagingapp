const mongoose = require("mongoose"); // Import Mongoose library

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 30,
    },  // User name field: a string that is required, 
        // with a min length of 1 and max length of 30
    email: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 200,
      unique: true,
    },  // User email field: a string that is required, 
        // must be unique, with a min length of 1 and max length of 200
    password: {
      type: String,
      required: true,
      minlength: 1,
      maxlength: 1024,
    },  // User password field: a string that is required, 
        // with a min length of 1 and max length of 1024
  },
  {
    timestamps: true,   // Automatically adds createdAt and updatedAt timestamps
  }
);

// Create the User model using the userSchema
const userModel = mongoose.model("User", userSchema);


module.exports = userModel; // Export the userModel to be used in other parts of the application
