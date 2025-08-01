import {
  getAllStudents,
  getStudentById,
  createStudent,
  deleteStudent,
  deleteAllStudents,
  updateStudent,
  getStudentsByCourse,
  searchStudents,
  assignStudentToCourse,
} from "../models/studentModel.js";

export async function fetchAllStudents(req, res) {
  const students = await getAllStudents();
  res.json(students);
}

export async function fetchStudent(req, res) {
  const { id } = req.params;
  const student = await getStudentById(id);
  if (student) res.json(student);
  else res.status(404).json({ error: "Student not found" });
}
export async function addStudent(req, res) {
  const { first_name, last_name } = req.body;
  const student = await createStudent(first_name, last_name);
  res.status(201).json(student);
}
export async function removeStudent(req, res) {
  const { id } = req.params;
  const deleted = await deleteStudent(id);
  if (deleted) res.json({ message: "Student deleted" });
  else res.status(404).json({ error: "Student not found" });
}

export async function removeAllStudents(req, res) {
  const count = await deleteAllStudents();
  res.json({ message: `Deleted ${count} student(s)` });
}

export async function modifyStudent(req, res) {
  const id = req.params.id;
  const { first_name, last_name } = req.body;

  if (!first_name && !last_name) {
    return res
      .status(400)
      .json({ error: "Please provide at least one field to update" });
  }

  const success = await updateStudent(id, first_name, last_name);
  if (success) {
    res.json({ message: "Student updated successfully" });
  } else {
    res.status(404).json({ error: "Student not found or nothing to update" });
  }
}
export async function fetchStudentsByCourse(req, res) {
  const { courseId } = req.params;
  try {
    const students = await getStudentsByCourse(courseId);
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function searchStudent(req, res) {
  const { id, first_name, last_name } = req.query;
  try {
    const students = await searchStudents({ id, first_name, last_name });
    res.json(students);
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
export async function enrollStudentInCourse(req, res) {
  const { student_id, course_id } = req.body;

  if (!student_id || !course_id) {
    return res
      .status(400)
      .json({ error: "student_id and course_id are required" });
  }

  try {
    const success = await assignStudentToCourse(student_id, course_id);
    if (success) {
      res
        .status(201)
        .json({ message: "Student assigned to course successfully" });
    } else {
      res.status(500).json({ error: "Failed to assign student to course" });
    }
  } catch (err) {
    res.status(500).json({ error: "Internal server error" });
  }
}
