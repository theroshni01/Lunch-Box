const mongoose = require("mongoose");

const PlanSchema = new mongoose.Schema({

    title: String,
    category:String,
    text:String,
    price: Number
})

const PlanModel = mongoose.model("plans", PlanSchema);

module.exports = PlanModel;