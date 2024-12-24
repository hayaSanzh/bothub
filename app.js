const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser')
const registerRoute = require('./routes/register.route.js');
const loginRoute = require('./routes/login.route.js');
const feedbacksRoute = require('./routes/feedbacks.route.js');
const { getUser, getLoggedUser, getUserFront } = require('./controllers/login.controller.js');
const app = express();


app.use(express.json());
app.use('/auth', express.static(path.join(__dirname, '/public/auth')));
app.use('/feedbacks', express.static(path.join(__dirname, '/public/main')))
app.use(bodyParser.urlencoded({ extended: true }));

// routes
app.use('/register', registerRoute);
app.use('/login', loginRoute);
app.use('/api/feedbacks', feedbacksRoute);
app.use('/api/loggedUser', getUserFront);

// db connection
mongoose.connect('mongodb+srv://admin:admin@platzi.uqhhv.mongodb.net/BotHub?retryWrites=true&w=majority&appName=platzi')
.then(() => {
    console.log('Connected to database');
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
    
})
.catch(() => {
    console.log('DB connection failed');
})