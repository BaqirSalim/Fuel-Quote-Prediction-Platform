import PricingController from "../controllers/pricing.controller";
import { jest, test, expect, describe } from "@jest/globals";

describe("pricing", () => {
  test("empty location results in 401 error", () => {
    const req = {
      body: { location: "", recurringClient: true, gallonsRequested: 10 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    PricingController.generateSuggestedPrice(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      error: "Location field empty",
    });
  });

  test("empty recurringClient results in 402 error", () => {
    const req = {
      body: { location: "TX", gallonsRequested: 10 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    PricingController.generateSuggestedPrice(req, res);

    expect(res.status).toBeCalledWith(402);
    expect(res.json).toBeCalledWith({
      error: "Recurring client not inputted",
    });
  });

  test("proper input results in proper answer", () => {
    const req = {
      body: { location: "TX", recurringClient: true, gallonsRequested: 10 },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    PricingController.generateSuggestedPrice(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
      suggestedPrice: 1.71,
      totalAmount: 17.1,
    });
  });
});
