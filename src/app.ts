import * as express from "express";
require('express-async-errors');
import * as bodyParser from "body-parser";
import { Env } from "./helper/env";
import { SequelizeBuilder } from './sequelizeBuilder'
import {Fixtures} from "./fixtures";

import * as winston from "winston";
import * as morgan from "morgan";
import Logger from "./logger";
import {sequelizeConfig} from "./config/sequelize";
import {HealthCheckRoute} from "./health-check/route";
import {StorageService} from "./storage/service";
import {StorageRoute} from "./storage/route";
import {WebhookRoute} from "./webhook/route";
const cors = require('cors');
const boolParser = require('express-query-boolean');
const intParser = require('express-query-int');


export default class App {

    private static appInstance: App;

    static get instance() : App {
        return App.getInstance();
    }


    public express: express.Application = express();
    public healthCheckRoute = new HealthCheckRoute();
    public storageRoute = new StorageRoute();
    public webhookRoute = new WebhookRoute();

    private constructor(){

        this.config();
        this.healthCheckRoute.routes(this.express);
        this.storageRoute.routes(this.express);
        this.webhookRoute.routes(this.express);

        this.express.use((err, req, res, next) => {
            Logger.error(err);
            let statusCode = 500;

            if(err.statusCode){
                statusCode = err.statusCode;
            }

            if(err.output && err.output.statusCode){
                statusCode = err.output.statusCode;
            }

            if(Env.isInProduction()) {
                return res.status(statusCode).send(`something wen't wrong`);
            }

            return res.status(statusCode).send(err.stack);
        })

    }

     private static getInstance() {
        if (!App.appInstance) {
            App.appInstance = new App();
        }
        return App.appInstance;
    }

    private config(): void{

        process.on('uncaughtException', function(err) {
            Logger.error(err);
        });
        process.on('unhandledRejection', function(err) {
            Logger.error(err);
        });


        this.express.use(morgan('combined', { stream: {write: Logger.morganLog} }));
        SequelizeBuilder.sequelize.sync({ force: sequelizeConfig.forceSync }).then(async (s) => {
            await Fixtures.load();
            Logger.log('database created');
        });

        this.express.use(cors());
        this.express.use(bodyParser.json());
        this.express.use(boolParser());
        this.express.use(intParser());
        this.express.use(bodyParser.urlencoded({ extended: false }));
    }
}
