import { Router } from "express";
import {
  getAllSubjects,
  getSubjectById,
  createSubject,
  updateSubject,
  deleteSubject,
} from "../controllers/materias.controller.js";

const router = Router();

router.get("/", getAllSubjects);
router.get("/:id", getSubjectById);
router.post("/", createSubject);
router.put("/:id", updateSubject);
router.patch("/:id", updateSubject);
router.delete("/:id", deleteSubject);

export default router;
