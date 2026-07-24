import { Router } from "express";
import { register, login } from "../controllers/auth.controller.js";

const router = Router();

router.get("/register", (req, res) => {
  res.send("Register route is working");
});

router.post("/register", register);
router.post("/login", login);

export default router;