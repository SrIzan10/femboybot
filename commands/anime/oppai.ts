import { commandModule, CommandType } from '@sern/handler';
import axios from 'axios';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } from 'discord.js';
import { publish } from '../../plugins/publish.js';

export default commandModule({
	type: CommandType.Slash,
	plugins: [publish()],
	description: ':boobas: but more',
	//alias : [],
	execute: async (ctx, args) => {
		await ctx.interaction.deferReply({ephemeral: true})
		let request = await axios('https://api.waifu.im/random/?is_nsfw=false&selected_tags=oppai').then(res => res.data)
		const button = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setLabel('Envíaselo a todos')
					.setCustomId('waifu-send')
					.setStyle(ButtonStyle.Primary)
			)
		const message = await ctx.interaction.editReply({content: `${request.images[0].url}`, components: [button]})
		const collector = message.createMessageComponentCollector({max: 1, time: 30000, componentType: ComponentType.Button})
		collector.on('collect', async (i) => {
			await i.deferReply()
			if (i.customId === 'waifu-send') {
				const message = await i.editReply({content: `Pedido por ${ctx.user}\n${request.images[0].url}`})
				message.react('<:BOOBAS:1020018391119056896>')
			}
		})
	},
});
