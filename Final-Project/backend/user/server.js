require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');

const app = express();
const port = 4000;

// MongoDB setup
const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

// Connect to MongoDB
async function connectToMongoDB() {
    try {
        await client.connect();
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('Failed to connect to MongoDB', err);
        process.exit(1);
    }
}

// Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Signup API
app.post('/signup', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).send('Username and password are required');
    }

    const usersCollection = client.db("/userdatadb").collection("users");

    const existingUser = await usersCollection.findOne({ username });
    if (existingUser) {
        return res.status(400).send('User already exists');
    }

    await usersCollection.insertOne({ username, password }); // WARNING: Storing passwords as plain text is insecure
    res.status(201).send('User created');
});

// Login API
app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    const usersCollection = client.db("userdatadb").collection("users");

    const user = await usersCollection.findOne({ username, password });

    if (user) {
        res.send({ message: 'Login successful', user });
    } else {
        res.status(401).send('Invalid credentials');
    }
});

// Start the server and connect to MongoDB
connectToMongoDB().then(() => {
    app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
});
