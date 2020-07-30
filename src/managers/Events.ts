import Bot from "../structures/Client";
import { readdirSync } from "fs";
import { join } from "path";

type DiscordEvents = "channelCreate" | "channelDelete" | "channelPinsUpdate" | "channelUpdate" | "debug" | "emojiCreate" | "emojiDelete" | "emojiUpdate" | "error" | "guildBanAdd" | "guildBanRemove" | "guildCreate" | "guildDelete" | "guildIntegrationsUpdate" | "guildMemberAdd" | "guildMemberRemove" | "guildMembersChunk" | "guildMemberSpeaking" | "guildMemberUpdate" | "guildUnavailable" | "guildUpdate" | "invalidated" | "inviteCreate" | "inviteDelete" | "message" | "messageDelete" | "messageDeleteBulk" | "messageReactionAdd" | "messageReactionRemove" | "messageReactionRemoveAll" | "messageReactionRemoveEmoji" | "messageUpdate" | "presenceUpdate" | "rateLimit" | "ready" | "roleCreate" | "roleDelete" | "roleUpdate" | "shardDisconnect" | "shardError" | "shardReady" | "shardReconnecting" | "shardResume" | "typingStart" | "userUpdate" | "voiceStateUpdate" | "warn" | "webhookUpdate" | "channelCreate" | "channelDelete" | "channelPinsUpdate" | "channelUpdate" | "debug" | "emojiCreate" | "emojiDelete" | "emojiUpdate" | "error" | "guildBanAdd" | "guildBanRemove" | "guildCreate" | "guildDelete" | "guildIntegrationsUpdate" | "guildMemberAdd" | "guildMemberRemove" | "guildMembersChunk" | "guildMemberSpeaking" | "guildMemberUpdate" | "guildUnavailable" | "guildUpdate" | "invalidated" | "inviteCreate" | "inviteDelete" | "message" | "messageDelete" | "messageDeleteBulk" | "messageReactionAdd" | "messageReactionRemove" | "messageReactionRemoveAll" | "messageReactionRemoveEmoji" | "messageUpdate" | "presenceUpdate" | "rateLimit" | "ready" | "roleCreate" | "roleDelete" | "roleUpdate" | "shardDisconnect" | "shardError" | "shardReady" | "shardReconnecting" | "shardResume" | "typingStart" | "userUpdate" | "voiceStateUpdate" | "warn" | "webhookUpdate";

export default class Events {
    client: Bot;

    constructor(client: Bot) {
        this.client = client;
    }

    public async load(): Promise<void> {
        for (const file of readdirSync(join(__dirname, "../events/"))) {
            const eventName = file.split(".")[0];
            const eventFile = await import(`../events/${file}`);
            const eventClass = new eventFile.default(this.client);
            this.client.on(eventName as DiscordEvents, (...args) => eventClass.run(...args));
        }
    }
}