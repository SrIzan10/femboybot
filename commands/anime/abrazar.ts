import { commandModule, CommandType } from '@sern/handler';
import axios from 'axios';
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ComponentType } from 'discord.js';
import { publish } from '../../src/plugins/publish.js';

export default commandModule({
	type: CommandType.Slash,
	plugins: [publish()],
	description: 'Abraza a alguien',
	options: [
		{
			name: 'usuario',
			description: 'El usuario',
			type: ApplicationCommandOptionType.User,
			required: true
		}
	],
	//alias : [],
	execute: async (ctx, options) => {
		const request = await axios('https://anime-api.hisoka17.repl.co/img/hug').then(res => res.data)
		await ctx.reply({content: `${ctx.user} ha abrazado a ${options[1].getMember('usuario')}\n${request.url}`})
	},
});
