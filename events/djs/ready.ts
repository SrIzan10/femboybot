import { EventType, eventModule } from "@sern/handler";

export default eventModule({
	type: EventType.Discord,
	execute () {
        console.log('el bot c ha ensendio')
	},
});