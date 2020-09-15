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
var Appointment_1 = __importDefault(require("@modules/appointments/infra/typeorm/entities/Appointment"));
var Item_1 = __importDefault(require("@modules/items/infra/typeorm/entities/Item"));
var OrdersItems = /** @class */ (function () {
    function OrdersItems() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn('uuid'),
        __metadata("design:type", String)
    ], OrdersItems.prototype, "id", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Appointment_1.default; }, function (order) { return order.order_items; }),
        typeorm_1.JoinColumn({ name: 'appointment_id' }),
        __metadata("design:type", Appointment_1.default)
    ], OrdersItems.prototype, "order", void 0);
    __decorate([
        typeorm_1.ManyToOne(function () { return Item_1.default; }, function (item) { return item.order_items; }),
        typeorm_1.JoinColumn({ name: 'item_id' }),
        __metadata("design:type", Item_1.default)
    ], OrdersItems.prototype, "item", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], OrdersItems.prototype, "item_id", void 0);
    __decorate([
        typeorm_1.Column(),
        __metadata("design:type", String)
    ], OrdersItems.prototype, "appointment_id", void 0);
    __decorate([
        typeorm_1.Column('decimal'),
        __metadata("design:type", Number)
    ], OrdersItems.prototype, "price", void 0);
    __decorate([
        typeorm_1.Column('int'),
        __metadata("design:type", Number)
    ], OrdersItems.prototype, "quantity", void 0);
    __decorate([
        typeorm_1.CreateDateColumn(),
        __metadata("design:type", Date)
    ], OrdersItems.prototype, "created_at", void 0);
    __decorate([
        typeorm_1.UpdateDateColumn(),
        __metadata("design:type", Date)
    ], OrdersItems.prototype, "updated_at", void 0);
    OrdersItems = __decorate([
        typeorm_1.Entity('orders_items')
    ], OrdersItems);
    return OrdersItems;
}());
exports.default = OrdersItems;
