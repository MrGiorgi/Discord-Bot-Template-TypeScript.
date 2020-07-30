import BaseEvent from "../structures/Event";

export default class ReadyEvent extends BaseEvent {
    public run(): void {
        this.client.log(`Bot Ready! Logged in as ${this.client.user.tag}.`);
    }
}