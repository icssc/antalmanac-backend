"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const NotificationSchema = new mongoose_1.default.Schema({
    sectionCode: String,
    courseTitle: String,
    phoneNumbers: [String],
});
exports.default = mongoose_1.default.model('Notification', NotificationSchema);
