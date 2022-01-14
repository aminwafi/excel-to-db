const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let UserSchema = new Schema({
    name: 
    {
        type: String,
        required: true,
    },
    age:
    {
        type: Number,
        default: 0
    },
});

module.exports = mongoose.model("User", UserSchema);