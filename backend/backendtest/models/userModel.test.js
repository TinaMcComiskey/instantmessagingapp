const mongoose = require('mongoose');
const User = require('../../models/userModel');

describe('User Model', () => {
  beforeAll(async () => {
    // Connect to the in-memory MongoDB database
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  afterAll(async () => {
    // Disconnect from the in-memory MongoDB database
    await mongoose.connection.close();
  });

  it('should create and save a new user successfully', async () => {
    // Mock user data
    const userData = {
      name: 'John Doe',
      email: 'john@example.com',
      password: 'John123$',
    };

    // Create a new user instance
    const validUser = new User(userData);

    // Save the user to the database
    const savedUser = await validUser.save();

    // Check if the user has been saved successfully
    expect(savedUser._id).toBeDefined();
    expect(savedUser.name).toBe(userData.name);
    expect(savedUser.email).toBe(userData.email);
    expect(savedUser.password).toBe(userData.password);
  });

  it('should not save a user without required fields', async () => {
    // Create a user instance without the required 'name' field
    const userWithoutName = new User({ email: 'john@example.com', password: 'John123$' });

    // Attempt to save the user without the required 'name' field
    let error;
    try {
      await userWithoutName.save();
    } catch (err) {
      error = err;
    }

    // Check if the save operation failed as expected
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError);
    expect(error.errors.name).toBeDefined();
  });
});
