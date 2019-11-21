import {sequelizeConfig} from "./config/sequelize";
import {StorageFixtures} from "./storage/fixtures";

;
export class Fixtures{

    static async load(){

        if(sequelizeConfig.forceSync){
            await StorageFixtures.load();
        }
    }
}
