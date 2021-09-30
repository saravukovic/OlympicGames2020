"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Grupa = new Schema({
    niz: {
        type: Array
    },
    grupa: {
        type: Number
    },
    nivo: {
        type: Number
    },
    idTakmicenja: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Grupa', Grupa, 'grupa');
//# sourceMappingURL=grupa.js.map