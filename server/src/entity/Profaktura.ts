import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Profaktura {

    @PrimaryGeneratedColumn()
    profakturaId: number

    @Column()
    faza: string

    @Column()
    datum: Date

    public constructor(id: number, faza: string, datum: Date) {
        this.datum = datum;
        this.faza = faza;
        this.profakturaId = id;
    }
}