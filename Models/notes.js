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
    },
    creator: {
        type: mongoose.ObjectId,
        ref: 'User',
        required: true
    }
}, { timestamps: true })

const Note = mongoose.model('Notes', noteSchema)

module.exports = Note