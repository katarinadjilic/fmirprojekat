import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Proizvod } from "../entity/Proizvod";


export class ProizvodController {

    private proizvodRepository = getRepository(Proizvod);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.proizvodRepository.find();
    }
}