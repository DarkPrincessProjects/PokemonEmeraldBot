// Load secret data
require('dotenv').config()

// Load Event Emitter
const EventEmitter = require('events');

// Load Twitch EventSub Lister
const { TwitchEventSub } = require("./eventsub");

// Start Emulator server
const { Emulator } = require("./emulator");

class App extends EventEmitter
{
	// Not used because we need an async function thats not a constructor
	constructor() {
		super();
	}

	async init() {
		console.log("Starting...");
		console.log("Setting Up...");

		// Instantiate TwitchEventSub
		this.twitchEventSub = new TwitchEventSub();
		this.emulator = new Emulator();

		// Initialize it
		await this.twitchEventSub.init();
		await this.emulator.init();

		// Done
		console.log("Done! Server is running...");
	}
};

const app = new App();
app.init();
