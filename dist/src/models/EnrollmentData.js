"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const EnrollmentData = new mongoose_1.default.Schema({
    quarter: String,
    sectionCode: String,
    year: String,
    data: [
        {
            date: String,
            maxCapacity: String,
            numCurrentlyEnrolled: String,
            numOnWaitlist: String,
            numRequested: String,
            restrictions: String,
        },
    ],
});
exports.default = mongoose_1.default.model('EnrollmentData', EnrollmentData, 'enrollment_data');
