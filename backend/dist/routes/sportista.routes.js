"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const sportista_controller_1 = require("../controllers/sportista.controller");
const sportistaRouter = express_1.default.Router();
sportistaRouter.route('/dohvatiSveSportiste').get((req, res) => {
    new sportista_controller_1.SportistaController().dohvatiSveSportiste(req, res);
});
sportistaRouter.route('/dodajMedalju').post((req, res) => {
    new sportista_controller_1.SportistaController().dodajMedalju(req, res);
});
sportistaRouter.route('/postaviZaNosioca').post((req, res) => {
    new sportista_controller_1.SportistaController().postaviZaNosioca(req, res);
});
sportistaRouter.route('/dodajSportistu').post((req, res) => {
    new sportista_controller_1.SportistaController().dodajSportistu(req, res);
});
sportistaRouter.route('/dodajSportistuUEkipu').post((req, res) => {
    new sportista_controller_1.SportistaController().dodajSportistuUEkipu(req, res);
});
sportistaRouter.route('/dohvatiEkipe').post((req, res) => {
    new sportista_controller_1.SportistaController().dohvatiEkipe(req, res);
});
sportistaRouter.route('/dodajDisciplinuSportisti').post((req, res) => {
    new sportista_controller_1.SportistaController().dodajDisciplinuSportisti(req, res);
});
sportistaRouter.route('/dohvatiMojeSportiste').post((req, res) => {
    new sportista_controller_1.SportistaController().dohvatiMojeSportiste(req, res);
});
exports.default = sportistaRouter;
//# sourceMappingURL=sportista.routes.js.map