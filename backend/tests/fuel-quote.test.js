import FuelQuoteController from "../controllers/fuel-quote.controller.js";
import FuelQuote from "../models/fuel-quote.model.js";
import { jest, test, expect, describe } from "@jest/globals";
import User from "../models/user.model";
import ClientProfile from "../models/client-profile.model";

const mockUserFindOne = jest.spyOn(User, "findOne");
const mockProfileFindOne = jest.spyOn(ClientProfile, "findOne");

describe("submitFuelQuote", () => {
  const mockCreate = jest.spyOn(FuelQuote, "create");

  test("should return a 200 status code and the submitted fuel quote data", async () => {
    const req = {
      body: {
        username: "baqir",
        gallonsRequested: 100,
        deliveryAddress: "123 Main St",
        deliveryDate: "07/24/2024",
        suggestedPrice: 50,
        totalAmountDue: 100,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFuelQuote = {
      _id: "1234567890",
      gallonsRequested: 100,
      deliveryAddress: "123 Main St",
      deliveryDate: "07/24/2024",
      suggestedPrice: 50,
      totalAmountDue: 100,
    };

    const mockUser = {
      _id: "1234567890",
      clientProfile: "0987654321", // Sample clientProfile ID associated with the user
    };
    mockUserFindOne.mockResolvedValue(mockUser);

    mockCreate.mockResolvedValue(mockFuelQuote);

    const mockClientProfile = {
      _id: "0987654321",
      fullName: "Old Name",
      address1: "Old Address",
      address2: "Old Address 2",
      city: "Old City",
      state: "Old State",
      zipcode: "Old Zipcode",
      orders: [],
      save: jest.fn(),
    };
    mockProfileFindOne.mockResolvedValue(mockClientProfile);

    await FuelQuoteController.submitFuelQuote(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ fuelquote: mockFuelQuote });
  });

  test("should return a 404 user", async () => {
    const req = {
      body: {
        username: "baqir",
        gallonsRequested: 100,
        deliveryAddress: "123 Main St",
        deliveryDate: "07/24/2024",
        suggestedPrice: 50,
        totalAmountDue: 100,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFuelQuote = {
      _id: "1234567890",
      gallonsRequested: 100,
      deliveryAddress: "123 Main St",
      deliveryDate: "07/24/2024",
      suggestedPrice: 50,
      totalAmountDue: 100,
    };

    const mockUser = {
      _id: "1234567890",
      clientProfile: "0987654321", // Sample clientProfile ID associated with the user
    };
    mockUserFindOne.mockResolvedValue(null);

    await FuelQuoteController.submitFuelQuote(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "User not found" });
  });

  test("should return a 404 client profile", async () => {
    const req = {
      body: {
        username: "baqir",
        gallonsRequested: 100,
        deliveryAddress: "123 Main St",
        deliveryDate: "07/24/2024",
        suggestedPrice: 50,
        totalAmountDue: 100,
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFuelQuote = {
      _id: "1234567890",
      gallonsRequested: 100,
      deliveryAddress: "123 Main St",
      deliveryDate: "07/24/2024",
      suggestedPrice: 50,
      totalAmountDue: 100,
    };

    const mockUser = {
      _id: "1234567890",
      clientProfile: "0987654321", // Sample clientProfile ID associated with the user
    };
    mockUserFindOne.mockResolvedValue(mockUser);

    mockCreate.mockResolvedValue(mockFuelQuote);

    const mockClientProfile = {
      _id: "0987654321",
      fullName: "Old Name",
      address1: "Old Address",
      address2: "Old Address 2",
      city: "Old City",
      state: "Old State",
      zipcode: "Old Zipcode",
      orders: [],
      save: jest.fn(),
    };
    mockProfileFindOne.mockResolvedValue(null);

    await FuelQuoteController.submitFuelQuote(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "ClientProfile not found" });
  });

  test("should return a 400 status code for missing parameters", async () => {
    const req = {
      body: {}, // Missing parameters
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUser = {
      _id: "1234567890",
      clientProfile: "0987654321", // Sample clientProfile ID associated with the user
    };
    mockUserFindOne.mockResolvedValue(mockUser);

    const mockFuelQuote = {
      _id: "1234567890",
      gallonsRequested: 100,
      deliveryAddress: "123 Main St",
      deliveryDate: "07/24/2024",
      suggestedPrice: 50,
      totalAmountDue: 100,
    };

    mockCreate.mockResolvedValue(mockFuelQuote);

    const mockClientProfile = {
      _id: "0987654321",
      fullName: "Old Name",
      address1: "Old Address",
      address2: "Old Address 2",
      city: "Old City",
      state: "Old State",
      zipcode: "Old Zipcode",
      orders: [],
      save: jest.fn(),
    };
    mockProfileFindOne.mockResolvedValue(mockClientProfile);

    await FuelQuoteController.submitFuelQuote(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      error: "All fields are required",
    });
  });

  //   test("should return a 500 status code and error message if there is an internal server error", async () => {
  //     const req = {
  //       body: {
  //         username: "baqir",
  //         gallonsRequested: 100,
  //         deliveryAddress: "123 Main St",
  //         deliveryDate: "2024-07-24",
  //         suggestedPrice: 50,
  //         totalAmountDue: 100,
  //       },
  //     };
  //     const res = {
  //       status: jest.fn().mockReturnThis(),
  //       json: jest.fn(),
  //     };

  //     const mockError = new Error("Database connection failed");
  //     const mockCreate = jest.spyOn(FuelQuote, "create");
  //     mockCreate.mockRejectedValue(mockError);

  //     const mockUser = {
  //       _id: "1234567890",
  //       clientProfile: "0987654321", // Sample clientProfile ID associated with the user
  //     };
  //     mockUserFindOne.mockResolvedValue(mockUser);

  //     const mockFuelQuote = {
  //       _id: "1234567890",
  //       gallonsRequested: 100,
  //       deliveryAddress: "123 Main St",
  //       deliveryDate: "07/24/2024",
  //       suggestedPrice: 50,
  //       totalAmountDue: 100,
  //     };

  //     mockCreate.mockResolvedValue(mockFuelQuote);

  //     const mockClientProfile = {
  //       _id: "0987654321",
  //       fullName: "Old Name",
  //       address1: "Old Address",
  //       address2: "Old Address 2",
  //       city: "Old City",
  //       state: "Old State",
  //       zipcode: "Old Zipcode",
  //       orders: [],
  //       save: jest.fn(),
  //     };
  //     mockProfileFindOne.mockResolvedValue(mockClientProfile);

  //     await FuelQuoteController.submitFuelQuote(req, res);

  //     expect(res.status).toBeCalledWith(500);
  //     expect(res.json).toBeCalledWith({ error: "Internal Server Error" });

  //     mockCreate.mockRestore(); // Restore the mock after the test
  //   });

  afterAll(() => {
    mockCreate.mockRestore();
  });
});

describe("getFuelQuoteHistory", () => {
  test("should return a 200 status code and the fuel quote history data", async () => {
    const req = { query: { username: "baqir" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockFuelQuoteHistory = [
      {
        _id: "1234567890",
        gallonsRequested: 100,
        deliveryAddress: "123 Main St",
        deliveryDate: "2024-07-24",
        suggestedPrice: 50,
      },
      //add more if i need to
    ];

    const mockFind = jest.spyOn(FuelQuote, "find");
    mockFind.mockResolvedValue(mockFuelQuoteHistory);

    const mockUser = {
      _id: "1234567890",
      clientProfile: "0987654321", // Sample clientProfile ID associated with the user
    };
    mockUserFindOne.mockResolvedValue(mockUser);

    await FuelQuoteController.getFuelQuoteHistory(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ fuelQuoteHistory: mockFuelQuoteHistory });
  });

  test("should return a 404 user", async () => {
    const req = { query: { username: "baqir" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    mockUserFindOne.mockResolvedValue(null);

    await FuelQuoteController.getFuelQuoteHistory(req, res);

    expect(res.status).toBeCalledWith(404);
    expect(res.json).toBeCalledWith({ error: "User not found" });
  });

  test("should return a 500 status code and error message if there is an internal server error", async () => {
    const req = {};
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockError = new Error("Database connection failed");
    const mockFind = jest.spyOn(FuelQuote, "find");
    mockFind.mockRejectedValue(mockError);

    await FuelQuoteController.getFuelQuoteHistory(req, res);

    expect(res.status).toBeCalledWith(500);
    expect(res.json).toBeCalledWith({ error: "Internal Server Error" });

    mockFind.mockRestore(); // Restore the mock after the test
  });
});
