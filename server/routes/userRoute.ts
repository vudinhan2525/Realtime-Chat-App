const express = require("express");
const router = express.Router();
import { login, register } from "../controller/authController";
router.post("/login", login);
router.post("/register", register);
export default router;
