import express from "express";
const cors = require("cors");
const cookieParse = require("cookie-parser");
import { MiddleWareFn } from "./src/interfaces/MiddleWareFn";
import userRoute from "./src/routes/userRoute";
const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    credentials: true,
  })
);
app.use(cookieParse());
app.use(express.json({ limit: "10kb" }));
app.use("/api/v1/users", userRoute);
app.get("/", <MiddleWareFn>((req, res, next) => {
  res.status(200).send("Hello from the server ??!!!");
}));
export default app;
