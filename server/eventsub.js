// Load EventSub
const { ReverseProxyAdapter, EventSubListener } = require('twitch-eventsub');

// Load Auth
const auth = require("./auth");

// Create Listener
const inst = new EventSubListener(auth.client, new ReverseProxyAdapter({
	hostName: process.env.NGROK_HOST,
	port: process.env.NGROK_PORT
}), process.env.TWITCH_EVENTSUB_SECRET);

// Export Listener
module.exports = inst;
