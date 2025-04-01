"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const combatSchema = new mongoose_1.Schema({
    date: {
        type: Date,
        required: true
    },
    gym: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Gym",
        required: true
    },
    boxers: [{
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "User",
            required: true
        }],
    isHidden: {
        type: Boolean,
        default: false
    }
});
const Combat = (0, mongoose_1.model)('Combat', combatSchema);
exports.default = Combat;
