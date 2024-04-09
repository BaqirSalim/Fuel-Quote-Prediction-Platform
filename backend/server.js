import express from "express";
import mongoose from "mongoose"
import cors from "cors";

import clientRoutes from "./routes/client-profile.routes.js";
import loginRoutes from "./routes/login.routes.js";
import fuelRoutes from "./routes/fuel-quote.routes.js"


const app = express();
const port = 3000;

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use(cors());
app.use(express.json());
app.use("/client", clientRoutes);
app.use("/user", loginRoutes);
app.use("/fuelquote", fuelRoutes);

// MAKE SURE WE ADD ENV VARIABLES FOR THE USER AND PASSWORD HERE
mongoose.connect(
  "mongodb+srv://baamlogin4353:OHMPiYD6nkBdVL1x@cosc-4353-cluster.pdlclpo.mongodb.net/cosc-353-db?retryWrites=true&w=majority&appName=cosc-4353-cluster"
)
.then(() => {
  console.log("Connected to database!");
  app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
  });
})
.catch(() => {
  console.log("Connection failed!");
});