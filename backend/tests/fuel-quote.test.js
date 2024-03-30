import FuelQuoteController from "../controllers/fuel-quote.controller";
import { jest, test, expect, describe } from "@jest/globals";


describe("submitFuelQuote", () => {
    test("should return a 200 status code and the submitted fuel quote data", () => {
      const req = {
        body: {
          gallonsRequested: 100,
          deliveryAddress: "123 Main St",
          deliveryDate: "07/24/2024",
          suggestedPrice: 50
        }
      };
      const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };
  
      FuelQuoteController.submitFuelQuote(req, res);
  
      expect(res.status).toBeCalledWith(200);
      expect(res.json).toBeCalledWith({
        gallonsRequested: 100,
        deliveryAddress: "123 Main St",
        deliveryDate: "07/24/2024",
        suggestedPrice: 50
      });
    });
  
    test("should return a 400 status code for missing parameters", () => {
      const req = {
        body: {} // Missing parameters
      };
      const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };
  
      FuelQuoteController.submitFuelQuote(req, res);
  
      expect(res.status).toBeCalledWith(400);
      expect(res.json).toBeCalledWith({
        error: "All fields are required"
      });
    });
  
    
  });



  describe("getFuelQuoteHistory", () => {
    test("should return a 200 status code and the fuel quote history data", () => {
      const req = {};
      const res = { 
        status: jest.fn().mockReturnThis(), 
        json: jest.fn() 
      };
  
      FuelQuoteController.getFuelQuoteHistory(req, res);
  
      expect(res.status).toBeCalledWith(200);
      
      expect(res.json).toBeCalledWith({
        // expected fuel quote history data here
      });
    });
  });
  
  