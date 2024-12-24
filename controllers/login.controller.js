const User = require('../models/user.model.js')
const path = require('path');
const bodyParser = require('body-parser')
let loggedUser = null;

// GET method for logging into accout
const getUser = async (req, res) => {
    try {
        const { email, password } = req.query;
        const user = await User.findOne({email: email});
        if(user && user.email === email && user.password === password) {
            loggedUser = await User.findOne({email: email});
            res.redirect('/feedbacks')
        } else {
            res.send(`
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>User Not Found or Password is incorrect</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 0;
            background-color: #f9f9f9;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
        }

        .error-container {
            background: white;
            padding: 20px;
            box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
            border-radius: 8px;
            width: 100%;
            max-width: 400px;
            text-align: center;
        }

        h1 {
            color: #D32F2F;
            margin-bottom: 20px;
        }

        p {
            color: #555;
            margin-bottom: 20px;
        }

        button {
            padding: 10px;
            background-color: #4CAF50;
            color: white;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }

        button:hover {
            background-color: #45a049;
        }

        a {
            color: #4CAF50;
            text-decoration: none;
            font-weight: bold;
        }

        a:hover {
            text-decoration: underline;
        }
    </style>
</head>
<body>

<div class="error-container">
    <h1>User Not Found or Password is incorrect</h1>
    <p>The email address you entered is not associated with any account or your password is incorrect. Please try again or create a new account.</p>
    <p><a href="/auth">Back to Login</a></p>
</div>

</body>
</html>
    
            `)
        }
    } catch(error) {
        res.status(500).json({message: error.message});
    }
};

const getLoggedUser = () => loggedUser;
const getUserFront = async ( req, res ) => {
    try {
        res.status(200).json(loggedUser);
    } catch (err) {
        res.status(404).json({message: err.message});
    }
} 

module.exports = {
    getUser,
    getLoggedUser,
    getUserFront
};