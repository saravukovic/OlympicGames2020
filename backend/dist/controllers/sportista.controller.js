"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportistaController = void 0;
const sportista_1 = __importDefault(require("../models/sportista"));
class SportistaController {
    constructor() {
        this.dohvatiSveSportiste = (req, res) => {
            sportista_1.default.find({}, (err, korImena) => {
                if (err)
                    console.log(err);
                else
                    res.json(korImena);
            });
        };
        this.postaviZaNosioca = (req, res) => {
            let id = req.body.idSportiste;
            sportista_1.default.collection.updateOne({ "idSportiste": id }, { $set: { "nosilac": true } });
            res.json({ 'poruka': 'dodata medalja' });
        };
        this.dodajMedalju = (req, res) => {
            let id = req.body.idSportiste;
            sportista_1.default.collection.updateOne({ "idSportiste": id }, { $inc: { "brojMedalja": 1 } });
            res.json({ 'poruka': 'dodata medalja' });
        };
        this.dodajSportistu = (req, res) => {
            let sportista = new sportista_1.default(req.body);
            sportista.save().then((sport) => {
                res.status(200).json({ 'poruka': 'sportista dodat' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dodajSportistuUEkipu = (req, res) => {
            let id = req.body.idSportiste;
            let imeIPrezime = req.body.imeIPrezime;
            sportista_1.default.collection.updateOne({ "idSportiste": id }, { $push: { "clanoviEkipe": imeIPrezime } });
            res.json({ 'poruka': 'dodat sportista' });
        };
        this.dohvatiEkipe = (req, res) => {
            let id = req.body.idVodje;
            sportista_1.default.find({ "vrsta": "ekipa", "idVodje": id }, (err, ekipe) => {
                if (err)
                    console.log(err);
                else
                    res.json(ekipe);
            });
        };
        this.dodajDisciplinuSportisti = (req, res) => {
            let id = req.body.idSportiste;
            let disciplina = req.body.disciplina;
            sportista_1.default.collection.updateOne({ "idSportiste": id }, { $push: { "discipline": disciplina } });
            res.json({ 'poruka': 'dodata disciplina' });
        };
        this.dohvatiMojeSportiste = (req, res) => {
            let idVodje = req.body.idVodje;
            sportista_1.default.find({ "idVodje": idVodje }, (err, ekipe) => {
                if (err)
                    console.log(err);
                else
                    res.json(ekipe);
            });
        };
    }
}
exports.SportistaController = SportistaController;
//# sourceMappingURL=sportista.controller.js.map