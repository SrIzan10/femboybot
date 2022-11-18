import { EventType, eventModule } from "@sern/handler";

export default eventModule({
	type: EventType.Sern,
	execute(err) {
		console.log(err);
	},
});