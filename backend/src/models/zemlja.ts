import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Zemlja = new Schema(
    {
        zastava:{
            type:String
        },
        naziv:{
            type:String
        },
        brojSportista:{
            type:Number
        },
        rang: {
            type: Number
        },
        medalje:{
            type: Array
        },
        zlatne:{
            type: Number
        },
        srebrne:{
            type: Number
        },
        bronzane:{
            type: Number
        },
        ukupno:{
            type: Number
        }
    }
)

export default mongoose.model('Zemlja', Zemlja, 'zemlja');