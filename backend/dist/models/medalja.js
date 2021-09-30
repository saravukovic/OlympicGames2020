"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Medalja = new Schema({
    idMedalje: {
        type: Number
    },
    idSportiste: {
        type: Number
    },
    sport: {
        type: String
    },
    sportskaDisciplina: {
        type: String
    },
    mesto: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Medalja', Medalja, 'medalje');
//# sourceMappingURL=medalja.js.map