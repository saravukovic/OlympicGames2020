import mongoose from 'mongoose'
import Sport from './sport';

const Schema = mongoose.Schema;

let Rezultat = new Schema(
    {
        id: {
            type: Number
        },
        idSportiste: {
            type: Number
        },
        idTakmicenja: {
            type: Number
        },
        rezultat: {
            type: String
        },
        rang:{
            type:Number
        },
        nivo:{
            type:Number
        },
        kolo:{
            type:Number
        }
    }
)

export default mongoose.model('Rezultat', Rezultat, 'rezultat');