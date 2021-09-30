export class Takmicenje {
    id:number;
    sport: string;
    disciplina: string;
    pol: string;
    format: string;
    datumPocetka: Date;
    datumKraja: Date;
    lokacije: Array<string>;
    vrsta: string;
    zavrseno:boolean;
    delegati: Array<string>;
    takmicari: Array<number>;
}