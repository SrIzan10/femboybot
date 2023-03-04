import { commandModule, CommandType } from '@sern/handler';
import { ApplicationCommandOptionType, GuildMember } from 'discord.js';
import { publish } from '../../plugins/publish.js';

export default commandModule({
	type: CommandType.Slash,
	plugins: [publish()],
	description: 'Cambiale el nickname a randoms',
	//alias : [],
	options: [
		{
			name: 'usuario',
			description: 'El usuario',
			type: ApplicationCommandOptionType.User,
			required: true,
		},
		{
			name: 'nick',
			description: 'El nickname que ponerle al usuario',
			type: ApplicationCommandOptionType.String,
			required: true,
		}
	],
	execute: async (ctx, args) => {
		const user = args[1].getMember('usuario') as GuildMember
		const nick = args[1].getString('nick', true)
		const oldNick = user.nickname || user.user.username
		if (user.user.bot) return await ctx.reply({ content: 'No puedes cambiarle el nick a un bot...', ephemeral: true })

		await user.setNickname(nick)
		await ctx.reply({ content: `El nickname de ${user} ha sido cambiado por ${ctx.user}\nAntiguo nickname: ${oldNick}\nNuevo nickname: ${nick}` })
	},
});
