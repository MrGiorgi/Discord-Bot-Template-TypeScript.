import BaseCommand, { Category } from "../structures/Command";
import { MessageEmbed } from "discord.js";
import Context from "../structures/Context";
import Bot from "../structures/Client";

export default class HelpCommand extends BaseCommand {
    constructor(client: Bot) {
        super(client, {
            name: "help",
            aliases: ["h"],
            description: "Muestra ayuda sobre el bot",
            category: Category.Util
        });
    }

    public run(ctx: Context): void {
        ctx.send(new MessageEmbed()
            .setTitle("Comandos")
            .addFields([{
                name: "Utilidad",
                value: this.client.commands.filter((c) => c.category === Category.Util).map((c) => `\`${c.name}\``).join(", ")
            }, {
                name: "Moderación",
                value: this.client.commands.filter((c) => c.category === Category.Moderation).map((c) => `\`${c.name}\``).join(", ")
            }].filter((f) => f.value))
            .setColor(0x6666ff)
            .setTimestamp());
    }
}