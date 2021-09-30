import express from 'express'
import { ZemljaController } from '../controllers/zemlja.controller';

const zemljaRouter = express.Router();

zemljaRouter.route('/dohvatiSveZemlje').get((req,res)=>{
    new ZemljaController().dohvatiSveZemlje(req, res);
})

zemljaRouter.route('/dodajMedalju').post((req,res)=>{
    new ZemljaController().dodajMedalju(req, res);
})

export default zemljaRouter;