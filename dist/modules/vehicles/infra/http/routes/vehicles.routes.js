"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var VehiclesController_1 = __importDefault(require("../controllers/VehiclesController"));
var vehiclesRouter = express_1.Router();
var vehiclesController = new VehiclesController_1.default();
vehiclesRouter.post('/create', vehiclesController.create);
vehiclesRouter.put('/update', vehiclesController.update);
vehiclesRouter.delete('/delete', vehiclesController.delete);
vehiclesRouter.get('/', vehiclesController.getAll);
vehiclesRouter.get('/search/:id', vehiclesController.findById);
exports.default = vehiclesRouter;
