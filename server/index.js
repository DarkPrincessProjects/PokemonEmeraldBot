console.log("Starting...");
console.log("Setting Up...");

// Load secret data
require('dotenv').config()

// Load Twitch EventSub Lister
const eventsub = require("./eventsub");

// Start Emulator server
const emulator = require("./emulator");

// Main Function
async function main() {

	console.log("Connecting to Twitch...");

	// Connect Eventsub Listener
	await eventsub.listen();

	console.log("Listening to Twitch Point Redemptions...");

	// Listen in on point redemptions
	await eventsub.subscribeToChannelRedemptionAddEvents(process.env.TWITCH_USERID, e => {
		console.log(`${e.userDisplayName} just redeemed ${e.rewardTitle}`);
	});

	console.log("Done! Server is running...");
}

main();
