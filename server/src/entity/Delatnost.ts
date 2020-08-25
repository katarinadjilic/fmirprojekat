import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Delatnost {

    @PrimaryGeneratedColumn()
    sifraDelatnosti: number

    @Column()
    nazivDelatnosti: string

    public constructor(sifra: number, naziv: string) {
        this.sifraDelatnosti = sifra;
        this.nazivDelatnosti = naziv;
    }
}