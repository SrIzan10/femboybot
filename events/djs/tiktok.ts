import { EventType, eventModule } from "@sern/handler";
import { Client, Message } from "discord.js";
import tiktok from 'tiktok-scraper-ts'
import axios from 'axios'

export default eventModule({
	type: EventType.Discord,
	name: 'messageCreate',
	execute: async (message: Message) => {
        if (!message.content.includes('tiktok.com')) return;

		try {
			const index = message.content.indexOf("https://");
			let link = 'some goofy ahh string that is gonna be replaced'
			if (index !== -1) {
				let endIndex = message.content.indexOf(" ", index);
				if (endIndex === -1) {
					endIndex = message.content.length;
				}
				link = message.content.substring(index, endIndex);
			}

			const scrap = await tiktok.fetchVideo(link) as tiktok.Video

			const shorten = await axios.get(`https://cutt.ly/api/api.php?key=${process.env.CUTTLY}&short=${scrap.downloadURL}`).then(res => res.data)

			await message.reply({
				content: `Ok, tengo el enlace al vídeo: ${shorten.url.shortLink}`
			})
		} catch {
			message.react('❌')
		}
	},
});