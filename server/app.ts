import express from "express";
const cors = require("cors");
const cookieParse = require("cookie-parser");
import { MiddleWareFn } from "./src/interfaces/MiddleWareFn";
import userRoute from "./src/routes/userRoute";
import globalHandleError from "./src/controller/errorController";
import { addMessage, getAllChat } from "./src/utils/getData";
const http = require("http");
import { Server } from "socket.io";

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
app.use(globalHandleError);
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
const connectedUsers = new Map();
io.on("connection", (socket) => {
  console.log("Have someone!!", socket.id);
  connectedUsers.set(socket.id, { lastActive: Date.now() });
  socket.on(
    "send-message-from-client",
    async (data: { message: string; jwtToken: string; convId: number }) => {
      const message = await addMessage(
        data.message,
        data.jwtToken,
        data.convId
      );
      io.sockets.emit("send-message-from-server", message);
    }
  );
  socket.on("disconnect", (reason) => {
    console.log("Disconnect", socket.id);
    connectedUsers.delete(socket.id);
  });

  socket.on("getChatData", async ({ jwtToken }) => {
    const res = await getAllChat(jwtToken);
    socket.emit("returnAllChat", res);
  });
});
export default server;
