import { commandModule, CommandType } from '@sern/handler';
import { publish } from '../../plugins/publish.js';
import db from "../../schemas/highlights.js";
import { time } from 'discord.js';

export default commandModule({
	type: CommandType.Both,
	plugins: [publish()],
	description: 'Consigue un highlight random',
	//alias : [],
	execute: async (ctx, args) => {
		db.count().exec(function(err: Error, count: number){

			var random = Math.floor(Math.random() * count);
		  
			db.findOne().skip(random).exec(
			  async function (err: Error, result: any) {
				if (err) throw err
				const fetchedmessage = await (await (ctx.channel!.fetch(result.channelid))).messages.fetch(result.msgid)
				await ctx.reply({content: `[Tu mensaje random](${fetchedmessage.url})\nAutor: ${fetchedmessage.author}\nMensaje creado ${time(fetchedmessage.createdAt, 'R')}`, ephemeral: true, allowedMentions: { repliedUser: false }})
			});
		  
		  });
	},
});
