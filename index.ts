import { Client, GatewayIntentBits } from 'discord.js';
import { Sern, SernEmitter } from '@sern/handler';
import 'dotenv/config'
import mongoose from 'mongoose';

const client = new Client({
	intents: [
		GatewayIntentBits.Guilds,
		GatewayIntentBits.GuildMembers,
		GatewayIntentBits.GuildMessages,
	],
});

Sern.init({
	client,
	commands: './dist/commands/',
	events: './dist/events/',
	sernEmitter: new SernEmitter()
});

mongoose.connect(process.env.MONGODB!)

client.login(process.env.TOKEN)