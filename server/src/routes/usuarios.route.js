import { Router } from "express";
import {
  getAllUsers,
  getUserByName,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/usuarios.controller.js";

const router = Router();

/* router.get("/allUser", getAllUsers); */
/* router.get("/:name", getUserByName); */
router.post("/create", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;