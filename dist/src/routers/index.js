"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
const websocApi = __importStar(require("websoc-api"));
const trpc_1 = require("../trpc");
const EnrollmentData_1 = __importDefault(require("$lib/models/EnrollmentData"));
const News_1 = __importDefault(require("$lib/models/News"));
const Notification_1 = __importDefault(require("$lib/models/Notification"));
const User_1 = __importDefault(require("$lib/models/User"));
const enrollmentSchema = zod_1.z.object({
    pastTerm: zod_1.z.string(),
    year: zod_1.z.string(),
    sectionCode: zod_1.z.string(),
});
const notificationSchema = zod_1.z.object({
    phoneNumber: zod_1.z.string(),
    sectionCode: zod_1.z.string(),
    courseTitle: zod_1.z.string(),
});
const userDataSchema = zod_1.z.object({
    userId: zod_1.z.string(),
    userData: zod_1.z.any(),
});
const appRouter = (0, trpc_1.router)({
    '': trpc_1.procedure.query(() => {
        return 'HELLO, GAMER';
    }),
    news: trpc_1.procedure.query(async () => {
        const news = await News_1.default.find();
        return news;
    }),
    getAd: trpc_1.procedure.input(zod_1.z.string()).query(async ({ input }) => {
        return `Your ad is ${input}`;
    }),
    getRandomAd: trpc_1.procedure.query(async () => {
        return `Your random ad is ${Math.random()}`;
    }),
    findEnrollmentData: trpc_1.procedure.input(enrollmentSchema).query(async ({ input }) => {
        const quarter = input.pastTerm.split(' ')[1].toLowerCase();
        const year = input.pastTerm.split(' ')[0];
        const sectionCode = input.sectionCode;
        const enrollmentData = await EnrollmentData_1.default.find({ quarter, year, sectionCode });
        return enrollmentData;
    }),
    registerNotification: trpc_1.procedure.input(notificationSchema).mutation(async ({ input }) => {
        const notification = await Notification_1.default.findOneAndUpdate({ sectionCode: input.sectionCode, phoneNumber: input.phoneNumber }, { $addToSet: { phoneNumbers: input.phoneNumber } }, { upsert: true });
        return notification;
    }),
    findNotifications: trpc_1.procedure.input(zod_1.z.string()).query(async ({ input }) => {
        const data = await Notification_1.default.find({ phoneNumbers: input });
        const smsNotificationsList = data.map((section) => {
            return { sectionCode: section.sectionCode, courseTitle: section.courseTitle };
        });
        return smsNotificationsList;
    }),
    loadUserData: trpc_1.procedure.input(zod_1.z.string()).query(async ({ input }) => {
        const data = await User_1.default.findById(input);
        return data;
    }),
    saveUserData: trpc_1.procedure.input(userDataSchema).mutation(async ({ input }) => {
        const { userId, userData } = input;
        await User_1.default.findByIdAndUpdate(userId, { $set: { _id: userId, userData: userData } }, { upsert: true });
    }),
    websoc: trpc_1.procedure.input(zod_1.z.any()).query(async ({ input }) => {
        const data = await websocApi.callWebSocAPI(input);
        return data;
    }),
});
exports.default = appRouter;
