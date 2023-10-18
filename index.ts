import { Client, GatewayIntentBits } from 'discord.js';
import { makeDependencies, Sern, single } from '@sern/handler';
import 'dotenv/config'
import mongoose from 'mongoose';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
		GatewayIntentBits.MessageContent,
		GatewayIntentBits.GuildVoiceStates,
	],
});

await makeDependencies({
    build: root => root.add({ '@sern/client': single(() => client)  }) 
});

Sern.init({
	commands: './dist/commands/',
	events: './dist/events/',
	defaultPrefix: 'fmb!',
});

mongoose.connect(process.env.MONGODB!)

client.login(process.env.TOKEN)