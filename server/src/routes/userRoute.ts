const express = require("express");
const router = express.Router();
import {
  login,
  register,
  protect,
  getChatList,
} from "../controller/authController";
router.post("/login", login);
router.post("/register", register);
router.get("/chatlist", protect, getChatList);
export default router;
