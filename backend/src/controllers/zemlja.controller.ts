import mongoose from "mongoose";
import express from "express";
import Zemlja from "../models/zemlja";
import Medalja from "../models/medalja";

export class ZemljaController{

    dohvatiSveZemlje = (req: express.Request, res: express.Response) =>{
        Zemlja.find({}, (err, zemlje)=>{
            if(err) console.log(err);
            else res.json(zemlje);
        })
    }

    dohvatiSveMedalje = (req: express.Request, res: express.Response) =>{
        Medalja.find({}, (err, medalje)=>{
            if(err) console.log(err);
            else res.json(medalje);
        })
    }
    
    dodajMedalju = (req: express.Request, res: express.Response) =>{
        let naziv = req.body.naziv;
        if(req.body.mesto==1) Zemlja.collection.updateOne({"naziv":naziv},{ $inc:{"zlatne":1,"ukupno":1}});
        else if(req.body.mesto==2) Zemlja.collection.updateOne({"naziv":naziv},{ $inc:{"srebrne":1,"ukupno":1}});
        else if(req.body.mesto==3) Zemlja.collection.updateOne({"naziv":naziv},{ $inc:{"bronzane":1,"ukupno":1}});
        res.json({'poruka':'dodata medalja'});
    }
}