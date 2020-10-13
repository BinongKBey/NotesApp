const mongoose = require('mongoose')

const noteSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minlength: 3
    },
    content: {
        type: String,
        required: true,
        minlength: 3
    }
}, { timestamps: true })

const Note = mongoose.model('Notes', noteSchema)

module.exports = Note