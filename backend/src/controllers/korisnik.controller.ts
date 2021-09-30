import mongoose from 'mongoose'
import express from 'express'
import Korisnik from '../models/korisnik';
import ZahtevZaReg from '../models/zahtevZaReg';
export class KorisnikController{
    static id:number = 7;

    prijava = (req: express.Request, res: express.Response) =>{
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
        zahtev.id = KorisnikController.id++;
        zahtev.save().then((zahtev)=>{
            res.status(200).json({'poruka':'korisnik dodat'});
        }).catch((err)=>{
            res.status(400).json({'poruka':err});
        })
    }

    dohvatiZahteveZaReg = (req: express.Request, res: express.Response) =>{
        ZahtevZaReg.find({}, (err, korImena)=>{
            if(err) console.log(err);
            else res.json(korImena);
        })
    }

    odobriRegistraciju = (req: express.Request, res: express.Response) =>{
        let korisnik = new Korisnik(req.body);
        korisnik.save().then((korisnik)=>{
            res.status(200).json({'poruka':'korisnik dodat'});
        }).catch((err)=>{
            res.status(400).json({'poruka':err});
        })
    }

    ukloniZahtevZaRegistraciju = (req: express.Request, res: express.Response) =>{
        let id = req.body.id
        ZahtevZaReg.collection.deleteOne({"id":id});
        res.json({'poruka':'zahtev uklonjen'});
    }

    dohvatiSveKorisnike = (req: express.Request, res: express.Response) =>{
        Korisnik.find({}, (err, korImena)=>{
            if(err) console.log(err);
            else res.json(korImena);
        })
    }

    dohvatiSveDelegate = (req: express.Request, res: express.Response) =>{
        Korisnik.find({"tip":"delegat"}, (err, korImena)=>{
            if(err) console.log(err);
            else res.json(korImena);
        })
    }

    dohvatiKorisnika = (req: express.Request, res: express.Response) =>{
        let korIme = req.body.korIme
        Korisnik.findOne({"korIme":korIme}, (err, vodja)=>{
            if(err) console.log(err);
            else res.json(vodja);
        })
    }

    azurirajLozinku = (req: express.Request, res: express.Response) =>{
        let korIme = req.body.korIme
        let lozinka = req.body.lozinka
        Korisnik.collection.updateOne({"korIme":korIme},{$set:{'lozinka':lozinka}});
        res.json({'poruka':'lozinka azurirana'});
    }


}