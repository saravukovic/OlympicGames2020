import express from 'express'
import { TakmicenjeController } from '../controllers/takmicenje.controller';

const takmicenjeRouter = express.Router();

takmicenjeRouter.route('/dodajTakmicenje').post((req,res)=>{
    new TakmicenjeController().dodajTakmicenje(req, res);
})

takmicenjeRouter.route('/dohvatiSvaTakmicenja').get((req,res)=>{
    new TakmicenjeController().dohvatiSvaTakmicenja(req, res);
})

takmicenjeRouter.route('/dohvatiSveRekorde').get((req,res)=>{
    new TakmicenjeController().dohvatiSveRekorde(req, res);
})

takmicenjeRouter.route('/dohvatiSveRasporede').get((req,res)=>{
    new TakmicenjeController().dohvatiSveRasporede(req, res);
})

takmicenjeRouter.route('/dodajURaspored').post((req,res)=>{
    new TakmicenjeController().dodajURaspored(req, res);
})

takmicenjeRouter.route('/dohvatiMojaTakmicenja').post((req,res)=>{
    new TakmicenjeController().dohvatiMojaTakmicenja(req, res);
})

takmicenjeRouter.route('/dohvatiRezultateTakmicenja').post((req,res)=>{
    new TakmicenjeController().dohvatiRezultateTakmicenja(req, res);
})

takmicenjeRouter.route('/dohvatiRasporedTakmicenja').post((req,res)=>{
    new TakmicenjeController().dohvatiRasporedTakmicenja(req, res);
})

takmicenjeRouter.route('/dodajRezultat').post((req,res)=>{
    new TakmicenjeController().dodajRezultat(req, res);
})

takmicenjeRouter.route('/dohvatiRezultateZaNivo').post((req,res)=>{
    new TakmicenjeController().dohvatiRezultateZaNivo(req, res);
})


takmicenjeRouter.route('/dohvatiSveRezultate').get((req,res)=>{
    new TakmicenjeController().dohvatiSveRezultate(req, res);
})

takmicenjeRouter.route('/dodajGrupu').post((req,res)=>{
    new TakmicenjeController().dodajGrupu(req, res);
})

takmicenjeRouter.route('/dodahvatiSveGrupe').get((req,res)=>{
    new TakmicenjeController().dodahvatiSveGrupe(req, res);
})

takmicenjeRouter.route('/dodajMedalju').post((req,res)=>{
    new TakmicenjeController().dodajMedalju(req, res);
})

takmicenjeRouter.route('/zavrsiTakmicenje').post((req,res)=>{
    new TakmicenjeController().zavrsiTakmicenje(req, res);
})

takmicenjeRouter.route('/dohvatiTakmicenjeZaDisciplinu').post((req,res)=>{
    new TakmicenjeController().dohvatiTakmicenjeZaDisciplinu(req, res);
})

export default takmicenjeRouter;