import { pool } from "../db/index.js";

const addStudent = async (req, res) => {
  const { name, age, grade } = req.body;
  try {
    const result = await pool.query(
      "INSERT INTO students (name, age, grade) VALUES ($1, $2, $3) RETURNING *",
      [name, age, grade]
    );
    res
      .status(201)
      .json({ message: "Student added successfully", student: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const getAllStudents = async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM students");
    res.status(200).json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const updateStudent = async (req, res) => {
  const { id } = req.params;
  const { grade } = req.body;
  try {
    const result = await pool.query(
      "UPDATE students SET grade = $1 WHERE id = $2 RETURNING *",
      [grade, id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student grade updated", student: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const removeStudent = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query(
      "DELETE FROM students WHERE id = $1 RETURNING *",
      [id]
    );
    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Student not found" });
    }
    res.json({ message: "Student deleted", student: result.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export { addStudent, getAllStudents, removeStudent, updateStudent };
