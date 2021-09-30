"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Rekord = new Schema({
    id: {
        type: Number
    },
    godina: {
        type: Number
    },
    mesto: {
        type: String
    },
    sport: {
        type: String
    },
    disciplina: {
        type: String
    },
    imeIPrezime: {
        type: String
    },
    nacionalnost: {
        type: String
    },
    vremeDuzina: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Rekord', Rekord, 'rekord');
//# sourceMappingURL=rekord.js.map