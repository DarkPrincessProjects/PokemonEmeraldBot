# PokeEmerald GameBot

This is the bot that pulls information from Twitch and communicates it to
BizHawk 2.4.2 using Lua and HTTP Sockets. Lua then relays the information to a
special version of Pokemon Emerald.

**This is not finished!!!**

To use this you must:

* Have all the Twitch information (It's a lot)
* Have NGROK running
* Have BizHawk 2.4.2, newer version will not work right
* Have NodeJS
* Have the special version of Pokemon Emerald which has not been made yet

Copy `.env.template` to a file called `.env` and fill out information there.
Start the emulator with these arguments
`--socket_ip=127.0.0.1 --socket_port=Port number in .env`

## License
Apache 2.0 (Do whatever you want just credit me back)
https://www.apache.org/licenses/LICENSE-2.0.txt

## Contributions Welcome
Just fork and send a pull request
