import { commandModule, CommandType } from "@sern/handler";
import {
	ActionRowBuilder,
	ButtonBuilder,
	ButtonStyle,
	ComponentType,
	GuildMember,
	ModalActionRowComponentBuilder,
	ModalBuilder,
	TextInputBuilder,
	TextInputStyle,
} from "discord.js";
import { publish } from "../../plugins/publish.js";

export default commandModule({
	type: CommandType.Both,
	plugins: [publish()],
	description: "pepega!",

	execute: async (ctx, args) => {
		const fetchUser = (await ctx.guild!.members.fetch(
			ctx.user.id
		)) as GuildMember;
		if (fetchUser.roles.cache.has("1060314978273472602")) {
			return ctx.reply("No puedes votar de nuevo.");
		}
		if (!fetchUser.roles.cache.has("939452789434744872")) {
			return ctx.reply("No eres del grupo :skull:");
		}

		const start = new ActionRowBuilder<ButtonBuilder>().addComponents(
			new ButtonBuilder()
				.setCustomId("awards-send")
				.setLabel("Empezar")
				.setStyle(ButtonStyle.Success)
		);

		const modal = new ModalBuilder()
			.setCustomId('awards-1')
			.setTitle('Awards (parte 1)');
		const input = new TextInputBuilder()
			.setCustomId('clip-del-ano')
			.setLabel('Clip del año')
			.setStyle(TextInputStyle.Short);
		const input2 = new TextInputBuilder()
			.setCustomId('video-del-ano')
			.setLabel('Vídeo del año')
			.setStyle(TextInputStyle.Short);
		const input3 = new TextInputBuilder()
			.setCustomId('integrante-racista')
			.setLabel('Integrante más racista')
			.setStyle(TextInputStyle.Short);
		const input4 = new TextInputBuilder()
			.setCustomId('bot-mas-importante')
			.setLabel('Bot más importante')
			.setStyle(TextInputStyle.Short);
		const input5 = new TextInputBuilder()
			.setCustomId('mejor-mc-server')
			.setLabel('Mejor servidor de MC jugado')
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

		const message = await ctx.reply({
			content: `Bienvenido ${ctx.user}! Empieza haciendo click en el botón!\nTOMATELO EN SERIO PORFIII`,
			components: [start],
		})
		const collector = message.createMessageComponentCollector({componentType: ComponentType.Button, filter: i => i.user.id === ctx.user.id, time: 15_000})
		collector.on('collect', async (i) => {
			if (i.customId !== 'awards-send') return;

			await i.showModal(modal)
		})
		collector.on('ignore', async (i) => {
			i.reply({
				content: 'El botón no es para tí backstaber!',
				ephemeral: true,
			})
		})
	},
});
