import mongoose from 'mongoose'
import express from 'express'
import Takmicenje from '../models/takmicenje';
import Rekord from '../models/rekord';
import Raspored from '../models/raspored';
import Rezultat from '../models/rezultat';
import Grupa from '../models/grupa';
import Medalja from '../models/medalja';

export class TakmicenjeController {
    static idTak = 0;
    static idRas = 0;
    static idRez = 0;
    static idMed = 0;

    dodajTakmicenje = (req: express.Request, res: express.Response) => {
        let takmicenje = new Takmicenje(req.body);
        takmicenje.id = TakmicenjeController.idTak++;
        takmicenje.save().then((takmicenje) => {
            res.status(200).json({ 'poruka': 'takmicenje dodato' });
        }).catch((err) => {
            res.status(400).json({ 'poruka': err });
        })
    }

    dohvatiTakmicenjeZaDisciplinu = (req: express.Request, res: express.Response) => {
        let sport = req.body.sport;
        let disciplina = req.body.disciplina;
        let pol = req.body.pol
        Takmicenje.findOne({"sport":sport, "disciplina":disciplina, "pol":pol}, (err, rekord) => {
            if (err) console.log(err);
            else res.json(rekord);
        })
    }

    dohvatiSvaTakmicenja = (req: express.Request, res: express.Response) => {
        Takmicenje.find({}, (err, rekord) => {
            if (err) console.log(err);
            else res.json(rekord);
        })
    }

    zavrsiTakmicenje = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        Takmicenje.collection.updateOne({'id':id},{$set:{"zavrseno":true}});
    }

    dohvatiSveRekorde = (req: express.Request, res: express.Response) => {
        Rekord.find({}, (err, rekord) => {
            if (err) console.log(err);
            else res.json(rekord);
        })
    }

    dohvatiSveRasporede = (req: express.Request, res: express.Response) => {
        Raspored.find({}, (err, raspored) => {
            if (err) console.log(err);
            else res.json(raspored);
        })
    }

    dodajURaspored = (req: express.Request, res: express.Response) => {
        let raspored = new Raspored(req.body);
        raspored.id = TakmicenjeController.idRas++;
        raspored.save().then((raspored) => {
            res.status(200).json({ 'poruka': 'dodato u raspored' });
        }).catch((err) => {
            res.status(400).json({ 'poruka': err });
        })
    }

    dohvatiMojaTakmicenja = (req: express.Request, res: express.Response) => {
        let korIme = req.body.korIme;
        Takmicenje.find({'delegati':korIme},(err, tak)=>{
            if(err) console.log(err);
            else {
                res.json(tak)
            }
        })
    }

    dohvatiRezultateTakmicenja = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        Rezultat.find({'idTakmicenja':id},(err, rez)=>{
            if(err) console.log(err);
            else {
                res.json(rez)
            }
        })
    }

    dohvatiRasporedTakmicenja = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        Raspored.find({'takmicenje':id},(err, rez)=>{
            if(err) console.log(err);
            else {
                res.json(rez)
            }
        })
    }

    dodajRezultat = (req: express.Request, res: express.Response) => {
        let rezultat = new Rezultat(req.body);
        rezultat.id = TakmicenjeController.idRez++;
        rezultat.save().then((rezultat) => {
            res.status(200).json({ 'poruka': 'dodat rezultat' });
        }).catch((err) => {
            res.status(400).json({ 'poruka': err });
        })
    }

    dohvatiRezultateZaNivo = (req: express.Request, res: express.Response) => {
        let id = req.body.id;
        let nivo = req.body.nivo;
        Rezultat.find({'idTakmicenja':id, 'nivo':nivo},(err, rez)=>{
            if(err) console.log(err);
            else {
                res.json(rez)
            }
        })
    }

    dohvatiSveRezultate = (req: express.Request, res: express.Response) => {
        Rezultat.find({},(err, rez)=>{
            if(err) console.log(err);
            else {
                res.json(rez)
            }
        })
    }

    dodajGrupu = (req: express.Request, res: express.Response) => {
        let grupa = new Grupa(req.body);
        grupa.id = TakmicenjeController.idRez++;
        grupa.save().then((grupa) => {
            res.status(200).json({ 'poruka': 'dodata grupa' });
        }).catch((err) => {
            res.status(400).json({ 'poruka': err });
        })
    }

    dodahvatiSveGrupe = (req: express.Request, res: express.Response) => {
        Grupa.find({},(err, rez)=>{
            if(err) console.log(err);
            else {
                res.json(rez)
            }
        })
    }

    dodajMedalju = (req: express.Request, res: express.Response) => {
        let medalja = new Medalja(req.body);
        medalja.id = TakmicenjeController.idMed++;
        medalja.save().then((medalja) => {
            res.status(200).json({ 'poruka': 'dodata medalja' });
        }).catch((err) => {
            res.status(400).json({ 'poruka': err });
        })
    }

}