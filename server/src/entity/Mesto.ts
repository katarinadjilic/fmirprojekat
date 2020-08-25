import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Drzava } from "./Drzava";

@Entity()
export class Mesto {

    @PrimaryGeneratedColumn()
    mestoId: number | undefined;

    @Column()
    nazivMesta: string;

    @ManyToOne(type => Drzava, {
        eager: true
    })
    drzava: Drzava;

    public constructor(id: number, naziv: string, drzava: Drzava) {
        this.drzava = drzava;
        this.mestoId = id;
        this.nazivMesta = naziv;
    }
}