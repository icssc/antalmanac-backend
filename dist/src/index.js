"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.antalmanac = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("$lib/db"));
const express_2 = require("@trpc/server/adapters/express");
const routers_1 = __importDefault(require("./routers"));
async function start() {
    await (0, db_1.default)();
    const app = (0, express_1.default)();
    app.use('/trpc', (0, express_2.createExpressMiddleware)({
        router: routers_1.default,
    }));
    app.listen(3000, async () => {
        // eslint-disable-next-line no-console
        console.log('Example app listening at http://localhost:3000');
    });
}
exports.antalmanac = start();
exports.default = exports.antalmanac;
