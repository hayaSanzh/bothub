const User = require('../models/user.model.js')
const path = require('path');
const bodyParser = require('body-parser')

// POST method for creating a user
const createUser = async (req, res) => {
    try {
        const createdUser = await User.findOne({ email: req.body.email });
        if (createdUser) {
            res.send(`
                <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Email Already Exists</title>
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
    <h1>Email Already Exists</h1>
    <p>The email address you entered is already associated with an account. Please try logging in or use a different email to register.</p>
    <button onclick="redirectToLogin()">Go to Login</button>
</div>

<script>
    function redirectToLogin() {
        window.location.href = '/auth';
    }
</script>

</body>
</html>
    
            `)
        } else {
            const users = await User.find({});
            await User.create({id: users.length, email: req.body.email, password: req.body.password});
            res.redirect('/auth');
        }
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    createUser
};