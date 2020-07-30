import { Client, ClientOptions } from "discord.js";
import Commands from "../managers/Commands";
import Events from "../managers/Events";

interface BotOptions extends ClientOptions {
    botOwners?: string[];
}

export default class Bot extends Client {
    commands = new Commands(this);
    events = new Events(this);
    botOwners: string[];

    constructor(options?: BotOptions) {
        super(options);

        this.botOwners = options.botOwners || [];
    
        this.commands.load();
        this.events.load();
    }

    public log(message: string, error?: boolean): void {
        console.log(`\x1b[36m[${new Date().toLocaleTimeString()}]${error ? "\x1b[31m" : "\x1b[32m"}[LOG] \x1b[0m${message}`);
    }
}