import { NextFunction, Request, Response } from "express";
import { getRepository } from "typeorm";
import { Banka } from "../entity/Banka";


export class BankaController {

    private bankaRepository = getRepository(Banka);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.bankaRepository.find();
    }
}