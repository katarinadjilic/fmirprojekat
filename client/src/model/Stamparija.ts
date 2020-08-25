import { Delatnost } from "./Delatnost";

export interface Stamaprija {
    stamparijaId: number | undefined,
    nazivStamparije: string,
    tekuciRacun: string,
    maticniBroj: string,
    delatnost: Delatnost

}