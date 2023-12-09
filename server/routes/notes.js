// routes/notes.js

var express = require('express');
var router = express.Router();
const { Note, TeamMember } = require('../models'); // Import Note and TeamMember models

// Add a new note
router.post('/', async (req, res) => {
  try {
    const { date, speakerId, content } = req.body;
    const newNote = await Note.create({ date, speakerId, content });
    res.json(newNote);
  } catch (error) {
    console.error("Error adding note:", error);
    res.status(500).send("Error adding note");
  }
});

// Get notes for a specific date
router.get('/:date', async (req, res) => {
  try {
    const notes = await Note.findAll({
      where: { date: req.params.date },
      include: [TeamMember]
    });
    res.json(notes);
  } catch (error) {
    console.error("Error fetching notes:", error);
    res.status(500).send("Error fetching notes");
  }
});

router.delete('/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const noteToDelete = await Note.findByPk(noteId);

    if (!noteToDelete) {
      return res.status(404).send("Note not found");
    }

    await noteToDelete.destroy();
    res.send("Note deleted");
  } catch (error) {
    console.error("Error deleting note:", error);
    res.status(500).send("Error deleting note");
  }
});

router.put('/:noteId', async (req, res) => {
  try {
    const noteId = req.params.noteId;
    const { content } = req.body; // Assuming you're only updating the content

    const noteToUpdate = await Note.findByPk(noteId);

    if (!noteToUpdate) {
      return res.status(404).send("Note not found");
    }

    noteToUpdate.content = content; // Update the content of the note
    await noteToUpdate.save(); // Save the updated note

    res.json(noteToUpdate); // Send back the updated note
  } catch (error) {
    console.error("Error updating note:", error);
    res.status(500).send("Error updating note");
  }
});


module.exports = router;
