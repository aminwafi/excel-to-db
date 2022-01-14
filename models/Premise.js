const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

var PremiseSchema = new mongoose.Schema({
    name: String,
    entity: String,
    country: String,
    group: String,
    deletedAt: Date
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
    toJson: {
        virtuals: true
    }
});

module.exports = mongoose.model('Premise', PremiseSchema);