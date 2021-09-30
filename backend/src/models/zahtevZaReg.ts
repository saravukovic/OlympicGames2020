import mongoose from 'mongoose'

const Schema = mongoose.Schema;

let ZahtevZaReg = new Schema(
    {
        id:{
            type:String
        },
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

export default mongoose.model('ZahtevZaReg', ZahtevZaReg, 'zahtevZaReg');