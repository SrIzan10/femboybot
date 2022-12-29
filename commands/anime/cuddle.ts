import { commandModule, CommandType } from '@sern/handler';
import axios from 'axios';
import { ActionRowBuilder, ApplicationCommandOptionType, ButtonBuilder, ButtonStyle, ComponentType } from 'discord.js';
import { publish } from '../../plugins/publish.js';

export default commandModule({
	type: CommandType.Slash,
	plugins: [publish()],
	description: 'Cuddle someone',
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
		const request = await axios('https://anime-api.hisoka17.repl.co/img/cuddle').then(res => res.data)
		await ctx.reply({content: `${ctx.user} le ha hecho cuddle a ${options[1].getMember('usuario')}\n${request.url}`})
	},
});
