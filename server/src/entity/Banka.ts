import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Adresa } from "./Adresa";

@Entity()
export class Banka {

    @PrimaryGeneratedColumn()
    bankaId: number

    @Column()
    nazivBanke: string

    @ManyToOne(type => Adresa, { eager: true })
    adresa: Adresa

    public constructor(id: number, naziv: string, adresa: Adresa) {
        this.bankaId = id;
        this.nazivBanke = naziv;
        this.adresa = adresa;
    }
}