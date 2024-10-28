const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const router = express.Router();
const dbPath = path.join(__dirname, '../db/db.json');

// GET /api/notes
router.get('/notes', (req, res) => {
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes.' });
        }
        res.json(JSON.parse(data));
    });
});

// POST /api/notes
router.post('/notes', (req, res) => {
    const newNote = { id: uuidv4(), ...req.body };
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes.' });
        }
        const notes = JSON.parse(data);
        notes.push(newNote);
        fs.writeFile(dbPath, JSON.stringify(notes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to save note.' });
            }
            res.json(newNote);
        });
    });
});

// DELETE /api/notes/:id
router.delete('/notes/:id', (req, res) => {
    const noteId = req.params.id;
    fs.readFile(dbPath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).json({ error: 'Failed to read notes.' });
        }
        const notes = JSON.parse(data);
        const updatedNotes = notes.filter(note => note.id !== noteId);
        fs.writeFile(dbPath, JSON.stringify(updatedNotes, null, 2), (err) => {
            if (err) {
                return res.status(500).json({ error: 'Failed to delete note.' });
            }
            res.json({ message: 'Note deleted.' });
        });
    });
});

module.exports = router;
