"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Raspored = new Schema({
    takmicenje: {
        type: Number
    },
    nivo: {
        type: String
    },
    grupa: {
        type: Number
    },
    kolo: {
        type: Number
    },
    vremePocetka: {
        type: Date
    },
    lokacija: {
        type: String
    },
    sportisti: {
        type: Array
    },
    imenaSportista: {
        type: Array
    }
});
exports.default = mongoose_1.default.model('Raspored', Raspored, 'raspored');
//# sourceMappingURL=raspored.js.map