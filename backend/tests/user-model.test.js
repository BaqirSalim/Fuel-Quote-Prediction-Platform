import User from "../models/user.model";
import bcrypt from "bcryptjs";
import { jest, test, expect, describe } from "@jest/globals";

const mockWhere = jest.spyOn(User, "where").mockReturnValue({
  countDocuments: jest.fn(), // Mock countDocuments function
});

const mockCountDocuments = jest.spyOn(mockWhere(), "countDocuments");

const mockCompareSync = jest.spyOn(bcrypt, "compareSync");

describe("user model", () => {
  test("No Duplicates", async () => {
    mockCountDocuments.mockResolvedValue(0);

    const result = await User.duplicates({ username: "baqir" });

    expect(result).toBe(true);
  });

  test("Duplicate Detected", async () => {
    mockCountDocuments.mockResolvedValue(1);

    const result = await User.duplicates({ username: "baqir" });

    expect(result).toBe(false);
  });
  test("Passwords are equal", () => {
    const user = new User({
      username: "baqir",
      password: "password",
    });

    mockCompareSync.mockReturnValue(true);

    const result = user.comparePasswords("password");

    expect(result).toBe(true);
  });

  test("Passwords are not equal", () => {
    const user = new User({
      username: "baqir",
      password: "password",
    });

    mockCompareSync.mockReturnValue(false);

    const result = user.comparePasswords("passwor");

    expect(result).toBe(false);
  });
});
