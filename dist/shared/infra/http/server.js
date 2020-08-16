"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
var express_1 = __importDefault(require("express"));
require("express-async-errors");
var cors_1 = __importDefault(require("cors"));
var routes_1 = __importDefault(require("./routes"));
require("../typeorm");
require("../../container");
var AppError_1 = __importDefault(require("../../errors/AppError"));
var app = express_1.default();
app.use(cors_1.default());
app.use(express_1.default.json());
app.use(routes_1.default);
app.use(
// eslint-disable-next-line @typescript-eslint/no-unused-vars
function (err, request, response, next) {
    if (err instanceof AppError_1.default) {
        return response.status(err.statusCode).json({
            status: 'error',
            message: err.message,
        });
    }
    return response.status(500).json({
        status: 'error',
        message: 'Internal server error',
    });
});
app.listen(3333, function () {
    console.log('Server started on port 3333!');
});
