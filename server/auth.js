// Load Authenticator
const { ClientCredentialsAuthProvider } = require('twitch-auth');

// Load ApiClient
const { ApiClient } = require('twitch');

// Create provider and client
const provider = new ClientCredentialsAuthProvider(process.env.TWITCH_BOT_CLIENTID, process.env.TWITCH_BOT_SECRET);
const client = new ApiClient({ authProvider: provider });

// Export
module.exports = {
	provider,
	client,
};
