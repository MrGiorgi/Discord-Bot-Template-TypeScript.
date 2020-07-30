import { Message, User, GuildMember, Guild, TextChannel, DMChannel, NewsChannel, MessageOptions, MessageAdditions, MessageEmbed, APIMessage } from 'discord.js';
import Client from "./Client";

class Context {
   public client: Client;
   public message: Message;
   public channel: TextChannel | DMChannel | NewsChannel;
   public prefix: string;
   public args: string[];
   public guild: Guild;
   public member: GuildMember;
   public user: User;

   constructor(msg: Message, bot: Client) {
      this.message = msg;
      this.guild = this.message.guild;
      this.prefix = process.env.botPrefix;
      this.args = this.message.content.slice(this.prefix.length).trim().split(/ +/g);
      this.client = bot;
      this.user = this.message.author;
      this.member = this.message.member;
      this.channel = this.message.channel;
   }

   send(content: any,
      options?: MessageOptions | (MessageOptions & { split?: false }) | MessageAdditions) {
      return this.channel.send(content, options)
   }

   code(options: { lang: string, content: string }) {
      const cb = '```';
      return this.send(`${cb}${options.lang}\n${options.content}${cb}`);
   }

}

export default Context;