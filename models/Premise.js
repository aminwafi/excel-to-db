const mongoose = require("mongoose");
const Schema = mongoose.Schema;

var PremiseSchema = new Schema({
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

module.exports = mongoose.model('Premise', PremiseSchema, "Premises");