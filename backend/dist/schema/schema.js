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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Details = exports.Person = void 0;
const type_graphql_1 = require("type-graphql");
let Person = class Person {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Person.prototype, "name", void 0);
__decorate([
    (0, type_graphql_1.Field)(type => [Details]),
    __metadata("design:type", Array)
], Person.prototype, "details", void 0);
Person = __decorate([
    (0, type_graphql_1.ObjectType)()
], Person);
exports.Person = Person;
let Details = class Details {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Details.prototype, "gender", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Details.prototype, "nationality", void 0);
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", String)
], Details.prototype, "probability", void 0);
Details = __decorate([
    (0, type_graphql_1.ObjectType)()
], Details);
exports.Details = Details;
//# sourceMappingURL=schema.js.map