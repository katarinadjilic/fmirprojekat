import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Delatnost } from "./Delatnost";

@Entity()
export class Stamparija {

    @PrimaryGeneratedColumn()
    stamparijaId: number;

    @Column()
    nazivStamparije: string;

    @Column()
    tekuciRacun: string;

    @Column()
    maticniBroj: string;

    @ManyToOne(type => Delatnost, {
        eager: true
    })
    delatnost: Delatnost;

    public constructor(id: number, naziv: string, tekuciRacun: string, maticniBroj: string, delatnost: Delatnost) {
        this.maticniBroj = maticniBroj;
        this.nazivStamparije = naziv;
        this.tekuciRacun = tekuciRacun;
        this.stamparijaId = id;
        this.delatnost = delatnost;
    }
}