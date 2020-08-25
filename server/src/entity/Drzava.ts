import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Drzava {

    @PrimaryGeneratedColumn()
    drzavaId: number | undefined;

    @Column()
    nazivDrzave: string;

    public constructor(id: number, ime: string) {
        this.nazivDrzave = ime;
        this.drzavaId = id;
    }
}