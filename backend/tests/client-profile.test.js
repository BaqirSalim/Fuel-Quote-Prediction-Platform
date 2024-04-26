// Import the necessary modules and dependencies
import ClientController from "../controllers/client-profile.controller.js";
import ClientProfile from "../models/client-profile.model.js"; // Import your Profile model
import User from "../models/user.model.js"; // Import your User model
import { jest, test, expect, describe } from "@jest/globals";

describe("clientProfile", () => {
  // Mock the Profile and User models' findOne and save methods
  const mockProfileFindOne = jest.spyOn(ClientProfile, "findOne");
  const mockUserFindOne = jest.spyOn(User, "findOne");
  const mockProfileSave = jest.spyOn(ClientProfile, "save");

  // Test case for successful profile update
  test("should return a 200 status code and the updated client profile data", async () => {
    const req = {
      body: {
        username: "matthewyohannes",
        fullName: "Matthew",
        address1: "123 unittest lane",
        address2: "",
        city: "university",
        state: "TX",
        zipcode: "12345"
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to resolve with a sample user object
    const mockUser = {
      _id: "1234567890",
      clientProfile: "0987654321" // Sample clientProfile ID associated with the user
    };
    mockUserFindOne.mockResolvedValue(mockUser);

    // Mock ClientProfile.findOne to resolve with a sample clientProfile object
    const mockClientProfile = {
      _id: "0987654321",
      fullName: "Old Name",
      address1: "Old Address",
      address2: "Old Address 2",
      city: "Old City",
      state: "Old State",
      zipcode: "Old Zipcode"
    };
    mockProfileFindOne.mockResolvedValue(mockClientProfile);

    // Call the controller method
    await ClientController.updateClientProfile(req, res);

    // Assertions
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ profile: mockClientProfile }); // Assuming you're returning the updated profile
    expect(mockProfileSave).toHaveBeenCalled(); // Ensure save method is called
  });

  // Test case for missing parameters
  test("should return a 400 status code for missing parameters", async () => {
    const req = {
      body: {}, // Missing parameters
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Call the controller method
    await ClientController.updateClientProfile(req, res);

    // Assertions
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      error: "One or more required fields is missing",
    });
  });

  // Test case for user not found
  test("should return a 404 status code if user is not found", async () => {
    const req = {
      body: {
        username: "nonexistentuser",
        fullName: "Matthew",
        address1: "123 unittest lane",
        address2: "",
        city: "university",
        state: "TX",
        zipcode: "12345"
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to resolve with null (user not found)
    mockUserFindOne.mockResolvedValue(null);

    // Call the controller method
    await ClientController.updateClientProfile(req, res);

    // Assertions
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "User not found" });
  });

  // Test case for client profile not found
  test("should return a 404 status code if client profile is not found", async () => {
    const req = {
      body: {
        username: "matthewyohannes",
        fullName: "Matthew",
        address1: "123 unittest lane",
        address2: "",
        city: "university",
        state: "TX",
        zipcode: "12345"
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock User.findOne to resolve with a sample user object
    const mockUser = {
      _id: "1234567890",
      clientProfile: "nonexistentprofile" // Nonexistent clientProfile ID associated with the user
    };
    mockUserFindOne.mockResolvedValue(mockUser);

    // Call the controller method
    await ClientController.updateClientProfile(req, res);

    // Assertions
    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "ClientProfile not found" });
  });

  // Restore the original methods after all tests
  afterAll(() => {
    mockProfileFindOne.mockRestore();
    mockUserFindOne.mockRestore();
    mockProfileSave.mockRestore();
  });
});
