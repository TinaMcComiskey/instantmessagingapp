const userModel = require("../models/userModel");   // Import the userModel
const bcrypt = require("bcrypt");                   // Import bcrypt for hashing passwords
const validator = require("validator");             // Import validator for validating email and password     
const jwt = require("jsonwebtoken");                // Import jsonwebtoken for creating and verifying JWTs

// Function to create a JWT token for a user
const createToken = (_id) => {
    const jwtkey = process.env.JWT_SECRET_KEY;  // Get the JWT secret key from .env

    return jwt.sign({_id}, jwtkey);     // Sign a new JWT with the user's ID and return it
}

// Controller function to handle user registration
const registerUser = async (req, res) => {

    try {
        const {name, email, password} = req.body;   // Extract name, email, and password from the request body

        // Check if a user with the given email already exists
        let user = await userModel.findOne({email});
        if(user) 
            return res.status(400).json("User with the given email already exists...");

        // Check if all fields are provided
        if(!name || !email || !password) 
            return res.status(400).json("All fields are required");

        // Validate email format
        if(!validator.isEmail(email)) 
            return res.status(400).json("Email must be a valid email...")
        
        // Validate password strength
        if(!validator.isStrongPassword(password)) 
            return res.status(400).json("Password must be a strong password...")


        // Create a new user instance with the provided details
        user = new userModel({name, email, password});

        // Hash the user's password before saving it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(user.password, salt);

        // Save the user to the database
        await user.save()

        // Create a JWT token for the user
        const token = createToken(user._id);

        // Send a response with the user's details and the token
        res.status(200).json({ _id: user._id, name, email, token })
    } catch(error) {
        console.log(error);     // Log any errors
        res.status(500).json(error);    // Send a 500 response with the error
    }
};

// Controller function to handle user login
const loginUser = async(req, res) => {
    const {email, password} = req.body;     // Extract email and password from the request body

    try{
        // Find the user by email
        let user = await userModel.findOne({email});
        if(!user)
            return res.status(400).json("Invalid email or password");

        // Compare the provided password with the stored hashed password
        const isValidPassword = await bcrypt.compare(password, user.password);
        if(!isValidPassword)
            return res.status(400).json("Invalid email or password");

        // Create a JWT token for the user
        const token = createToken(user._id);

        // Send a response with the user's details and the token
        res.status(200).json({ _id: user._id, name: user.name, email, token })

    }catch(error){
        console.log(error);     // Log any errors
        res.status(500).json(error);    // Send a 500 response with the error
    }
};

// Controller function to find a user by their ID
const findUser = async(req, res) => {
    const userId = req.params.userId;   // Extract the userId from the req parameters
    try{
        // Find the user by their ID
        const user = await userModel.findById(userId);
        res.status(200).json(user);     // Send a response with the user's details
    }catch(error){
        console.log(error);     // Log any errors
        res.status(500).json(error);    // Send a 500 response with the error
    }
};

// Controller function to get all users
const getUsers = async(req, res) => {
    try{
        // Find all users in the database
        const users = await userModel.find();
        res.status(200).json(users);    // Send a response with the list of users
    }catch(error){
        console.log(error);     // Log any errors
        res.status(500).json(error);    // Send a 500 response with the error
    }
};

// Export the controller functions for use in other parts of the application
module.exports = { registerUser, loginUser, findUser, getUsers }