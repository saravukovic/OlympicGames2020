import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import korisnikRouter from './routes/korisnik.routes';
import zemljaRouter from './routes/zemlje.routes';
import sportistaRouter from './routes/sportista.routes';
import sportRouter from './routes/sport.routes';
import takmicenjeRouter from './routes/takmicenje.routes';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/olimpijada');
const connection = mongoose.connection;
connection.once('open', ()=>{
    console.log('mongo ok')
});

const router = express.Router();


router.use('/korisnik', korisnikRouter);
router.use('/zemlja', zemljaRouter);
router.use('/sportista', sportistaRouter);
router.use('/sport', sportRouter);
router.use('/takmicenje', takmicenjeRouter);


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));