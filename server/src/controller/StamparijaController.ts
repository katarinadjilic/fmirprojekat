import { Request, Response, NextFunction } from "express";
import { getRepository } from "typeorm";
import { Stamparija } from "../entity/Stamparija";

export class StamparijaController {

    private stamparijaRepository = getRepository(Stamparija);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.stamparijaRepository.find();
    }
    async one(request: Request, response: Response, next: NextFunction) {
        return this.stamparijaRepository.findOne(request.params.id);
    }
    async insert(request: Request, response: Response, next: NextFunction) {
        const stamparija = request.body as Partial<Stamparija>;
        try {
            this.validate(stamparija);
            const insertResult = await this.stamparijaRepository.insert(stamparija);
            const napravljenaStamparija = await this.stamparijaRepository.findOne(insertResult.identifiers[0].stamparijaId);
            return {
                status: 'success',
                stamparija: napravljenaStamparija
            }
        } catch (error) {
            return {
                status: 'failure',
                error: 'Validation error'
            }
        }
    }
    async update(request: Request, response: Response, next: NextFunction) {
        const staraStamparija = await this.stamparijaRepository.findOne(request.params.id);
        if (!staraStamparija) {
            return {
                status: 'failure',
                error: 'Stamparija ne postoji'
            }
        }
        const stamparija = request.body as Partial<Stamparija>;
        try {
            this.validate(stamparija);
            const updateResult = await this.stamparijaRepository.update(request.params.id, stamparija);
            const azuriranaStamparija = await this.stamparijaRepository.findOne(request.params.id);
            return {
                status: 'success',
                stamparija: azuriranaStamparija
            }
        } catch (error) {
            return {
                status: 'failure',
                error: 'Validation error'
            }
        }
    }
    async remove(request: Request, response: Response, next: NextFunction) {
        const staraStamparija = await this.stamparijaRepository.findOne(request.params.id);
        if (!staraStamparija) {
            return {
                status: 'failure',
                error: 'Stamparija ne postoji'
            }
        }
        this.stamparijaRepository.delete(request.params.id);
        return {
            status: 'success',
        }
    }
    
    private validate(stamparija: Partial<Stamparija>) {
        if(stamparija.nazivStamparije === '' || stamparija.nazivStamparije === undefined || stamparija.nazivStamparije === null || 
        stamparija.tekuciRacun==='' || stamparija.tekuciRacun===undefined || stamparija.tekuciRacun ===null || 
        stamparija.maticniBroj ==='' || stamparija.maticniBroj===undefined || stamparija.maticniBroj === null ||
         stamparija.delatnost ===null || stamparija.delatnost === undefined ){
            throw new Error('Validation error');
        } 
    }
    
}