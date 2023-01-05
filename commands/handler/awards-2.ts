import { commandModule, CommandType } from '@sern/handler';
import { ModalBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, ModalActionRowComponentBuilder, EmbedBuilder, TextChannel, ButtonBuilder, ButtonStyle, ComponentType } from 'discord.js';

export default commandModule({
	type: CommandType.Modal,
	plugins: [],
	execute: async (ctx) => {
		await ctx.deferReply({ephemeral: true})
		const resp1 = ctx.fields.getTextInputValue('mas-horas-llamada')
		const resp2 = ctx.fields.getTextInputValue('mas-mensajes-enviados')
		const resp3 = ctx.fields.getTextInputValue('mejor-emote')
		const resp4 = ctx.fields.getTextInputValue('integrante-degenerado')
		const resp5 = ctx.fields.getTextInputValue('juego-mas-jugado')
		
		const modal = new ModalBuilder()
			.setCustomId('awards-3')
			.setTitle('Awards (parte 3)');
		const input = new TextInputBuilder()
			.setCustomId('mejor-respuesta')
			.setLabel('Premio a la mejor respuesta')
			.setPlaceholder('What\'s bofa? BOFA DEEZ NUTS HAHAHAHAAAA')
			.setStyle(TextInputStyle.Short);
		const input2 = new TextInputBuilder()
			.setCustomId('mejor-mascota')
			.setLabel('Mejor mascota del servidor')
			.setPlaceholder('Creo que el olivas se refería a un animal')
			.setStyle(TextInputStyle.Short);
		const input3 = new TextInputBuilder()
			.setCustomId('opinnion')
			.setLabel('Algo que quieras que añada al server?')
			.setPlaceholder('Escribe, no te cortes! :DIESOFCRINGE:')
			.setStyle(TextInputStyle.Paragraph);
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
		modal.addComponents([one, two, three]);

		const embed = new EmbedBuilder(ctx.message!.embeds[1].data)
			.addFields(
				{ name: 'Integrante con más horas en llamada', value: resp1 },
				{ name: 'Integrante con más mensajes enviados', value: resp2 },
				{ name: 'Mejor emote', value: resp3 },
				{ name: 'Integrante más degenerado', value: resp4 },
				{ name: 'Juego más jugado', value: resp5 },
			)
		const fetchMsg = await (await ctx.client.channels.fetch(process.env.AWARDS!) as TextChannel).messages.fetch(ctx.message!.embeds[0].footer!.text.replace('ID: ', ''))
		const responseMsg = await fetchMsg.edit({
			embeds: [embed]
		})
		
		const userEmbed = new EmbedBuilder()
			.setColor('Random')
			.setTitle('Ya casi estás!')
			.setDescription('Continúa dándole al botón!\nEn el embed de más abajo podrás ver tus respuestas hechas de hasta ahora.')
			.setFooter({ text: `ID: ${responseMsg.id}` })
		const userButton = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('awards-continue-2')
					.setLabel('Continuar')
					.setStyle(ButtonStyle.Success)
			)
		const userMsg = await ctx.editReply({
			embeds: [userEmbed, embed],
			components: [userButton]
		})
		const collector = userMsg.createMessageComponentCollector({ time: 60_000, componentType: ComponentType.Button, max: 1 })
		collector.on('collect', async (i) => {
			if (i.customId !== 'awards-continue-2') return;
			
			await i.showModal(modal)
		})
	},
});