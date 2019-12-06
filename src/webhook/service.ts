import {Storage} from '../storage/model'
import {isEmpty, merge} from "lodash";
import * as request from "request-promise";
import Logger from "../logger";
import {StorageRepository} from "../storage/repository";
import {WebhookRepository} from "./repository";
import {Webhook, WebhookTypes} from "./model";

export class WebhookService {

    private static pInstance: WebhookService;

    static get instance(): WebhookService {
        return WebhookService.getInstance();
    }

    private static getInstance() {
        if (!WebhookService.pInstance) {
            WebhookService.pInstance = new WebhookService();
        }
        return WebhookService.pInstance;
    }

    async findById(id) {
        return await WebhookRepository.instance.fetchById(id);
    }



    async findAllWebhookTypes() {
        return await WebhookRepository.instance.fetchAllWebhookTypes();
    }

    async edit(id, rawWebhook) {
        const webhook = await this.findById(id);
        if(webhook === null){
            throw new Error('No webhook with that id');
        }
        webhook.mergeWithRawWebhook(rawWebhook);

        await this.createWebhookTypesByIds(webhook.id, rawWebhook.webhookTypeIds);
        await webhook.save();
        return webhook;
    }

    async create(rawWebhook) {
        let webhook = new Webhook(rawWebhook);
        webhook = await webhook.save();

        await this.createWebhookTypesByIds(webhook.id, rawWebhook.webhookTypeIds);
        return webhook;
    }

    async remove(id) {
        const webhook = await WebhookRepository.instance.fetchById(id);
        await Webhook.destroy({where: {id: id}});
        return webhook;
    }

    async deleteWebhookTypesByJobId(webhookId){
        return WebhookTypes.destroy({where: {webhookId}});
    }

    async createWebhookTypesByIds(webhookId: number, webhookTypesIds: number[], options?){
        options = options || {};
        options.removePrevious = options.removePrevious || true;
        if(options.removePrevious){
            await this.deleteWebhookTypesByJobId(webhookId);
        }

        const webhookTypes = webhookTypesIds.map(webhookTypeId => {
            return {webhookId , webhookTypeId}
        });

        return WebhookTypes.bulkCreate(webhookTypes);

    }

}