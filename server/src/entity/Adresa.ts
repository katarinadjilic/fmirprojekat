import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Mesto } from "./Mesto";

@Entity()
export class Adresa {

    @PrimaryGeneratedColumn()
    adresaId: number | undefined;

    @Column()
    broj: number;

    @Column()
    nazivAdrese: string;

    @ManyToOne(type => Mesto, {
        eager: true,
        primary: true,
        cascade: true,
    })
    mesto: Mesto

    public constructor(id: number, broj: number, naziv: string, mesto: Mesto) {
        this.adresaId = id;
        this.broj = broj;
        this.mesto = mesto;
        this.nazivAdrese = naziv;
    }
}