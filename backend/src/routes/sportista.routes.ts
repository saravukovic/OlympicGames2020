import express from 'express'
import { SportistaController } from '../controllers/sportista.controller';

const sportistaRouter = express.Router();

sportistaRouter.route('/dohvatiSveSportiste').get((req,res)=>{
    new SportistaController().dohvatiSveSportiste(req, res);
})

sportistaRouter.route('/dodajMedalju').post((req,res)=>{
    new SportistaController().dodajMedalju(req, res);
})

sportistaRouter.route('/postaviZaNosioca').post((req,res)=>{
    new SportistaController().postaviZaNosioca(req, res);
})

sportistaRouter.route('/dodajSportistu').post((req,res)=>{
    new SportistaController().dodajSportistu(req, res);
})

sportistaRouter.route('/dodajSportistuUEkipu').post((req,res)=>{
    new SportistaController().dodajSportistuUEkipu(req, res);
})

sportistaRouter.route('/dohvatiEkipe').post((req,res)=>{
    new SportistaController().dohvatiEkipe(req, res);
})

sportistaRouter.route('/dodajDisciplinuSportisti').post((req,res)=>{
    new SportistaController().dodajDisciplinuSportisti(req, res);
})

sportistaRouter.route('/dohvatiMojeSportiste').post((req,res)=>{
    new SportistaController().dohvatiMojeSportiste(req, res);
})

export default sportistaRouter;