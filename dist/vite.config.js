"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const vite_1 = require("vite");
const vite_plugin_node_1 = require("vite-plugin-node");
const path_1 = __importDefault(require("path"));
exports.default = (0, vite_1.defineConfig)({
    plugins: [
        ...(0, vite_plugin_node_1.VitePluginNode)({
            appPath: path_1.default.resolve(__dirname, './src/index.ts'),
            appName: 'antalmanac',
            adapter: 'express',
        }),
    ],
    resolve: {
        alias: {
            $lib: path_1.default.resolve(__dirname, './src/lib'),
            $models: path_1.default.resolve(__dirname, './src/lib'),
        },
    },
});
