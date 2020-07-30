import BaseCommand from "../structures/Command";
import { Collection } from "discord.js";
import Bot from "../structures/Client";
import { readdirSync } from "fs";
import { join } from "path";

export default class Commands extends Collection<string, BaseCommand> {
    client: Bot;

    constructor(client: Bot) {
        super();

        this.client = client;
    }

    public get(name: string): BaseCommand | null {
        return this.find((c) => c.name === name || c.aliases.includes(name));
    }

    public async load(): Promise<void> {
        for (const file of readdirSync(join(__dirname, "../commands/"))) {
            const commandName = file.split(".")[0];
            const commandFile = await import(`../commands/${file}`);
            const commandClass: BaseCommand = new commandFile.default(this.client);
            const existingCommand = this.find((c) => [...commandClass.aliases, commandClass.name, commandClass.constructor.name].some((n) => [...c.aliases, c.name, c.constructor.name].includes(n)));
            if (existingCommand) this.client.log(`Commands with equal names or aliases found (${file} and ${existingCommand.name})`, true);
            this.set(commandName, commandClass);
        }
    }
}