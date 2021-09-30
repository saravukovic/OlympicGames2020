"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TakmicenjeController = void 0;
const takmicenje_1 = __importDefault(require("../models/takmicenje"));
const rekord_1 = __importDefault(require("../models/rekord"));
const raspored_1 = __importDefault(require("../models/raspored"));
const rezultat_1 = __importDefault(require("../models/rezultat"));
const grupa_1 = __importDefault(require("../models/grupa"));
const medalja_1 = __importDefault(require("../models/medalja"));
class TakmicenjeController {
    constructor() {
        this.dodajTakmicenje = (req, res) => {
            let takmicenje = new takmicenje_1.default(req.body);
            takmicenje.id = TakmicenjeController.idTak++;
            takmicenje.save().then((takmicenje) => {
                res.status(200).json({ 'poruka': 'takmicenje dodato' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dohvatiTakmicenjeZaDisciplinu = (req, res) => {
            let sport = req.body.sport;
            let disciplina = req.body.disciplina;
            let pol = req.body.pol;
            takmicenje_1.default.findOne({ "sport": sport, "disciplina": disciplina, "pol": pol }, (err, rekord) => {
                if (err)
                    console.log(err);
                else
                    res.json(rekord);
            });
        };
        this.dohvatiSvaTakmicenja = (req, res) => {
            takmicenje_1.default.find({}, (err, rekord) => {
                if (err)
                    console.log(err);
                else
                    res.json(rekord);
            });
        };
        this.zavrsiTakmicenje = (req, res) => {
            let id = req.body.id;
            takmicenje_1.default.collection.updateOne({ 'id': id }, { $set: { "zavrseno": true } });
        };
        this.dohvatiSveRekorde = (req, res) => {
            rekord_1.default.find({}, (err, rekord) => {
                if (err)
                    console.log(err);
                else
                    res.json(rekord);
            });
        };
        this.dohvatiSveRasporede = (req, res) => {
            raspored_1.default.find({}, (err, raspored) => {
                if (err)
                    console.log(err);
                else
                    res.json(raspored);
            });
        };
        this.dodajURaspored = (req, res) => {
            let raspored = new raspored_1.default(req.body);
            raspored.id = TakmicenjeController.idRas++;
            raspored.save().then((raspored) => {
                res.status(200).json({ 'poruka': 'dodato u raspored' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dohvatiMojaTakmicenja = (req, res) => {
            let korIme = req.body.korIme;
            takmicenje_1.default.find({ 'delegati': korIme }, (err, tak) => {
                if (err)
                    console.log(err);
                else {
                    res.json(tak);
                }
            });
        };
        this.dohvatiRezultateTakmicenja = (req, res) => {
            let id = req.body.id;
            rezultat_1.default.find({ 'idTakmicenja': id }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rez);
                }
            });
        };
        this.dohvatiRasporedTakmicenja = (req, res) => {
            let id = req.body.id;
            raspored_1.default.find({ 'takmicenje': id }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rez);
                }
            });
        };
        this.dodajRezultat = (req, res) => {
            let rezultat = new rezultat_1.default(req.body);
            rezultat.id = TakmicenjeController.idRez++;
            rezultat.save().then((rezultat) => {
                res.status(200).json({ 'poruka': 'dodat rezultat' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dohvatiRezultateZaNivo = (req, res) => {
            let id = req.body.id;
            let nivo = req.body.nivo;
            rezultat_1.default.find({ 'idTakmicenja': id, 'nivo': nivo }, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rez);
                }
            });
        };
        this.dohvatiSveRezultate = (req, res) => {
            rezultat_1.default.find({}, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rez);
                }
            });
        };
        this.dodajGrupu = (req, res) => {
            let grupa = new grupa_1.default(req.body);
            grupa.id = TakmicenjeController.idRez++;
            grupa.save().then((grupa) => {
                res.status(200).json({ 'poruka': 'dodata grupa' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dodahvatiSveGrupe = (req, res) => {
            grupa_1.default.find({}, (err, rez) => {
                if (err)
                    console.log(err);
                else {
                    res.json(rez);
                }
            });
        };
        this.dodajMedalju = (req, res) => {
            let medalja = new medalja_1.default(req.body);
            medalja.id = TakmicenjeController.idMed++;
            medalja.save().then((medalja) => {
                res.status(200).json({ 'poruka': 'dodata medalja' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
    }
}
exports.TakmicenjeController = TakmicenjeController;
TakmicenjeController.idTak = 0;
TakmicenjeController.idRas = 0;
TakmicenjeController.idRez = 0;
TakmicenjeController.idMed = 0;
//# sourceMappingURL=takmicenje.controller.js.map