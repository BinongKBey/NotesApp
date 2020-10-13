const express = require('express');
const router = express.Router();
const User = require('../Models/user');

router.get('/all', async (req, res) => {
    try {
        const users = await User.find().select("name -_id email")
        res.status(200).json(users)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.status(201).json({ user, token })
    } catch (e) {
        res.status(400).send("unable to login")
    }

})

router.post('/signup', async (req, res) => {
    const user = new User(req.body);
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).json({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }

})

module.exports = router;