const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
const User = require('./models/user.model.js');
require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 5000;

// db config
mongoose
    .connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    .then(() => console.log('MongoDB Connected'))

// middleware

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));


// routes

app.get('/', (req, res) => {
    res.send('server runnning')
})

app.get('/users/all', async (req, res) => {
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

app.get('/users/:email', async (req, res) => {

    const email = req.params.email;
    
    try {
        const users = await User.find({ email });
        res.json(users);
    }
    catch (err) {
        res.json({ message: err });
    }
})

app.post('/user/create', async (req, res) => {
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

app.put('/user/update', async (req, res) => {
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



app.listen(PORT, () => {
    console.log(`server running on http://localhost:${PORT}`)
})