import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Raspored = new Schema(
    {
        takmicenje: {
            type:Number
        },
        nivo:{
            type:String
        },
        grupa:{
            type:Number
        },
        kolo:{
            type:Number
        },
        vremePocetka:{
            type:Date
        },
        lokacija:{
            type:String
        },
        sportisti:{
            type:Array
        },
        imenaSportista:{
            type:Array
        }
    }
)


export default mongoose.model('Raspored', Raspored, 'raspored');