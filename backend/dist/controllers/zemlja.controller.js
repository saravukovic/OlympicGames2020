"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ZemljaController = void 0;
const zemlja_1 = __importDefault(require("../models/zemlja"));
const medalja_1 = __importDefault(require("../models/medalja"));
class ZemljaController {
    constructor() {
        this.dohvatiSveZemlje = (req, res) => {
            zemlja_1.default.find({}, (err, zemlje) => {
                if (err)
                    console.log(err);
                else
                    res.json(zemlje);
            });
        };
        this.dohvatiSveMedalje = (req, res) => {
            medalja_1.default.find({}, (err, medalje) => {
                if (err)
                    console.log(err);
                else
                    res.json(medalje);
            });
        };
        this.dodajMedalju = (req, res) => {
            let naziv = req.body.naziv;
            if (req.body.mesto == 1)
                zemlja_1.default.collection.updateOne({ "naziv": naziv }, { $inc: { "zlatne": 1, "ukupno": 1 } });
            else if (req.body.mesto == 2)
                zemlja_1.default.collection.updateOne({ "naziv": naziv }, { $inc: { "srebrne": 1, "ukupno": 1 } });
            else if (req.body.mesto == 3)
                zemlja_1.default.collection.updateOne({ "naziv": naziv }, { $inc: { "bronzane": 1, "ukupno": 1 } });
            res.json({ 'poruka': 'dodata medalja' });
        };
    }
}
exports.ZemljaController = ZemljaController;
//# sourceMappingURL=zemlja.controller.js.map