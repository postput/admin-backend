import {Application} from "express";
import {StorageController} from "./controller";
export class StorageRoute {
    public storageController: StorageController = new StorageController();
    public routes(app: Application): void {

        app.route('/storage-types/')
            .get(this.storageController.getAllStorageTypes);

        app.route('/storages/:uuid/')
            .get(this.storageController.get)
            .put(this.storageController.edit)
            .delete(this.storageController.remove);

        app.route('/storages/')
            .get(this.storageController.getAll)
            .post(this.storageController.create);


    }
}
