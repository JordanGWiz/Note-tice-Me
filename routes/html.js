const express = require("express");
const path = require("path");
const router = express.Router();

// Route to serve the notes.html file when the user accesses the /notes URL
router.get("/notes", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/notes.html"));
});

// Catch-all route to serve the index.html file for any other URL patterns
router.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/index.html"));
});

module.exports = router;
