import { Profaktura } from "./Profaktura";
import { Entity, ManyToOne, OneToMany } from "typeorm";
import { Stamparija } from "./Stamparija";
import { Banka } from "./Banka";
import { StavkaProfakture } from "./StavkaProfakture";

@Entity()
export class ProfakturaStamparije extends Profaktura {

    @ManyToOne(type => Stamparija, { eager: true })
    stamparija: Stamparija;

    @ManyToOne(type => Banka, { eager: true })
    banka: Banka

    @OneToMany(type => StavkaProfakture, (stavka) => stavka.profaktura, { eager: false })
    stavke: StavkaProfakture[]

    public constructor(id: number, faza: string, datum: Date, st: Stamparija, banka: Banka, stavke: StavkaProfakture[]) {
        super(id, faza, datum);
        this.stamparija = st;
        this.banka = banka;
        this.stavke = stavke;
    }
}