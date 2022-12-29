import { EventType, eventModule } from "@sern/handler";
import { Client } from "discord.js";

export default eventModule({
	type: EventType.Discord,
	execute: async () => {
        console.log('el bot c ha ensendio');
	},
});