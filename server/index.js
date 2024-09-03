const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require("./model/User");
const UserSubModel = require("./model/Subscription");
const PlanModel = require('./model/Plans');

dotenv.config();

const app = express();
app.use(express.json());

// CORS Configuration
const corsOptions = {
    origin: 'https://lunch-box-app.onrender.com', 
    credentials: true,            // access-control-allow-credentials:true
    optionsSuccessStatus: 200
};
app.use(cors(corsOptions));

// Database Connection
mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));

// Session Management
app.use(session({
    secret: process.env.SESSION_SECRET || "Never Mind",  // Use a secret from environment variables for better security
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

const port = process.env.PORT || 3001;

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

// Login Route
app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.user = { id: user._id, username: user.username };
                console.log(user.username);
                res.status(201).json("Success");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({ username, password: hashedPassword });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Plans Routes
app.get('/plans', async (req, res) => {
    try {
        const plans = await PlanModel.find({});
        res.json({ success: true, plans });
    } catch (error) {
        res.status(500).json({ success: false, message: "Unable to get the plans" });
    }
});

app.get('/plans/:id', async (req, res) => {
    try {
        const plan = await PlanModel.findById(req.params.id);
        if (plan) {
            res.json({ success: true, plan });
        } else {
            res.status(404).json({ success: false, message: "Plan not found" });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: "Unable to get the plan with id" });
    }
});

// Subscription Route
app.post("/subscription", async (req, res) => {
    try {
        const { name, number, person, address, subscription, food } = req.body;
        const newSubc = new UserSubModel({ name, number, person, address, subscription, food });
        const savedUserSub = await newSubc.save();
        res.status(201).json(savedUserSub);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Get Cart Route
app.get('/getCart', async (req, res) => {
    try {
        const cartItems = await UserSubModel.find();
        res.json({ success: true, cartItems });
    } catch (error) {
        res.status(500).json({ success: false, message: "Unable to get cart items" });
    }
});

// Logout Route
app.post("/logout", (req, res) => {
    if (req.session) {
        req.session.destroy(err => {
            if (err) {
                res.status(500).json({ error: "Failed to logout" });
            } else {
                res.status(200).json("Logout successful");
            }
        });
    } else {
        res.status(400).json({ error: "No session found" });
    }
});

// User Route
app.get('/user', (req, res) => {
     console.log('Session:', req.session);
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json("Not authenticated");
    }
});
