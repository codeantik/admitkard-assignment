const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.get('/', (req, res) => {
    res.send('server runnning')
})

router.get('/users/all', async (req, res) => {
    try {
        const users = await User.find();
        console.log(users);
        res.status(200).json({ users });
    }
    catch(err) {
        res.status(500).json({
            message: 'Problem occured while fetching users',
            err
        });
    }
})

router.get('/users/:email', async (req, res) => {

    const email = req.params.email;
    
    try {
        const users = await User.find({ email });
        res.json(users);
    }
    catch (err) {
        res.json({ message: err });
    }
})

router.post('/user/create', async (req, res) => {
    console.log(req.body);
    const user = new User(req.body);
    
    try {
        await user.save();
        res.status(201).json({
            message: 'User created',
            user
        })
    } catch (err) {
        console.log(err)
        res.status(500).json({
            message: 'User not created',
            err
        })
    }

})

router.put('/user/update', async (req, res) => {
    const email = req.body.email;

    try {
        const user = await User.findOneAndUpdate({ email }, { $set: req.body });
        res.status(200).json({
            message: 'User updated',
            user
        })
    } catch (err) {
        res.status(500).json({
            message: 'User not updated',
            err
        })
    }
})

module.exports = router;