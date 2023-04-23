import { EventType, eventModule } from "@sern/handler";
import { VoiceChannel, VoiceState } from "discord.js";

export default eventModule({
	type: EventType.Discord,
	name: 'voiceStateUpdate',
	execute: async (oldState: VoiceState, newState: VoiceState) => {
		if (newState.member!.id !== '954042602615869520') return;

		if (newState.channelId === '940619088550559745' && (await newState.client.channels.fetch('839200013618774028') as VoiceChannel).members.size >= 1) {
			await newState.member?.voice.setChannel('839200013618774028')
		}
	},
});