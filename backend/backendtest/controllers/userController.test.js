const {
  registerUser,
  loginUser,
  findUser,
  getUsers,
} = require("../../controllers/userController"); // Update the path accordingly
const userModel = require("../../models/userModel"); // Import userModel
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

// Mock the userModel functions
jest.mock("../../models/userModel", () => ({
  findOne: jest.fn(),
  findById: jest.fn(),
  find: jest.fn(),
  save: jest.fn(),
}));

// Mock the bcrypt functions
jest.mock("bcrypt", () => ({
  genSalt: jest.fn(),
  hash: jest.fn(),
  compare: jest.fn(),
}));

// Mock the jwt functions
jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(),
}));

describe("User Controller", () => {
  describe("registerUser", () => {
    it("should register a new user", async () => {
        const req = { body: { name: "John Doe", email: "john@example.com", password: "John123$" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(req.body.password, salt);
        const user = { ...req.body, password: hashedPassword };
    
        userModel.findOne.mockResolvedValue(null); // Mock findOne to return null, indicating user doesn't exist
        userModel.prototype.save = jest.fn().mockResolvedValue(); // Mock the save method of the userModel
    
        await registerUser(req, res);
    
        expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(userModel.prototype.save).toHaveBeenCalled();
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(expect.objectContaining({ _id: expect.anything(), name: 'John Doe', email: 'john@example.com', token: 'token' }));
    });
  });

  describe("loginUser", () => {
    it("should login an existing user", async () => {
        const req = { body: { email: "john@example.com", password: "John123$" } };
        const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
        const user = {
            _id: "userId",
            name: "John Doe",
            email: req.body.email,
            password: "hashedPassword"
        };
        userModel.findOne.mockResolvedValue(user); // Mock findOne to return the user
        bcrypt.compare.mockReturnValue(true); // Mock bcrypt.compare to return true
        jwt.sign.mockReturnValue("token"); // Mock jwt.sign to return a token
    
        await loginUser(req, res);
    
        expect(userModel.findOne).toHaveBeenCalledWith({ email: req.body.email });
        expect(bcrypt.compare).toHaveBeenCalledWith(req.body.password, user.password);
        expect(jwt.sign).toHaveBeenCalledWith({ _id: user._id }, expect.anything());
        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith({
            _id: "userId",
            name: user.name,
            email: req.body.email,
            token: "token"
        });
    });
  });

  describe("findUser", () => {
    test("should find a user by ID", async () => {
      const req = { params: { userId: "userId" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockUser = {
        _id: "userId",
        name: "John Doe",
        email: "john@example.com",
      };

      // Mock userModel.findById to return the mockUser
      userModel.findById.mockResolvedValue(mockUser);

      await findUser(req, res);

      expect(userModel.findById).toHaveBeenCalledWith("userId");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUser);
    });
  });

  describe("getUsers", () => {
    test("should get all users", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const mockUsers = [
        { _id: "userId1", name: "John Doe", email: "john@example.com" },
        { _id: "userId2", name: "Jane Doe", email: "jane@example.com" },
      ];

      // Mock userModel.find to return mockUsers
      userModel.find.mockResolvedValue(mockUsers);

      await getUsers(req, res);

      expect(userModel.find).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith(mockUsers);
    });
  });
});
