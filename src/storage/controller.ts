import {StorageService} from "./service";
import {serialize} from "serializr";
import {conflict} from '@hapi/boom';

export class StorageController {

    async getAllStorageTypes(req, res) {
        const storageTypes = await StorageService.instance.findAllStorageTypes();
        res.json(serialize(storageTypes)).end();
    }

    async getAll(req, res) {
        const storages = await StorageService.instance.findAllStorage();
        res.json(serialize(storages)).end();
    }

    async get(req, res) {
        const uuid = req.params.uuid;
        const storage = await StorageService.instance.findByUUID(uuid);
        res.json(serialize(storage)).end();
    }

    async edit(req, res) {
        const uuid = req.params.uuid;
        const rawStorage = req.body;
        const storage =  await StorageService.instance.edit(uuid, rawStorage);
        res.json(serialize(storage)).end();
    }

    async create(req, res) {
        const rawStorage = req.body;
        try{
            const storage =  await StorageService.instance.create(rawStorage);
            res.json(serialize(storage)).end();
        }catch (e) {
            throw conflict('A storage with that name or UUID already exists!');
        }

    }

    async remove(req, res) {
        const uuid = req.params.uuid;
        const storage = await StorageService.instance.remove(uuid);
        res.json(storage).end();
    }

}
