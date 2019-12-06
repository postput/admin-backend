import {join} from 'path'
import {Fixtures} from "../fixtures";

export class WebhookFixtures{

    static async load(){
        const dataDir = join(__dirname, '../../','data');
        const webhookTypeDir = join(dataDir, 'webhook-type');
        const webhookDir = join(dataDir, 'webhook');
        const customWebhookDir = join(webhookDir, 'custom');
        const files = Fixtures.getFilesMatchingExtensionsInDirectories([webhookTypeDir, webhookDir, customWebhookDir], '.json');
        await Fixtures.loadFiles(files);
    }
}
