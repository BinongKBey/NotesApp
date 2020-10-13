const express = require('express');
const router = express.Router();
const Note = require('../Models/notes');

router.get('/all', async (req, res) => {
    try {
        const notes = await Note.find()
        res.status(200).json({ notes })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.post('/create', async (req, res) => {
    const note = new Note(req.body)
    try {
        await note.save()
        res.status(200).json({ note })
    } catch (e) {
        res.status(500).send(e)
    }
})

module.exports = router;