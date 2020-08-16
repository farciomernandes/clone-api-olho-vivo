"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var vehicles_routes_1 = __importDefault(require("../../../../modules/vehicles/infra/http/routes/vehicles.routes"));
var routes = express_1.Router();
routes.use('/vehicles', vehicles_routes_1.default);
exports.default = routes;
