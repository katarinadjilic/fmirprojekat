import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { ProfakturaStamparije } from "./ProfakturaStamparije";
import { Proizvod } from "./Proizvod";

@Entity()
export class StavkaProfakture {

    @PrimaryGeneratedColumn()
    rb: number | undefined;

    @Column()
    kolicina: number;

    @Column()
    opis: string

    @ManyToOne(type => Proizvod, { eager: true })
    proizvod: Proizvod

    @ManyToOne(type => ProfakturaStamparije, (profaktura) => profaktura.stavke, { eager: true, primary: true, onDelete: 'CASCADE' })
    profaktura: ProfakturaStamparije;

    @Column()
    statusAkcije: string

    public constructor(id: number, kolicina: number, opis: string, proizvod: Proizvod, profaktura: ProfakturaStamparije, status: string) {
        this.kolicina = kolicina;
        this.profaktura = profaktura;
        this.proizvod = proizvod;
        this.rb = id;
        this.statusAkcije = status;
        this.opis = opis;
    }
}