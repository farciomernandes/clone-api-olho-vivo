"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var tsyringe_1 = require("tsyringe");
var VehicleRepository_1 = __importDefault(require("../../modules/vehicles/infra/typeorm/repositories/VehicleRepository"));
tsyringe_1.container.registerSingleton('VehicleRepository', VehicleRepository_1.default);
