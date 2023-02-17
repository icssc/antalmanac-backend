"use strict";
/* eslint-disable no-console */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const mongoose_1 = __importDefault(require("mongoose"));
async function connect() {
    mongoose_1.default.connection.once('open', () => {
        console.log('Connected to MongoDB');
    });
    mongoose_1.default.connection.on('error', console.error.bind(console, 'Connection error:'));
    await mongoose_1.default.connect(process.env.AA_MONGODB_URI || '');
}
exports.default = connect;
