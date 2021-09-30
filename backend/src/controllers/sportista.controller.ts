import mongoose from 'mongoose'
import express from 'express'
import Sportista from '../models/sportista';
export class SportistaController{
    

    dohvatiSveSportiste = (req: express.Request, res: express.Response) =>{
        Sportista.find({}, (err, korImena)=>{
            if(err) console.log(err);
            else res.json(korImena);
        })
    }

    postaviZaNosioca = (req: express.Request, res: express.Response) =>{
        let id = req.body.idSportiste;
        Sportista.collection.updateOne({"idSportiste":id},{$set:{"nosilac":true}});
        res.json({'poruka':'dodata medalja'});
    }

    dodajMedalju = (req: express.Request, res: express.Response) =>{
        let id = req.body.idSportiste;
        Sportista.collection.updateOne({"idSportiste":id},{$inc:{"brojMedalja":1}});
        res.json({'poruka':'dodata medalja'});
    }

    dodajSportistu = (req: express.Request, res:express.Response) =>{
        let sportista = new Sportista(req.body);
        sportista.save().then((sport)=>{
            res.status(200).json({'poruka':'sportista dodat'});
        }).catch((err)=>{
            res.status(400).json({'poruka':err});
        })
    }

    dodajSportistuUEkipu = (req: express.Request, res:express.Response) =>{
        let id = req.body.idSportiste;
        let imeIPrezime = req.body.imeIPrezime
        Sportista.collection.updateOne({"idSportiste":id},{$push:{"clanoviEkipe":imeIPrezime}});
        res.json({'poruka':'dodat sportista'});
    }

    dohvatiEkipe = (req: express.Request, res:express.Response) =>{
        let id = req.body.idVodje;
        Sportista.find({"vrsta":"ekipa", "idVodje":id}, (err, ekipe)=>{
            if(err) console.log(err);
            else res.json(ekipe);
        })
    }

    dodajDisciplinuSportisti = (req: express.Request, res:express.Response) =>{
        let id = req.body.idSportiste;
        let disciplina = req.body.disciplina
        Sportista.collection.updateOne({"idSportiste":id},{$push:{"discipline":disciplina}});
        res.json({'poruka':'dodata disciplina'});
    }

    dohvatiMojeSportiste = (req: express.Request, res:express.Response) =>{
        let idVodje = req.body.idVodje
        Sportista.find({"idVodje":idVodje}, (err, ekipe)=>{
            if(err) console.log(err);
            else res.json(ekipe);
        })
      }

}