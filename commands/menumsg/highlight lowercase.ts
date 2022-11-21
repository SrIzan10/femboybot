import { commandModule, CommandType } from "@sern/handler";
import { publish } from "../../src/plugins/publish.js";
import db from "../../schemas/highlights.js";
import { Model } from "mongoose";

export default commandModule({
	name: 'highlight',
	type: CommandType.MenuMsg,
	plugins: [publish()],
	// alias : [],
	execute: async (ctx) => {
		await ctx.deferReply();
		const author = ctx.targetMessage.author;
		const message = ctx.targetMessage.id;
		db.countDocuments(
			{ msgid: message },
			async function (err: Error, count: number) {
				if (err) throw err
				if (count > 0) {
					return await ctx.editReply({
						content: "Este mensaje ya ha sido guardado en la base de datos",
					});
				} else {
					const save = new db({
						authorid: author.id,
						channelid: ctx.channel!.id,
						msgid: message,
					});
					await save.save();
					await ctx.editReply({
						content: `El mensaje de ${author} con ID \`${message}\` ha sido guardado correctamente en la base de datos!`,
					});
				}
			}
		);
	},
});
