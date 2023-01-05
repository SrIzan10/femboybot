import { commandModule, CommandType } from '@sern/handler';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, ModalActionRowComponentBuilder, ModalBuilder, TextChannel, TextInputBuilder, TextInputStyle } from 'discord.js';

export default commandModule({
	type: CommandType.Modal,
	plugins: [],
	execute: async (ctx) => {
		await ctx.deferReply({ephemeral: true})
		const resp1 = ctx.fields.getTextInputValue('clip-del-ano')
		const resp2 = ctx.fields.getTextInputValue('video-del-ano')
		const resp3 = ctx.fields.getTextInputValue('integrante-racista')
		const resp4 = ctx.fields.getTextInputValue('bot-mas-importante')
		const resp5 = ctx.fields.getTextInputValue('mejor-mc-server')

		const embed = new EmbedBuilder()
			.setColor('Green')
			.setAuthor({
				name: ctx.user.username,
				iconURL: ctx.user.displayAvatarURL()
			})
			.setTitle('Awards response')
			.setFields(
				{ name: 'Clip del año', value: resp1 },
				{ name: 'Vídeo del año', value: resp2 },
				{ name: 'Integrante más racista', value: resp3 },
				{ name: 'Bot más importante', value: resp4 },
				{ name: 'Mejor server de MC jugado', value: resp5 },
			);
		const fetchChannel = await ctx.client.channels.fetch(process.env.AWARDS!) as TextChannel
		const message = await fetchChannel.send({
			embeds: [embed]
		})

		const modal = new ModalBuilder()
			.setCustomId('awards-2')
			.setTitle('Awards (parte 2)');
		const input = new TextInputBuilder()
			.setCustomId('mas-horas-llamada')
			.setLabel('Integrante con más horas en llamada')
			.setStyle(TextInputStyle.Short);
		const input2 = new TextInputBuilder()
			.setCustomId('mas-mensajes-enviados')
			.setLabel('Integrante con más mensajes enviados')
			.setStyle(TextInputStyle.Short);
		const input3 = new TextInputBuilder()
			.setCustomId('mejor-emote')
			.setLabel('Mejor emote')
			.setStyle(TextInputStyle.Short);
		const input4 = new TextInputBuilder()
			.setCustomId('integrante-degenerado')
			.setLabel('Integrante más degenerado')
			.setStyle(TextInputStyle.Short);
		const input5 = new TextInputBuilder()
			.setCustomId('juego-mas-jugado')
			.setLabel('Juego más jugado')
			.setStyle(TextInputStyle.Short);
		const one =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				input
			);
		const two =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				input2
			);
		const three =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				input3
			);
		const four =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				input4
			);
		const five =
			new ActionRowBuilder<ModalActionRowComponentBuilder>().addComponents(
				input5
			);
		modal.addComponents([one, two, three, four, five]);
		
		const userEmbed = new EmbedBuilder()
			.setColor('Green')
			.setTitle('Aún no se ha acabado!')
			.setDescription('Continúa dándole al botón!\nEn el embed de más abajo podrás ver tus respuestas hechas de momento.')
			.setFooter({ text: `ID: ${message.id}` })
		const userButton = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('awards-continue-1')
					.setLabel('Continuar')
					.setStyle(ButtonStyle.Success)
			)
		const userMsg = await ctx.editReply({
			embeds: [userEmbed, embed],
			components: [userButton]
		})
		const collector = userMsg.createMessageComponentCollector({ time: 60_000, componentType: ComponentType.Button, max: 1 })
		collector.on('collect', async (i) => {
			if (i.customId !== 'awards-continue-1') return;
			
			await i.showModal(modal)
		})
	},
});