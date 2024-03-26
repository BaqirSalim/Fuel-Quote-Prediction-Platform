import express from "express";
import clientRoutes from "./routes/client-profile.routes.js";
import loginRoutes from "./routes/login.routes.js";
import cors from "cors";
const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use("/client", clientRoutes);
app.use("/user", loginRoutes);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
