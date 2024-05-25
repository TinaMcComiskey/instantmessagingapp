const express = require("express"); // Import express library to create the router
const { 
    registerUser,       // registerUser function
    loginUser,          // loginUser function
    findUser,           // findUser function
    getUsers            // getUsers function
} = require("../controllers/userController")        // Path to the userController file

const router = express.Router();        // Create new router instance

// Define a POST route for user registration and map it 
// to the registerUser controller function
router.post("/register", registerUser);

// Define a POST route for user login and map it 
// to the loginUser controller function
router.post("/login", loginUser);

// // Define a GET route to find a user by ID and map it 
// to the findUser controller function
router.get("/find/:userId", findUser);

// Define a GET route to get all users and map it 
// to the getUsers controller function
router.get("/", getUsers);


module.exports = router;    // Export the router to be used in other parts of the application