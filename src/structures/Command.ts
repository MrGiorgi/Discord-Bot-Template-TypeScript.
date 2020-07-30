import { Message } from "discord.js";
import Bot from "./Client";
import Context from './Context';

export enum Category {
    Moderation,
    OwnerOnly,
    Util
}

interface CommandOptions {
    name: string;
    aliases?: string[];
    description: string;
    category: Category;
    usage?: string;
}

export default class BaseCommand {
    name: string;
    aliases: string[];
    description: string;
    category: Category;
    usage: string;
    client: Bot;

    constructor(client: Bot, options: CommandOptions) {
        this.name = options.name;
        this.aliases = options.aliases || [];
        this.description = options.description;
        this.category = options.category;
        this.usage = options.usage || this.name;

        this.client = client;
    }

    // eslint-disable-next-line
    public run(ctx: Context): void { }
}