import express from 'express'
import { KorisnikController } from '../controllers/korisnik.controller';

const korisnikRouter = express.Router();

korisnikRouter.route('/prijava').post((req,res)=>{
    new KorisnikController().prijava(req, res);
})

korisnikRouter.route('/registracija').post((req,res)=>{
    new KorisnikController().registracija(req, res);
})

korisnikRouter.route('/dohvatiSveKorisnike').get((req,res)=>{
    new KorisnikController().dohvatiSveKorisnike(req, res);
})

korisnikRouter.route('/dohvatiSveDelegate').get((req,res)=>{
    new KorisnikController().dohvatiSveDelegate(req, res);
})

korisnikRouter.route('/dohvatiKorisnika').post((req,res)=>{
    new KorisnikController().dohvatiKorisnika(req, res);
})

korisnikRouter.route('/dohvatiZahteveZaReg').get((req,res)=>{
    new KorisnikController().dohvatiZahteveZaReg(req, res);
})

korisnikRouter.route('/odobriRegistraciju').post((req,res)=>{
    new KorisnikController().odobriRegistraciju(req, res);
})

korisnikRouter.route('/ukloniZahtevZaRegistraciju').post((req,res)=>{
    new KorisnikController().ukloniZahtevZaRegistraciju(req, res);
})

korisnikRouter.route('/azurirajLozinku').post((req,res)=>{
    new KorisnikController().azurirajLozinku(req, res);
})

export default korisnikRouter;