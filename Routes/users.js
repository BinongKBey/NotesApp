const express = require('express');
const auth = require('../Middleware/Auth');
const router = express.Router();
const User = require('../Models/user');

router.get('/all', async (req, res) => {
    try {
        const users = await User.find()
        res.status(200).json(users)
    }
    catch (e) {
        res.status(500).send(e)
    }
})

router.get('/me', auth, async (req, res) => {
    res.status(200).json(req.user)
})

router.post('/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken()
        res.status(201).json({ user, token })
    } catch (e) {
        res.status(400).json({ error: "Unable to Login" })
    }

})

router.post('/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token != req.token
        })

        req.user.save()

        res.status(200).json({ message: "Sucessfully Logged out!" })
    } catch (e) {
        res.status(500).send()
    }
})

router.delete('/delete', auth, async (req, res) => {
    try {
        await req.user.remove();
        res.status(200).json({
            message: "User Deleted",
            user: req.user
        })
    } catch (e) {
        res.status(500).send(e)
    }
})

router.post('/logoutAll', auth, async (req, res) => {
    try {
        req.user.tokens = []
        req.user.save()

        res.status(200).json({ message: "Sucessfully Logged from all devices!" })
    } catch (e) {
        res.status(500).send()
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