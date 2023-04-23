import { commandModule, CommandType } from '@sern/handler';
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, EmbedBuilder, GuildMemberRoleManager, TextChannel } from 'discord.js';

export default commandModule({
    type: CommandType.Modal,
    plugins: [],
    execute: async (ctx) => {
        await ctx.deferReply({ephemeral: true})
		const resp1 = ctx.fields.getTextInputValue('mejor-respuesta')
		const resp2 = ctx.fields.getTextInputValue('mejor-mascota')
		const resp3 = ctx.fields.getTextInputValue('opinnion')

        const embed = new EmbedBuilder(ctx.message!.embeds[1].data)
            .addFields(
                { name: 'Mejor respuesta', value: resp1 },
                { name: 'Mejor mascota', value: resp2 },
                { name: 'Opinión', value: resp3 }
            )
        const fetchMsg = await (await ctx.client.channels.fetch(process.env.AWARDS!) as TextChannel).messages.fetch(ctx.message!.embeds[0].footer!.text.replace('ID: ', ''))
        await fetchMsg.edit({
            embeds: [embed]
        })

        const userEmbed = new EmbedBuilder()
			.setColor('Random')
			.setTitle('Listo!')
			.setDescription('Se acabó! Gracias por responder. Las preguntas han sido hechas por <@630502288154427414>.\nEn el embed de más abajo podrás ver tus respuestas hechas.')
        const userButton = new ActionRowBuilder<ButtonBuilder>()
			.addComponents(
				new ButtonBuilder()
					.setCustomId('awards-responses')
					.setLabel('Enseñar respuestas finales')
					.setStyle(ButtonStyle.Secondary)
			)
        const msg = await ctx.editReply({
			embeds: [userEmbed],
            components: [userButton]
		})
        const collector = msg.createMessageComponentCollector({componentType: ComponentType.Button, time: 60_000})
        collector.on('collect', async (i) => {
            if (i.customId !== 'awards-responses') return;

            await i.deferReply({ ephemeral: true })
            await i.editReply({
                embeds: [embed]
            })
        })

        await (ctx.member?.roles as GuildMemberRoleManager).add('1060314978273472602')
    },
});