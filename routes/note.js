const express = require("express");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const router = express.Router();

// Reads the contents of db.json asynchronously
const readFromFile = (filePath) => fs.promises.readFile(filePath, "utf8");

// Writes data to db.json asynchronously
const writeToFile = (filePath, content) =>
  fs.promises.writeFile(filePath, JSON.stringify(content, null, 4));

// GET route for fetching all notes from db.json and returning them in JSON format
router.get("/", async (req, res) => {
  try {
    const data = await readFromFile(path.join(__dirname, "../db/db.json"));
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Error reading notes from file." });
  }
});

// POST route for adding a new note to db.json, and returning the newly added note
router.post("/", async (req, res) => {
  try {
    const { title, text } = req.body;
    const newNote = { id: uuidv4(), title, text };
    const data = await readFromFile(path.join(__dirname, "../db/db.json"));
    const notes = JSON.parse(data);
    notes.push(newNote);
    await writeToFile(path.join(__dirname, "../db/db.json"), notes);
    res.json(newNote);
  } catch (err) {
    res.status(500).json({ error: "Error saving the note." });
  }
});

// DELETE route for removing a note by its ID, and updating the db.json file accordingly
router.delete("/:id", async (req, res) => {
  try {
    const noteId = req.params.id;
    const data = await readFromFile(path.join(__dirname, "../db/db.json"));
    const notes = JSON.parse(data);
    const updatedNotes = notes.filter((note) => note.id !== noteId);
    await writeToFile(path.join(__dirname, "../db/db.json"), updatedNotes);
    res.json({ message: "Note successfully deleted." });
  } catch (err) {
    res.status(500).json({ error: "Error deleting the note." });
  }
});

module.exports = router;
