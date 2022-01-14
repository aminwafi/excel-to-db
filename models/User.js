const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId;
const Schema = mongoose.Schema;

var userSchema = new Schema({
    email:  {
        type: String,
        unique: true
    },
    premise: {
        type: ObjectId,
        ref: 'Premise'
    },
    utilityTypes:   {
        type: mongoose.Mixed,
        default: {}
    },
    esgRole: String,
    adminRoles: [String],
    entity: String,
    country: String,
    group: String, 
}, {
    timestamps: {
        createdAt: true,
        updatedAt: true
    },
    toJson: {virtuals: true}
});

module.exports = mongoose.model('User', userSchema);