"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Zemlja = new Schema({
    zastava: {
        type: String
    },
    naziv: {
        type: String
    },
    brojSportista: {
        type: Number
    },
    rang: {
        type: Number
    },
    medalje: {
        type: Array
    },
    zlatne: {
        type: Number
    },
    srebrne: {
        type: Number
    },
    bronzane: {
        type: Number
    },
    ukupno: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Zemlja', Zemlja, 'zemlja');
//# sourceMappingURL=zemlja.js.map