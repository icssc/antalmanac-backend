"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const User = new mongoose_1.default.Schema({
    _id: String,
    userData: {
        addedCourses: [
            {
                color: String,
                term: String,
                sectionCode: String,
                scheduleIndices: [Number],
            },
        ],
        scheduleNames: { type: [String], default: ['Schedule 1', 'Schedule 2', 'Schedule 3', 'Schedule 4'] },
        customEvents: [
            {
                customEventID: String,
                color: String,
                title: String,
                days: [Boolean],
                scheduleIndices: [Number],
                start: String,
                end: String,
            },
        ],
    },
});
exports.default = mongoose_1.default.model('User', User);
