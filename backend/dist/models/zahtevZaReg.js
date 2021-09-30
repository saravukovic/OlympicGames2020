"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let ZahtevZaReg = new Schema({
    id: {
        type: String
    },
    korIme: {
        type: String
    },
    lozinka: {
        type: String
    },
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    nacionalnost: {
        type: String
    },
    mail: {
        type: String
    },
    tip: {
        type: String
    }
});
exports.default = mongoose_1.default.model('ZahtevZaReg', ZahtevZaReg, 'zahtevZaReg');
//# sourceMappingURL=zahtevZaReg.js.map