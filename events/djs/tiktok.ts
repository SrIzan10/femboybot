import { EventType, eventModule } from "@sern/handler";
import { ActionRowBuilder, AttachmentBuilder, ButtonBuilder, Client, Message } from "discord.js";
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

			const scrap = await axios.get(`https://www.tikwm.com/api/?url=${link}`, { headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/110.0.0.0 Safari/537.36' } }).then(res => res.data)
			const shorten = await axios.post(`https://cleanuri.com/api/v1/shorten`, { 'url': scrap.data.play }).then(res => res.data)
			const audio = await axios.get(scrap.data.music, { responseType: 'arraybuffer' }).then(res => res.data)
			const audioAttachment = new AttachmentBuilder(audio, { name: 'audio.mp3' })

			await message.reply({
				content: `Vídeo: ${shorten.result_url}`,
				files: [audioAttachment]
			})
		} catch (e) {
			message.react('❌')
			console.log(e)
		}
	},
});