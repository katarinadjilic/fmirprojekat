import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Adresa } from "../entity/Adresa";


export class AdresaController {

    private adresaRepository = getRepository(Adresa);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.adresaRepository.find();
    }
}