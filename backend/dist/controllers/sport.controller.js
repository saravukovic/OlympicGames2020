"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SportController = void 0;
const sport_1 = __importDefault(require("../models/sport"));
class SportController {
    constructor() {
        this.dodajSport = (req, res) => {
            let sport = new sport_1.default(req.body);
            sport.save().then((sport) => {
                res.status(200).json({ 'poruka': 'sport dodat' });
            }).catch((err) => {
                res.status(400).json({ 'poruka': err });
            });
        };
        this.dohvatiSveSportove = (req, res) => {
            sport_1.default.find({}, (err, sportovi) => {
                if (err)
                    console.log(err);
                else
                    res.json(sportovi);
            });
        };
        /* prijava = (req: express.Request, res: express.Response) =>{
             let korIme = req.body.korIme;
             let lozinka = req.body.lozinka;
     
             Korisnik.findOne({'lozinka':lozinka, 'korIme':korIme},(err,korisnik)=>{
                 if(err) console.log('Greska');
                 else{
                     res.json(korisnik);
                 }
             })
         }
     
         registracija = (req: express.Request, res: express.Response) =>{
             let zahtev = new ZahtevZaReg(req.body);
             zahtev.id = this.id++;
             zahtev.save().then((zahtev)=>{
                 res.status(200).json({'poruka':'korisnik dodat'});
             }).catch((err)=>{
                 res.status(400).json({'poruka':err});
             })
         }
     
         dohvatiSveKorisnike = (req: express.Request, res: express.Response) =>{
             Korisnik.find({}, (err, korImena)=>{
                 if(err) console.log(err);
                 else res.json(korImena);
             })
         }*/
    }
}
exports.SportController = SportController;
//# sourceMappingURL=sport.controller.js.map