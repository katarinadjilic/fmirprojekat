import { NextFunction, Request, Response } from "express";
import { getManager, getRepository, FindConditions } from "typeorm";
import { ProfakturaStamparije } from "../entity/ProfakturaStamparije";
import { StavkaProfakture } from "../entity/StavkaProfakture";


export class ProfakturaStamparijeController {
    private profakturaRepository = getRepository(ProfakturaStamparije);
    private stavkaRepository = getRepository(StavkaProfakture);
    private manager = getManager();

    async all(request: Request, response: Response, next: NextFunction) {
        return this.profakturaRepository.find();
    }
    async allStavke(request: Request, response: Response, next: NextFunction) {
        return this.stavkaRepository.find({
            where: {
                profaktura: {
                    profakturaId: (request.params as any).id
                }
            }
        })
    }
    async one(request: Request, response: Response, next: NextFunction) {
        return this.profakturaRepository.findOne(request.params.id);
    }
    async remove(request: Request, response: Response, next: NextFunction) {
        const staraProfaktura = await this.profakturaRepository.findOne(request.params.id);
        if (!staraProfaktura) {
            return {
                status: 'failure',
                error: 'Profaktura ne postoji'
            }
        }
        try {
            this.profakturaRepository.delete(request.params.id);
        } catch (error) {
            return {
                status: 'failure',
                error: error
            }
        }
        return {
            status: 'success',
        }
    }
    public async insert(request: Request, response: Response, next: NextFunction) {
        const result = this.manager.transaction(async (manager) => {
            const profaktura = request.body as ProfakturaStamparije;
            this.validateProfaktura(profaktura);
            const novaProfaktura = await manager.save(ProfakturaStamparije, profaktura);
            profaktura.stavke.forEach(async element => {
                this.validateStavka(element);
                element.rb = undefined;
                element.profaktura = novaProfaktura;
                const novaStavka = await manager.save(StavkaProfakture, element);
                novaStavka.profaktura = novaProfaktura;
            });
            novaProfaktura.stavke = [];
            return {
                status: 'success',
                profaktura: novaProfaktura
            }
        }).catch(error => {
            return {
                status: 'failure',
                error: error,
            }
        });
        return result;
    }
    public async update(request: Request, response: Response, next: NextFunction) {
        const profaktura = request.body as ProfakturaStamparije;
        const profakturaIzBaze = this.profakturaRepository.findOne(request.params.id);
        if (!profakturaIzBaze) {
            return {
                status: 'failure',
                error: 'Profaktura ne postoji',
            }
        }
        const stavkeZaBrisanje = profaktura.stavke.filter(element => element.statusAkcije === 'obrisana');
        const stavkaZaSave = profaktura.stavke.filter(element => element.statusAkcije !== 'obrisana');
        const result = this.manager.transaction(async manager => {
            this.validateProfaktura(profaktura);
            const novaProfaktura = await manager.save(ProfakturaStamparije, profaktura);
            stavkaZaSave.forEach(async element => {
                if (!element.rb || element.rb < 0) {
                    element.rb = undefined;
                }
                this.validateStavka(element);
                const novaStavka = await manager.save(StavkaProfakture, element);
                novaStavka.profaktura = novaProfaktura;
            });
            stavkeZaBrisanje.forEach(async element => {
                await manager.delete(StavkaProfakture, {
                    rb: element.rb
                } as FindConditions<StavkaProfakture>);
            })
            novaProfaktura.stavke = [];
            return {
                status: 'success',
                profaktura: novaProfaktura
            }
        }).catch(error => {
            return {
                status: 'failure',
                error: error,
            }
        })
        return result;
    }

    private validateProfaktura(profaktura: Partial<ProfakturaStamparije>) {
        if(profaktura.banka === null || profaktura.banka === undefined ||
            profaktura.datum === null || profaktura.banka === undefined ||
            profaktura.faza === '' || profaktura.faza === null || profaktura.faza === undefined ||
            profaktura.stamparija === null || profaktura.stamparija === undefined || profaktura.stamparija === null){
                throw {error:'Validation error.'};
            }
    }
    private validateStavka(stavka: Partial<StavkaProfakture>) {
        if(stavka.kolicina === 0 || stavka.kolicina === null || stavka.kolicina === undefined||
            stavka.proizvod === null || stavka.proizvod === undefined){
                throw {error:'Validation error.'};
            }
    }
}