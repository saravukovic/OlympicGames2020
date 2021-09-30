import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Takmicenje = new Schema(
    {
        id: {
            type: Number
        },
        sport: {
            type: String
        },
        disciplina: {
            type: String
        },
        pol: {
            type: String
        },
        format: {
            type: String
        },
        datumPocetka: {
            type: Date
        },
        datumKraja: {
            type: Date
        },
        lokacije: {
            type: Array
        },
        vrsta: {
            type: String
        },
        takmicari: {
            type: Array
        },
        zavrseno:{
            type:Boolean
        },
        delegati: {
            type: Array
        }
    }
)

export default mongoose.model('Takmicenje', Takmicenje, 'takmicenje');