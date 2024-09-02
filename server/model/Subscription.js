const mongoose = require("mongoose");
// const { default: Subcription } = require("../../priceworth/src/components/Subcription");

const UserSubSchema = new mongoose.Schema({

    // _customerId:{
    //         type : mongoose.Schema.Types.ObjectId,
    //         ref : 'users',
    //         required : true
    // },
    name:String,
    number: Number,
    person: Number,
    address: String,
    subcription: String,
    food:String
})

const UserSubModel = mongoose.model("subscription", UserSubSchema);

module.exports = UserSubModel;