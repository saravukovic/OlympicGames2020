"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rezultat = new Schema({
    id: {
        type: Number
    },
    idSportiste: {
        type: Number
    },
    idTakmicenja: {
        type: Number
    },
    rezultat: {
        type: String
    },
    rang: {
        type: Number
    },
    nivo: {
        type: Number
    },
    kolo: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Rezultat', Rezultat, 'rezultat');
//# sourceMappingURL=rezultat.js.map