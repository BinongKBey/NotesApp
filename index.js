const express = require('express');
const app = express();
const mongoose = require('mongoose');

const notesRoute = require('./Routes/notes');
const userRoute = require('./Routes/users');

require('dotenv').config()

const port = process.env.PORT || 7000;

mongoose.connect(process.env.DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}, () => {
    console.log("DB runninng")
})

app.use(express.json())

app.use('/user', userRoute);
app.use('/notes', notesRoute)

app.listen(port, () => {
    console.log("Server running in port ", port)
})

