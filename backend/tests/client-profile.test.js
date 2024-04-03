import ClientController from "../controllers/client-profile.controller";
import { jest, test, expect, describe } from "@jest/globals";

describe("clientProfile", () => {
  test("should return a 200 status code and the submitted client profile data", () => {
    const req = {
      body: {
        username: "matthewyohannes",
        fullName: "Matthew",
        address1: "123 unittest lane",
        address2: "",
        city: "university",
        state: "texas",
        zipcode: "12345",
        orders: [],
      },
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    ClientController.clientProfile(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({
        username: "matthewyohannes",
        fullName: "Matthew",
        address1: "123 unittest lane",
        address2: "",
        city: "university",
        state: "texas",
        zipcode: "12345",
        orders: [],
    });
  });

  test("should return a 400 status code for missing parameters", () => {
    const req = {
      body: {}, // Missing parameters
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    ClientController.clientProfile(req, res);

    expect(res.status).toBeCalledWith(400);
    expect(res.json).toBeCalledWith({
      error: "One or more required fields is missing",
    });
  });
});
