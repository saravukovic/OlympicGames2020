"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const takmicenje_controller_1 = require("../controllers/takmicenje.controller");
const takmicenjeRouter = express_1.default.Router();
takmicenjeRouter.route('/dodajTakmicenje').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dodajTakmicenje(req, res);
});
takmicenjeRouter.route('/dohvatiSvaTakmicenja').get((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiSvaTakmicenja(req, res);
});
takmicenjeRouter.route('/dohvatiSveRekorde').get((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiSveRekorde(req, res);
});
takmicenjeRouter.route('/dohvatiSveRasporede').get((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiSveRasporede(req, res);
});
takmicenjeRouter.route('/dodajURaspored').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dodajURaspored(req, res);
});
takmicenjeRouter.route('/dohvatiMojaTakmicenja').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiMojaTakmicenja(req, res);
});
takmicenjeRouter.route('/dohvatiRezultateTakmicenja').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiRezultateTakmicenja(req, res);
});
takmicenjeRouter.route('/dohvatiRasporedTakmicenja').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiRasporedTakmicenja(req, res);
});
takmicenjeRouter.route('/dodajRezultat').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dodajRezultat(req, res);
});
takmicenjeRouter.route('/dohvatiRezultateZaNivo').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiRezultateZaNivo(req, res);
});
takmicenjeRouter.route('/dohvatiSveRezultate').get((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiSveRezultate(req, res);
});
takmicenjeRouter.route('/dodajGrupu').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dodajGrupu(req, res);
});
takmicenjeRouter.route('/dodahvatiSveGrupe').get((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dodahvatiSveGrupe(req, res);
});
takmicenjeRouter.route('/dodajMedalju').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dodajMedalju(req, res);
});
takmicenjeRouter.route('/zavrsiTakmicenje').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().zavrsiTakmicenje(req, res);
});
takmicenjeRouter.route('/dohvatiTakmicenjeZaDisciplinu').post((req, res) => {
    new takmicenje_controller_1.TakmicenjeController().dohvatiTakmicenjeZaDisciplinu(req, res);
});
exports.default = takmicenjeRouter;
//# sourceMappingURL=takmicenje.routes.js.map