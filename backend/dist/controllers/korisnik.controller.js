"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KorisnikController = void 0;
const korisnik_1 = __importDefault(require("../models/korisnik"));
const zahtevZaReg_1 = __importDefault(require("../models/zahtevZaReg"));
class KorisnikController {
    constructor() {
        this.prijava = (req, res) => {
            let korIme = req.body.korIme;
            let lozinka = req.body.lozinka;
            korisnik_1.default.findOne({ 'lozinka': lozinka, 'korIme': korIme }, (err, korisnik) => {
                if (err)
                    console.log('Greska');
                else {
                    res.json(korisnik);
                }
            });
        };
        this.registracija = (req, res) => {
            let zahtev = new zahtevZaReg_1.default(req.body);
            zahtev.id = KorisnikController.id++;
            zahtev.save().then((zahtev) => {
                res.status(200).json({ 'poruka': 'korisnik dodat' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dohvatiZahteveZaReg = (req, res) => {
            zahtevZaReg_1.default.find({}, (err, korImena) => {
                if (err)
                    console.log(err);
                else
                    res.json(korImena);
            });
        };
        this.odobriRegistraciju = (req, res) => {
            let korisnik = new korisnik_1.default(req.body);
            korisnik.save().then((korisnik) => {
                res.status(200).json({ 'poruka': 'korisnik dodat' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.ukloniZahtevZaRegistraciju = (req, res) => {
            let id = req.body.id;
            zahtevZaReg_1.default.collection.deleteOne({ "id": id });
            res.json({ 'poruka': 'zahtev uklonjen' });
        };
        this.dohvatiSveKorisnike = (req, res) => {
            korisnik_1.default.find({}, (err, korImena) => {
                if (err)
                    console.log(err);
                else
                    res.json(korImena);
            });
        };
        this.dohvatiSveDelegate = (req, res) => {
            korisnik_1.default.find({ "tip": "delegat" }, (err, korImena) => {
                if (err)
                    console.log(err);
                else
                    res.json(korImena);
            });
        };
        this.dohvatiKorisnika = (req, res) => {
            let korIme = req.body.korIme;
            korisnik_1.default.findOne({ "korIme": korIme }, (err, vodja) => {
                if (err)
                    console.log(err);
                else
                    res.json(vodja);
            });
        };
        this.azurirajLozinku = (req, res) => {
            let korIme = req.body.korIme;
            let lozinka = req.body.lozinka;
            korisnik_1.default.collection.updateOne({ "korIme": korIme }, { $set: { 'lozinka': lozinka } });
            res.json({ 'poruka': 'lozinka azurirana' });
        };
    }
}
exports.KorisnikController = KorisnikController;
KorisnikController.id = 7;
//# sourceMappingURL=korisnik.controller.js.map