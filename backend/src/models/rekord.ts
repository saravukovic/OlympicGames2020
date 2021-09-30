import mongoose from 'mongoose'
import Sport from './sport';

const Schema = mongoose.Schema;

let Rekord = new Schema(
    {
        id: {
            type: Number
        },
        godina: {
            type: Number
        },
        mesto: {
            type: String
        },
        sport:{
            type: String
        },
        disciplina:{
            type: String
        },
        imeIPrezime: {
            type: String
        },
        nacionalnost: {
            type: String
        },
        vremeDuzina: {
            type: String
        }
    }
)

export default mongoose.model('Rekord', Rekord, 'rekord');