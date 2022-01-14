const mongoose = require("mongoose");
const Schema = mongoose.Schema;

let TestSchema = new Schema({
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

module.exports = mongoose.model("Test", TestSchema);