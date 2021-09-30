import { Medalje } from "./medalje";

export class Zemlja{
    zastava: string;
    naziv: string;
    brojSportista: number;
    medalje:Array<Medalje>
    rang: number;
    zlatne: number;
    srebrne: number;
    bronzane: number;
    ukupno: number;
}