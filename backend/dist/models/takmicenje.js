"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Takmicenje = new Schema({
    id: {
        type: Number
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    pol: {
        type: String
    },
    format: {
        type: String
    },
    datumPocetka: {
        type: Date
    },
    datumKraja: {
        type: Date
    },
    lokacije: {
        type: Array
    },
    vrsta: {
        type: String
    },
    takmicari: {
        type: Array
    },
    zavrseno: {
        type: Boolean
    },
    delegati: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Takmicenje', Takmicenje, 'takmicenje');
//# sourceMappingURL=takmicenje.js.map