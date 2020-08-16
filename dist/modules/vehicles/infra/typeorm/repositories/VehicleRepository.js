"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Vehicle_1 = __importDefault(require("../entities/Vehicle"));
var AppError_1 = __importDefault(require("../../../../../shared/errors/AppError"));
var VehicleRepositoy = /** @class */ (function () {
    function VehicleRepositoy() {
        this.ormRepository = typeorm_1.getRepository(Vehicle_1.default);
    }
    VehicleRepositoy.prototype.create = function (_a) {
        var line_id = _a.line_id, name = _a.name, model = _a.model;
        return __awaiter(this, void 0, void 0, function () {
            var vehicle;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        vehicle = this.ormRepository.create({
                            name: name,
                            model: model,
                        });
                        vehicle.line_id = line_id;
                        return [4 /*yield*/, this.ormRepository.save(vehicle)];
                    case 1:
                        _b.sent();
                        return [2 /*return*/, vehicle];
                }
            });
        });
    };
    VehicleRepositoy.prototype.delete = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne({
                            where: { id: id },
                        })];
                    case 1:
                        vehicle = _a.sent();
                        if (!vehicle) {
                            throw new AppError_1.default('This Vehicle is not exist !');
                        }
                        return [4 /*yield*/, this.ormRepository.remove(vehicle)];
                    case 2:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    VehicleRepositoy.prototype.findById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var vehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne({
                            where: { id: id },
                        })];
                    case 1:
                        vehicle = _a.sent();
                        return [2 /*return*/, vehicle || undefined];
                }
            });
        });
    };
    VehicleRepositoy.prototype.getAll = function () {
        return __awaiter(this, void 0, void 0, function () {
            var vehicles;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.find()];
                    case 1:
                        vehicles = _a.sent();
                        return [2 /*return*/, vehicles];
                }
            });
        });
    };
    VehicleRepositoy.prototype.update = function (id, data) {
        return __awaiter(this, void 0, void 0, function () {
            var searchVehicle, vehicle;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.ormRepository.findOne({
                            where: { id: id },
                        })];
                    case 1:
                        searchVehicle = _a.sent();
                        if (!searchVehicle) {
                            throw new AppError_1.default('Id not found! ');
                        }
                        vehicle = __assign({ data: data }, searchVehicle);
                        return [2 /*return*/, vehicle];
                }
            });
        });
    };
    return VehicleRepositoy;
}());
exports.default = VehicleRepositoy;
