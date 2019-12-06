import {Storage, StorageType} from "../storage/model";
import {Op} from "sequelize";
import {Webhook, WebhookType} from "./model";

export class WebhookRepository{

    private static pInstance: WebhookRepository;

    static get instance() : WebhookRepository {
        return WebhookRepository.getInstance();
    }

    private static getInstance() {
        if (!WebhookRepository.pInstance) {
            WebhookRepository.pInstance = new WebhookRepository();
        }
        return WebhookRepository.pInstance;
    }

    fetchById(id: number){
        return Webhook.findByPk(id, { include:[{model: WebhookType, required: false}]});
    }

    fetchAllWebhookTypes(){
        return WebhookType.findAll();
    }

}