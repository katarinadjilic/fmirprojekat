export interface Drzava {
    drzavaId: number | undefined,
    nazivDrzave: string
}
export interface Mesto {
    mestoId: number | undefined,
    nazivMesta: string,
    drzava: Drzava,
}
export interface Adresa {
    adresaId: number | undefined,
    broj: number,
    nazivAdrese: string,
    mesto: Mesto
}