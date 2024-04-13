import FuelQuoteController from "../controllers/fuel-quote.controller.js";
import FuelQuote from "../models/fuel-quote.model.js";
import { jest, test, expect, describe } from "@jest/globals";

describe("submitFuelQuote", () => {
    const mockCreate = jest.spyOn(FuelQuote, "create");

    test("should return a 200 status code and the submitted fuel quote data", async () => {
        const req = {
            body: {
                gallonsRequested: 100,
                deliveryAddress: "123 Main St",
                deliveryDate: "2024-07-24",
                suggestedPrice: 50
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockFuelQuote = {
            _id: "1234567890",
            gallonsRequested: 100,
            deliveryAddress: "123 Main St",
            deliveryDate: "2024-07-24",
            suggestedPrice: 50
        };

        mockCreate.mockResolvedValue(mockFuelQuote);

        await FuelQuoteController.submitFuelQuote(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ fuelquote: mockFuelQuote });
    });

    test("should return a 400 status code for missing parameters", async () => {
        const req = {
            body: {} // Missing parameters
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        await FuelQuoteController.submitFuelQuote(req, res);

        expect(res.status).toBeCalledWith(400);
        expect(res.json).toBeCalledWith({
            error: "All fields are required"
        });
    });

    test("should return a 500 status code and error message if there is an internal server error", async () => {
        const req = {
            body: {
                gallonsRequested: 100,
                deliveryAddress: "123 Main St",
                deliveryDate: "2024-07-24",
                suggestedPrice: 50
            }
        };
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockError = new Error("Database connection failed");
        const mockCreate = jest.spyOn(FuelQuote, "create");
        mockCreate.mockRejectedValue(mockError);

        await FuelQuoteController.submitFuelQuote(req, res);

        expect(res.status).toBeCalledWith(500);
        expect(res.json).toBeCalledWith({ error: "Internal Server Error" });

        mockCreate.mockRestore(); // Restore the mock after the test
    });

    afterAll(() => {
        mockCreate.mockRestore();
    });
});

describe("getFuelQuoteHistory", () => {
    test("should return a 200 status code and the fuel quote history data", async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
        };

        const mockFuelQuoteHistory = [
            {
                _id: "1234567890",
                gallonsRequested: 100,
                deliveryAddress: "123 Main St",
                deliveryDate: "2024-07-24",
                suggestedPrice: 50
            },
            //add more if i need to
        ];

        const mockFind = jest.spyOn(FuelQuote, "find");
        mockFind.mockResolvedValue(mockFuelQuoteHistory);

        await FuelQuoteController.getFuelQuoteHistory(req, res);

        expect(res.status).toBeCalledWith(200);
        expect(res.json).toBeCalledWith({ fuelQuoteHistory: mockFuelQuoteHistory });
    });

    test("should return a 500 status code and error message if there is an internal server error", async () => {
        const req = {};
        const res = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn()
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
