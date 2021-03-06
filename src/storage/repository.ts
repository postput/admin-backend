import {Storage, StorageType} from './model'
import {Op, or} from "sequelize";
import {Webhook, WebhookType} from "../webhook/model";


export class StorageRepository{

    private static pInstance: StorageRepository;

    static get instance() : StorageRepository {
        return StorageRepository.getInstance();
    }

    private static getInstance() {
        if (!StorageRepository.pInstance) {
            StorageRepository.pInstance = new StorageRepository();
        }
        return StorageRepository.pInstance;
    }

    fetchByNameOrUUID(string: string){
        return Storage.findOne({ where: { [Op.or]: [ {name: string, uuid: string} ] }, include:[{model: StorageType, required: true}, {model: Webhook, required: false, include:[{model: WebhookType, required: true}]}]});
    }

    fetchByName(name: string){
        return Storage.findOne({ where: { name: name }, include:[{model: StorageType, required: true}, {model: Webhook, required: false, include:[{model: WebhookType, required: true}]}]});
    }

    fetchByUUID(uuid: string){
        return Storage.findOne({ where: { uuid: uuid }, include:[{model: StorageType, required: true}, {model: Webhook, required: false, include:[{model: WebhookType, required: true}]}]});
    }

    fetchAllStorageType(){
        return StorageType.findAll();
    }

    fetchAllStorage(){
        return Storage.findAll({include:[{model: StorageType, required: true}]});
    }


}
