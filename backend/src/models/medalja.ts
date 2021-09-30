import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Medalja = new Schema(
    {
        idMedalje: {
            type: Number
        },
        idSportiste:{
            type: Number
        },
        sport:{
            type: String
        },
        sportskaDisciplina:{
            type: String
        },
        mesto:{
            type: String
        }
    }
)

export default mongoose.model('Medalja', Medalja, 'medalje');