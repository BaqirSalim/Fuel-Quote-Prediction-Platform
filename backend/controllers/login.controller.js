import users from "../data/users.js";
class LoginController {
  static login(req, res) {
    const { username, password } = req.body;

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (!username || !password) {
      res.status(402).json({ error: "Username or Password is empty" });
    } else if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res.status(401).json({ error: "Incorrect username or password" });
    }
  }

  static register(req, res) {
    const { username, password } = req.body;

    const user = users.find((user) => user.username === username);

    if (username.length == 0 || password.length == 0) {
      res.status(401).json({ error: "Username or password not long enough" });
    } else if (user) {
      res.status(402).json({ error: "Username not available" });
    } else {
      users.push({
        username: username,
        password: password,
        fullName: "",
        address1: "",
        address2: "",
        city: "",
        state: "",
        zipcode: "",
        orders: [],
      });
      res.status(200).json({ message: "Registration successful" });
    }
  }
}

export default LoginController;
