import mongoose from 'mongoose'
import express from 'express'
import Sport from '../models/sport';

export class SportController{

    dodajSport = (req:express.Request, res:express.Response) =>{
        let sport = new Sport(req.body);
        sport.save().then((sport)=>{
            res.status(200).json({'poruka':'sport dodat'});
        }).catch((err)=>{
            res.status(400).json({'poruka':err});
        })
    }

    dohvatiSveSportove = (req: express.Request, res: express.Response) =>{
        Sport.find({}, (err, sportovi)=>{
            if(err) console.log(err);
            else res.json(sportovi);
        })
    }

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