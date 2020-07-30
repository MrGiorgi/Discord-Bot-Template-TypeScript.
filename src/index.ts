import Bot from "./structures/Client";
import { config } from "dotenv";
import { join } from "path";

config({ path: join(__dirname, "../.env") });
const client = new Bot();
client.login(process.env.botToken);

process.on("unhandledRejection", (err: Error) => {
    client.log(err.stack, true);
});