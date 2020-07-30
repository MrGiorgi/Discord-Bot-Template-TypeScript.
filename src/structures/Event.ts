import Bot from "./Client";

export default class BaseEvent {
    client: Bot;

    constructor(client: Bot) {
        this.client = client;
    }
}