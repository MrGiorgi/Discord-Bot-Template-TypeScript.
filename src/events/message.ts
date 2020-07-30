import { Category } from "../structures/Command";
import Context from '../structures/Context';
import BaseEvent from "../structures/Event";
import { Message } from "discord.js";

export default class MessageEvent extends BaseEvent {
    public run(message: Message): void {
        const ctx: Context = new Context(message, this.client);

        if (!message.content.startsWith(ctx.prefix) || message.author.bot) return;
        const command = ctx.args.shift().toLowerCase();
        let error = false;
        try {
            const cmd = this.client.commands.get(command);
            if (!cmd || (cmd.category === Category.OwnerOnly && !this.client.botOwners.includes(message.author.id))) return;
            cmd.run(ctx);
        } catch (err) {
            error = true;
            this.client.log(err.stack, error);
        } finally {
            this.client.log(`${message.author.tag} ran the command ${command}`, error);
        }
    }
}