"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var Vehicle_1 = __importDefault(require("../modules/vehicles/infra/typeorm/entities/Vehicle"));
var VehiclePosition = /** @class */ (function () {
    function VehiclePosition() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], VehiclePosition.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], VehiclePosition.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], VehiclePosition.prototype, "vehicle_Id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Vehicle_1.default; }),
        typeorm_1.JoinColumn({ name: 'vehicleId' }),
        __metadata("design:type", Vehicle_1.default)
    ], VehiclePosition.prototype, "vehicleId", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], VehiclePosition.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], VehiclePosition.prototype, "updated_at", void 0);
    VehiclePosition = __decorate([
        typeorm_1.Entity('vehiclePosition')
    ], VehiclePosition);
    return VehiclePosition;
}());
exports.default = VehiclePosition;
