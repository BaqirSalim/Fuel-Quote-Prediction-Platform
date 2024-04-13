// Import the necessary modules and dependencies
import ClientController from "../controllers/client-profile.controller.js";
import ClientProfile from "../models/client-profile.model.js"; // Import your Profile model
import { jest, test, expect, describe } from "@jest/globals";

describe("clientProfile", () => {
  // Mock the Profile model's create method
  const mockCreate = jest.spyOn(ClientProfile, "create");

  // Test case for successful profile creation
  test("should return a 200 status code and the submitted client profile data", async () => {
    const req = {
      body: {
        username: "matthewyohannes",
        fullName: "Matthew",
        address1: "123 unittest lane",
        address2: "",
        city: "university",
        state: "TX",
        zipcode: "12345",
        orders: [],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    // Mock Profile.create to resolve with a sample profile object
    const mockProfile = {
      _id: "1234567890",
      username: "matthewyohannes",
      fullName: "Matthew",
      address1: "123 unittest lane",
      address2: "",
      city: "university",
      state: "TX",
      zipcode: "12345",
      orders: [],
    };

    // Implement the mocked create method
    mockCreate.mockResolvedValue(mockProfile);

    // Call the controller method
    await ClientController.clientProfile(req, res);

    // Assertions
    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ profile: mockProfile });
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
    await ClientController.clientProfile(req, res);

    // Assertions
    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      error: "One or more required fields is missing",
    });
  });

  test("should return a 500 status code and error message if there is an internal server error", async () => {
    const req = {
      body: {
        username: "matthewyohannes",
        fullName: "Matthew",
        address1: "123 unittest lane",
        address2: "",
        city: "university",
        state: "TX",
        zipcode: "12345",
        orders: [],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Database connection failed");
    const mockCreate = jest.spyOn(ClientProfile, "create");
    mockCreate.mockRejectedValue(mockError);

    await ClientController.clientProfile(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });

    mockCreate.mockRestore(); // Restore the mock after the test
  });

  // Restore the original Profile.create method after all tests
  afterAll(() => {
    mockCreate.mockRestore();
  });
});
