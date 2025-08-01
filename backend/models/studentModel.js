import pool from "../database.js";

export async function getAllStudents() {
  const [rows] = await pool.query("SELECT * FROM students");
  return rows;
}

export async function getStudentById(id) {
  const [rows] = await pool.query(
    "SELECT * FROM students WHERE student_id = ?",
    [id]
  );
  return rows[0];
}

export async function createStudent(first_name, last_name) {
  const [result] = await pool.query(
    "INSERT INTO students (first_name, last_name) VALUES (?, ?)",
    [first_name, last_name]
  );
  return getStudentById(result.insertId);
}

export async function deleteStudent(id) {
  const [result] = await pool.query(
    "DELETE FROM students WHERE student_id = ?",
    [id]
  );
  return result.affectedRows > 0;
}

export async function deleteAllStudents() {
  const [result] = await pool.query("DELETE FROM students");
  return result.affectedRows;
}

export async function updateStudent(id, first_name, last_name) {
  let fields = []; //stores the parts of the SET command
  let values = []; //stores the actual values to be inserted into the query placeholders

  if (first_name) {
    fields.push("first_name = ?");
    values.push(first_name);
  }

  if (last_name) {
    fields.push("last_name = ?");
    values.push(last_name);
  }

  if (fields.length === 0) return false;

  values.push(id); //add id for the WHERE command

  const [result] = await pool.query(
    `UPDATE students SET ${fields.join(", ")} WHERE student_id = ?`,
    values
  );

  return result.affectedRows > 0;
}
export async function getStudentsByCourse(courseId) {
  const [rows] = await pool.query(
    `SELECT s.student_id, s.first_name, s.last_name
     FROM students s
     JOIN student_courses sc ON s.student_id = sc.student_id
     WHERE sc.course_id = ?`,
    [courseId]
  );
  return rows;
}
export async function searchStudents({ id, first_name, last_name }) {
  let query = "SELECT * FROM students WHERE 1=1";
  const values = [];

  if (id) {
    query += " AND student_id = ?";
    values.push(id);
  }
  if (first_name) {
    query += " AND first_name LIKE ?";
    values.push(`%${first_name}%`);
  }
  if (last_name) {
    query += " AND last_name LIKE ?";
    values.push(`%${last_name}%`);
  }

  console.log("QUERY:", query);
  console.log("VALUES:", values);

  const [rows] = await pool.query(query, values);
  return rows;
}
export async function assignStudentToCourse(student_id, course_id) {
  const [result] = await pool.query(
    "INSERT INTO student_courses (student_id, course_id) VALUES (?, ?)",
    [student_id, course_id]
  );
  return result.affectedRows > 0;
}
