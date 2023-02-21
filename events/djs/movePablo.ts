import { EventType, eventModule } from "@sern/handler";
import { VoiceState } from "discord.js";

export default eventModule({
	type: EventType.Discord,
	name: 'voiceStateUpdate',
	execute: async (oldState: VoiceState, newState: VoiceState) => {
		if (newState.member!.id !== '954042602615869520') return;
	},
});