import BaseCommand, { Category } from "../structures/Command";
import Context from "../structures/Context";
import Bot from "../structures/Client";

export default class PingCommand extends BaseCommand {
    constructor(client: Bot) {
        super(client, {
            name: "ping",
            description: "Muestra la latencia del bot",
            category: Category.Util
        });
    }

    public run(ctx: Context): void {
        ctx.send("Pong!");
    }
}