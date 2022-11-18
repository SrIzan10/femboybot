import { Client, GatewayIntentBits } from 'discord.js';
import { Sern } from '@sern/handler';
import 'dotenv/config'

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
	],
});
//View docs for all options
Sern.init({
	client,
	commands: './dist/commands/',
	// events: './dist/events/',
});

client.login(process.env.TOKEN);
