import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import session from "express-session";
import MongoStore from "connect-mongo";

import clientRoutes from "./routes/client-profile.routes.js";
import loginRoutes from "./routes/login.routes.js";
import fuelRoutes from "./routes/fuel-quote.routes.js";

const app = express();
const port = 3000;

// sets up use for .env file variables
dotenv.config();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

// app's middleware
app.use(cors());
app.use(express.json());

// connects backend to MongoDB
mongoose
  .connect(process.env.MONGO_DB_URI)
  .then(() => {
    console.log("Connected to database!");
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(() => {
    console.log("Connection failed!");
  });

app.use(
  session({
    name: process.env.SESS_NAME,
    secret: process.env.SESS_SECRET,
    saveUninitialized: false,
    resave: false,
    store: MongoStore.create({
      client: mongoose.connection.getClient(),
    }),
    cookie: {
      sameSite: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: parseInt(process.env.SESS_LIFETIME),
    },
  })
);

app.use("/client", clientRoutes);
app.use("/user", loginRoutes);
app.use("/fuelquote", fuelRoutes);
