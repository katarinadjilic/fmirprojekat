import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Proizvod {

    @PrimaryGeneratedColumn()
    proizvodId: number;

    @Column()
    naziv: string;

    @Column()
    cena: number

    public constructor(id: number, naziv: string, cena: number) {
        this.naziv = naziv;
        this.proizvodId = id;
        this.cena = cena;
    }
}