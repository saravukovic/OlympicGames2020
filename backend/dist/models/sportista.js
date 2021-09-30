"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Sportista = new Schema({
    idSportiste: {
        type: Number
    },
    idVodje: {
        type: String
    },
    sport: {
        type: String
    },
    discipline: {
        type: Array
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    pol: {
        type: String
    },
    zemlja: {
        type: String
    },
    brojMedalja: {
        type: Number
    },
    vrsta: {
        type: String
    },
    clanoviEkipe: {
        type: Array
    },
    nosilac: {
        type: Boolean
    }
});
exports.default = mongoose_1.default.model('Sportista', Sportista, 'sportista');
//# sourceMappingURL=sportista.js.map