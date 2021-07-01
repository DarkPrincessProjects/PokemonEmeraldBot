// Load Event Emitter
const EventEmitter = require('events');

// Load EventSub
const { ReverseProxyAdapter, EventSubListener } = require('twitch-eventsub');

// Load Auth
const { client } = require("./auth");

class TwitchEventSub extends EventEmitter
{
	// Not used because we need an async function thats not a constructor
	constructor() {
		super();
	}

	// Real constructor that we can call and wait to complete
	async init() {
		console.log("Connecting to Twitch...");

		// Save client to class
		this.client = client;

		// Create listener
		this.listener = new EventSubListener(client, new ReverseProxyAdapter({
			hostName: process.env.NGROK_HOST,
			port: process.env.NGROK_PORT
		}), process.env.TWITCH_EVENTSUB_SECRET);

		// Connect Eventsub Listener
		await this.listener.listen();

		console.log("Listening to Twitch Point Redemptions...");

		// Listen in on point redemptions
		await this.listener.subscribeToChannelRedemptionAddEvents(
			process.env.TWITCH_USERID, this.onPointRedemption.bind(this));
	}

	async onPointRedemption(event) {
		console.log(`${event.userDisplayName} just redeemed ${event.rewardTitle}`);
	}
};

module.exports = {
	TwitchEventSub
};
