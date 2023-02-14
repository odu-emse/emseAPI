import { Injectable } from "@nestjs/common";
import { PubSub } from "graphql-subscriptions";

@Injectable()
export class PubSubService {
	private pubSub: PubSub;

	constructor() {
		this.pubSub = new PubSub();
	}

	publish(event: string, data: any) {
		this.pubSub.publish(event, data).catch((e) => {
			console.log(e);
		});
	}

	subscribe(event: string) {
		return this.pubSub.asyncIterator(event);
	}
}
