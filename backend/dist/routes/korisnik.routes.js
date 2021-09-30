"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const korisnik_controller_1 = require("../controllers/korisnik.controller");
const korisnikRouter = express_1.default.Router();
korisnikRouter.route('/prijava').post((req, res) => {
    new korisnik_controller_1.KorisnikController().prijava(req, res);
});
korisnikRouter.route('/registracija').post((req, res) => {
    new korisnik_controller_1.KorisnikController().registracija(req, res);
});
korisnikRouter.route('/dohvatiSveKorisnike').get((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvatiSveKorisnike(req, res);
});
korisnikRouter.route('/dohvatiSveDelegate').get((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvatiSveDelegate(req, res);
});
korisnikRouter.route('/dohvatiKorisnika').post((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvatiKorisnika(req, res);
});
korisnikRouter.route('/dohvatiZahteveZaReg').get((req, res) => {
    new korisnik_controller_1.KorisnikController().dohvatiZahteveZaReg(req, res);
});
korisnikRouter.route('/odobriRegistraciju').post((req, res) => {
    new korisnik_controller_1.KorisnikController().odobriRegistraciju(req, res);
});
korisnikRouter.route('/ukloniZahtevZaRegistraciju').post((req, res) => {
    new korisnik_controller_1.KorisnikController().ukloniZahtevZaRegistraciju(req, res);
});
korisnikRouter.route('/azurirajLozinku').post((req, res) => {
    new korisnik_controller_1.KorisnikController().azurirajLozinku(req, res);
});
exports.default = korisnikRouter;
//# sourceMappingURL=korisnik.routes.js.map