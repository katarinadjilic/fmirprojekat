import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Delatnost } from "../entity/Delatnost";


export class DelatnostController {

    private delatnostRepository = getRepository(Delatnost);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.delatnostRepository.find();
    }
}