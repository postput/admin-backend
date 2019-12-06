import {Application} from "express";
import {WebhookController} from "./controller";
export class WebhookRoute {
    public webhookController: WebhookController = new WebhookController();
    public routes(app: Application): void {

        app.route('/webhook-types/')
            .get(this.webhookController.getAllWebhookTypes);

        app.route('/webhooks/:id/')
            .get(this.webhookController.get)
            .put(this.webhookController.edit)
            .delete(this.webhookController.remove);

        app.route('/webhooks/')
            .get(this.webhookController.getAll)
            .post(this.webhookController.create);


    }
}
