import {WebhookService} from "./service";
import {serialize} from "serializr";
import {conflict} from '@hapi/boom';

export class WebhookController {

    async getAllWebhookTypes(req, res) {
        const storageTypes = await WebhookService.instance.findAllWebhookTypes();
        res.json(serialize(storageTypes)).end();
    }

    async getAll(req, res) {
        //const storages = await WebhookService.instance.findAllStorage();
        //res.json(serialize(storages)).end();
    }

    async get(req, res) {
        const id = req.params.id;
        const webhook = await WebhookService.instance.findById(id);
        res.json(serialize(webhook)).end();
    }

    async edit(req, res) {
        const id = req.params.id;
        const rawWebhook = req.body;
        const webhook =  await WebhookService.instance.edit(id, rawWebhook);
        res.json(serialize(webhook)).end();
    }

    async create(req, res) {
        const rawWebhook = req.body;
        try{
            const webhook =  await WebhookService.instance.create(rawWebhook);
            res.json(serialize(webhook)).end();
        }catch (e) {
            throw conflict('A webhook with that name or UUID already exists!');
        }

    }

    async remove(req, res) {
        const id = req.params.id;
        const storage = await WebhookService.instance.remove(id);
        res.json(storage).end();
    }

}
