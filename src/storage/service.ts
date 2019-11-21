import {StorageRepository} from "./repository";
import {Storage} from "./model";

export class StorageService {

    private static pInstance: StorageService;

    static get instance(): StorageService {
        return StorageService.getInstance();
    }

    private static getInstance() {
        if (!StorageService.pInstance) {
            StorageService.pInstance = new StorageService();
        }
        return StorageService.pInstance;
    }

    async findAllStorageTypes(){
        return StorageRepository.instance.fetchAllStorageType();
    }

    async edit(uuid, rawStorage) {
        const storage = await this.findByUUID(uuid);
        if(storage === null){
            throw new Error('No storage with that uuid');
        }
        storage.mergeWithRawStorage(rawStorage);
        await storage.save();
        return storage;
    }

    create(rawStorage) {
        return Storage.create(rawStorage);
    }

    async remove(uuid) {
        const storage = await StorageRepository.instance.fetchByUUID(uuid);
        await Storage.destroy({where: {uuid: uuid}});
        return storage;
    }

    async findByUUID(uuid) {
        return await StorageRepository.instance.fetchByUUID(uuid);
    }


    async findAllStorage() {
        return await StorageRepository.instance.fetchAllStorage();
    }


}
