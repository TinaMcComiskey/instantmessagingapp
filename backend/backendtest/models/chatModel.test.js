const mongoose = require("mongoose");
const Chat = require("../../models/chatModel");

describe("Chat Model", () => {
  // Before running any tests, connect to the MongoDB in-memory database
  beforeAll(async () => {
    await mongoose.connect(global.__MONGO_URI__, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  });

  // After all tests are done, disconnect from the MongoDB in-memory database
  afterAll(async () => {
    await mongoose.disconnect();
  });

  // Test case to check if the model creates a new chat instance
  it("should create a new chat instance", async () => {
    // Create a new chat
    const newChat = new Chat({
      members: ["user1", "user2"],
    });

    // Save the chat to the database
    const savedChat = await newChat.save();

    // Check if the chat is saved successfully
    expect(savedChat._id).toBeDefined();
    expect(savedChat.members).toEqual(["user1", "user2"]);
    expect(savedChat.createdAt).toBeDefined();
    expect(savedChat.updatedAt).toBeDefined();
  });
});
