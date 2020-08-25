import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import "reflect-metadata";
import { createConnection } from "typeorm";
import { Routes } from "./routes";
import * as cors from 'cors';

createConnection().then(async connection => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors());
    
    // register express routes from defined application routes
    Routes.forEach(route => {
        (app as any)[route.method](route.route, (req: Request, res: Response, next: Function) => {
            const result = (new (route.controller as any))[route.action](req, res, next);
            if (result instanceof Promise) {
                result.then(result => res.json(result));
            } else if (result !== null && result !== undefined) {
                res.json(result);
            }
        });
    });

    // setup express app here
    // ...

    // start express server
    app.listen(5000, () => {
        console.log('Server is running on port 5000.');
    });


}).catch(error => console.log(error));