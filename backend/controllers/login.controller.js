const users = [{ username: "baqir", password: "salim" }];

export const login = async (req, res) => {
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
};
