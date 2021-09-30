export class Sportista{
    idSportiste:number;
    idVodje:string;
    sport:string;
    discipline:Array<string>;
    ime: string;
    prezime: string;
    pol:string;
    zemlja:string;
    brojMedalja:number;
    vrsta:string;
    rang:number;
    bodovi:number;
    nosilac:boolean;
    dodat:boolean = false;
    clanoviEkipe:Array<string>;
}