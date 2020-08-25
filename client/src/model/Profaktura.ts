import { Stamaprija } from './Stamparija'
import { Banka } from './Banka';
import { Proizvod } from './Proizvod';

export interface Profaktura {
    profakturaId: number,
    faza: string,
    datum: Date
}

export interface ProfakturaStamparije extends Profaktura {
    stamparija: Stamaprija,
    banka: Banka,
    stavke: StavkaProfakturaStamparije[],
}

export interface StavkaProfakturaStamparije {
    rb: number,
    kolicina: number,
    opis: string,
    proizvod: Proizvod,
    statusAkcije: string,
    profaktura: ProfakturaStamparije | undefined;
}