const users = [{ username: "baqir", password: "salim" }];

class LoginController {
  static login(req, res) {
    const { username, password } = req.body;

    const user = users.find(
      (user) => user.username === username && user.password === password
    );

    if (user) {
      res.status(200).json({ message: "Login successful" });
    } else {
      res
        .status(401)
        .json({ error: "Incorrect username or password " + username });
    }
  }

  static register(req, res) {
    const { username, password } = req.body;

    if (username.length == 0 || password.length == 0) {
      res.status(401).json({ error: "Username or password not long enough" });
    } else {
      users.push({ username: username, password: password });
      res.status(200).json({ message: "Registration successful" });
    }
  }
}

export default LoginController;
