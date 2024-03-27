import express from "express";
import { MiddleWareFn } from "./interfaces/MiddleWareFn";
const app = express();
app.get("/", <MiddleWareFn>((req, res, next) => {
  res.status(200).send("Hello from the server ??!!!");
}));
export default app;
