import { Client, GatewayIntentBits } from 'discord.js';
import { DefaultLogging, Dependencies, Sern, SernEmitter, single, Singleton } from '@sern/handler';
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

interface MyDependencies extends Dependencies {
    '@sern/client' : Singleton<Client>;
    '@sern/logger' : Singleton<DefaultLogging>
}
export const useContainer = Sern.makeDependencies<MyDependencies>({
    build: root => root
        .add({ '@sern/client': single(client)  }) 
        .add({ '@sern/logger': single(new DefaultLogging()) })
});
Sern.init({
	commands: './dist/commands/',
	events: './dist/events/',
	defaultPrefix: 'fmb!',
	containerConfig: {
		get: useContainer
	}
});

mongoose.connect(process.env.MONGODB!)

client.login(process.env.TOKEN)