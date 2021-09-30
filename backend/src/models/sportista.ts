import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Sportista = new Schema(
    {
        idSportiste:{
            type: Number
        },
        idVodje:{
            type: String
        },
        sport:{
            type:String
        },
        discipline:{
            type:Array
        },
        ime:{
            type:String
        },
        prezime:{
            type:String
        },
        pol:{
            type:String
        },
        zemlja:{
            type:String
        },
        brojMedalja:{
            type: Number
        },
        vrsta:{
            type: String
        },
        clanoviEkipe:{
            type: Array
        },
        nosilac:{
            type:Boolean
        }
    }
)

export default mongoose.model('Sportista', Sportista, 'sportista');