import { EmbedBuilder, GuildMember, TextChannel } from "discord.js";

import { EventType, eventModule } from "@sern/handler";

export default eventModule({
	type: EventType.Discord,
	execute(member: GuildMember) {
		const newMemberEmbed = new EmbedBuilder()
			.setColor("Random")
			.setTitle("Nuevo miembro!")
			.setDescription(`${member.user} acaba de entrar al servidor, oh no`)
			.setThumbnail(member.user.displayAvatarURL())
            .setFooter({text: 'Ya le he dado automáticamente el rol de gente limitada.'})
			.setTimestamp();
		const channel = member.client.guilds.cache
			.get("839200013187285002")!
			.channels.cache.get("939533050205839430") as TextChannel;
		channel.send({ embeds: [newMemberEmbed] });
        member.roles.add('940618686853677116')
	},
});
