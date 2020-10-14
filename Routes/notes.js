const express = require('express');
const router = express.Router();
const Note = require('../Models/notes');
const auth = require('../Middleware/Auth');

router.get('/all', auth, async (req, res) => {
    try {
        const notes = await Note.find({ creator: req.user._id }).populate("creator", "name email")
        res.status(200).json({ notes })
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.post('/create', auth, async (req, res) => {
    const note = new Note(req.body)
    note.creator = req.user._id
    try {
        await note.save()
        res.status(200).json({ note })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.delete('/delete/:id', auth, async (req, res) => {
    try {
        const note = await Note.findByIdAndDelete(req.params.id)
        if (!note) {
            throw new Error()
        }
        res.status(200).send(note)
    } catch (e) {
        res.status(500).json({ error: "Something is wrong!" })
    }
})

module.exports = router;