import LoginController from "../controllers/login.controller";
import User from "../models/user.model";
import { jest, test, expect, describe } from "@jest/globals";

const mockFindOne = jest.spyOn(User, "findOne");
const mockCreate = jest.spyOn(User, "create");

describe("login", () => {
  test("session is assigned at valid login", async () => {
    const req = { body: { username: "baqir", password: "salim" } }; //this is a valid login
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    //we are mocking status as it is assigned 200 upon successful login and we're mocking json as it is assigned the valid login message

    const userMock = {
      id: "1234567890",
      username: "baqir",
      comparePasswords: jest.fn(() => true),
    };

    mockFindOne.mockResolvedValue(userMock);

    await LoginController.login(req, res);

    //this is to test that when the login is valid, the session is being properly assigned
    expect(res.send).toBeCalledWith({
      userId: "1234567890",
      username: "baqir",
    });
  });

  test("invalid credentials result in a 401 error", async () => {
    const req = { body: { username: "baqir", password: "sal" } }; //this is a valid login
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    //we are mocking status as it is assigned 401 upon unsuccessful login and we're mocking json as it is assigned the invalid login message

    const userMock = {
      comparePasswords: jest.fn(() => false),
    };

    mockFindOne.mockResolvedValue(userMock);

    await LoginController.login(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      error: "Incorrect username or password",
    });
  });

  test("Empty credentials result in a 402 error", async () => {
    const req = { body: { username: "", password: "" } }; //this is a valid login
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //we are mocking status as it is assigned 402 upon empty login and we're mocking json as it is assigned the empty login message

    const userMock = {
      comparePasswords: jest.fn(() => false),
    };

    mockFindOne.mockResolvedValue(userMock);

    await LoginController.login(req, res);

    expect(res.status).toBeCalledWith(402);
    expect(res.json).toBeCalledWith({
      error: "Username or Password is empty",
    });
  });
});

describe("register", () => {
  test("Valid credentials result in a valid registration", async () => {
    const req = { body: { username: "akash", password: "nelson" } };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };

    const userMock = {
      id: "1234567890",
      username: "baqir",
      save: jest.fn(),
    };

    mockCreate.mockResolvedValue(userMock);

    await LoginController.register(req, res);

    expect(res.send).toBeCalledWith({
      userId: "1234567890",
      username: "baqir",
    });
  });

  test("Duplicate username results in 401 error", async () => {
    const req = { body: { username: "baqir", password: "sal" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    const validationError = new Error("User validation failed");
    validationError.name = "ValidationError";
    validationError.errors = {
      username: {
        message: "Username already exists",
        kind: "user defined",
        path: "username",
        value: "existingUsername",
      },
    };

    mockCreate.mockRejectedValue(validationError);

    await LoginController.register(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({ error: "Username not available" });
  });

  test("Empty password results in a 402 error", () => {
    const req = { body: { username: "akash", password: "" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    LoginController.register(req, res);

    expect(res.status).toBeCalledWith(402);
    expect(res.json).toBeCalledWith({
      error: "Username or Password is empty",
    });
  });

  test("Empty username results in a 402 error", () => {
    const req = { body: { username: "", password: "nelson" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    LoginController.register(req, res);

    expect(res.status).toBeCalledWith(402);
    expect(res.json).toBeCalledWith({
      error: "Username or Password is empty",
    });
  });
});
