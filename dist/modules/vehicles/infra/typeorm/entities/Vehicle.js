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
var Line_1 = __importDefault(require("../../../../../entities/Line"));
var Vehicle = /** @class */ (function () {
    function Vehicle() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], Vehicle.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicle.prototype, "name", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicle.prototype, "model", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], Vehicle.prototype, "line_id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Line_1.default; }),
        typeorm_1.JoinColumn({ name: 'lineId' }),
        __metadata("design:type", Line_1.default)
    ], Vehicle.prototype, "lineId", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Vehicle.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], Vehicle.prototype, "updated_at", void 0);
    Vehicle = __decorate([
        typeorm_1.Entity('vehicles')
    ], Vehicle);
    return Vehicle;
}());
exports.default = Vehicle;
