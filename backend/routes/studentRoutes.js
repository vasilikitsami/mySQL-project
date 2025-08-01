import express from "express";
import {
  fetchAllStudents,
  fetchStudent,
  addStudent,
  removeStudent,
  removeAllStudents,
  modifyStudent,
  fetchStudentsByCourse,
  searchStudent,
  enrollStudentInCourse,
} from "../controllers/studentController.js";

const router = express.Router();

router.get("/course/:courseId", fetchStudentsByCourse);
router.get("/search", searchStudent);
router.get("/", fetchAllStudents);
router.get("/:id", fetchStudent);
router.post("/", addStudent);
router.delete("/:id", removeStudent);
router.delete("/", removeAllStudents);
router.put("/:id", modifyStudent);
router.post("/assign", enrollStudentInCourse);

export default router;
