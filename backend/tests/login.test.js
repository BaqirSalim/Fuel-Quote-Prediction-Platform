import LoginController from "../controllers/login.controller";
import { jest, test, expect, describe } from "@jest/globals";

describe("login", () => {
  test("valid credentials result in a valid login", () => {
    const req = { body: { username: "baqir", password: "salim" } }; //this is a valid login
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //we are mocking status as it is assigned 200 upon successful login and we're mocking json as it is assigned the valid login message

    LoginController.login(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ message: "Login successful" });
  });

  test("invalid credentials result in a 401 error", () => {
    const req = { body: { username: "baqir", password: "sal" } }; //this is a valid login
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //we are mocking status as it is assigned 401 upon unsuccessful login and we're mocking json as it is assigned the invalid login message

    LoginController.login(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      error: "Incorrect username or password",
    });
  });

  test("Empty credentials result in a 402 error", () => {
    const req = { body: { username: "", password: "" } }; //this is a valid login
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //we are mocking status as it is assigned 402 upon empty login and we're mocking json as it is assigned the empty login message

    LoginController.login(req, res);

    expect(res.status).toBeCalledWith(402);
    expect(res.json).toBeCalledWith({
      error: "Username or Password is empty",
    });
  });
});

describe("register", () => {
  test("Valid credentials result in a valid registration", () => {
    const req = { body: { username: "akash", password: "nelson" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    LoginController.register(req, res);

    expect(res.status).toBeCalledWith(200);
    expect(res.json).toBeCalledWith({ message: "Registration successful" });
  });

  test("Duplicate username results in 402 error", () => {
    const req = { body: { username: "baqir", password: "sal" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    LoginController.register(req, res);

    expect(res.status).toBeCalledWith(402);
    expect(res.json).toBeCalledWith({ error: "Username not available" });
  });

  test("Empty password results in a 401 error", () => {
    const req = { body: { username: "akash", password: "" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    LoginController.register(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      error: "Username or password not long enough",
    });
  });

  test("Empty username results in a 401 error", () => {
    const req = { body: { username: "", password: "nelson" } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };

    LoginController.register(req, res);

    expect(res.status).toBeCalledWith(401);
    expect(res.json).toBeCalledWith({
      error: "Username or password not long enough",
    });
  });
});
