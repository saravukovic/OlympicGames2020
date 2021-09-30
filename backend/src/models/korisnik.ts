import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let Korisnik = new Schema(
    {
        korIme:{
            type:String
        },
        lozinka:{
            type:String
        },
        ime:{
            type:String
        },
        prezime:{
            type:String
        },
        nacionalnost:{
            type:String
        },
        mail:{
            type:String
        },
        tip:{
            type:String
        }
    }
)

export default mongoose.model('Korisnik', Korisnik, 'korisnik');