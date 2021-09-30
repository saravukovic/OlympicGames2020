import express from 'express'
import { SportController } from '../controllers/sport.controller';

const sportRouter = express.Router();

sportRouter.route('/dodajSport').post((req,res)=>{
    new SportController().dodajSport(req, res);
})

sportRouter.route('/dohvatiSveSportove').get((req,res)=>{
    new SportController().dohvatiSveSportove(req, res);
})

export default sportRouter;