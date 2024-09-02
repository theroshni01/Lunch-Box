const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcrypt");
const dotenv = require("dotenv");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const UserModel = require("./model/User");
const UserSubModel = require("./model/Subscription")
const PlanModel = require('./model/Plans')

dotenv.config();
const app = express();
app.use(express.json());
app.use(cors({
    origin: 'https://lunch-box-app.onrender.com/', // Replace with your frontend's URL
    credentials: true
}));

  app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, 
    Accept, x-client-key, x-client-token, x-client-secret, Authorization");
      next();
    });

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Failed to connect to MongoDB', err));


app.use(session({
    secret: "Never Mind",
    resave: false,
    saveUninitialized: true,
    store: MongoStore.create({
        mongoUrl: process.env.MONGO_URI
    }),
    cookie: { maxAge: 24 * 60 * 60 * 1000 } // 1 day
}));

app.listen(process.env.URL, () => {
    console.log(`Server is running on ${process.env.URL}`);
});

app.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        const user = await UserModel.findOne({ username });
        if (user) {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (passwordMatch) {
                req.session.user = { id: user._id, username: user.username };
                // console.log(email);
                console.log(user.username);
                res.json("Success");
            } else {
                res.status(401).json("Password doesn't match");
            }
        } 
        else {
            const hashedPassword = await bcrypt.hash(password, 10);
            const newUser = new UserModel({ username, password: hashedPassword });
            const savedUser = await newUser.save();
            res.status(201).json(savedUser);
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/plans', async (req,res) =>
{
    try {
        const plans = await PlanModel.find({})
        // console.log(plans)
        res.json({
            success: true,
            plans
        })
    } 
    catch (error) {
        res.json({
            success: false,
            message: "Unable to get the plans"
        })
    }
})

app.get('/plans/:id', async (req,res) =>
{
    try {
        const plan = await PlanModel.findById(req.param.id)
        res.json({
            success: true,
            plan
        })
    } catch (error) {
        res.json({
            success: false,
            message: "Unable to get the plan with id"
        })
    }

})

app.post("/subscription", async (req, res) => {
    try {
        const { name, number, person, address, subcription, food} = req.body;
        const newSubc = new UserSubModel({ name, number, person, address, subcription, food });
        const savedUserSub = await newSubc.save();
        res.status(201).json(savedUserSub);
    } 
    catch (error) {
        res.status(500).json({ error: error.message });
    }
        
});

app.get('/getCart', (req, res) =>
{
    UserSubModel.find()
} )


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

app.get('/user', (req, res) => {
    if (req.session.user) {
        res.json({ user: req.session.user });
    } else {
        res.status(401).json("Not authenticated");
    }
});
