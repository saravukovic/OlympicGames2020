import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Grupa = new Schema(
    {
        niz:{
            type:Array
        },
        grupa:{
            type:Number
        },
        nivo:{
            type:Number
        },
        idTakmicenja:{
            type:Number
        }
    }
)

export default mongoose.model('Grupa', Grupa, 'grupa');