// You must use emulator BizHawk 2.4.2, modern versions are bugged and don't
// work

// Load Event Emitter
const EventEmitter = require('events');

// Load HTTP Server
const Net = require('net');

// Util for Promisfy
const util = require("util");

class Emulator extends EventEmitter
{
    // Not used because we need an async function thats not a constructor
    constructor() {
        super();
    }

    // Real constructor that we can call and wait to complete
    async init(app) {

        this.app = app;

        // Set socket to default value indicating no connection exists
        this.socket = null;

        // Create Server
        this.server = Net.createServer();

        // Convert callback to promise
        this.server.listenAsync = util.promisify(this.server.listen);

        // Establish Listeners
        this.server.on('connection', this.onConnect.bind(this));

        // Wait to establish listener
        await this.server.listenAsync(process.env.EMULATOR_PORT);

        console.log("Ready for emulator to connect to localhost: " + 
            process.env.EMULATOR_PORT);
    }

    async onConnect(socket) {
        console.log('Emulator connected...');
        console.log('Connection status: ' + socket.readyState);

        // Incomming messages are strings
        socket.setEncoding("utf8");

        // Save socket replacing old one, we only deal with one connection
        this.socket = socket;

        // Establish listeners
        socket.on('data', this.onMsg.bind(this));
        socket.on('error', this.onEnd.bind(this));
    }

    async onMsg(msg) {
        console.log(`Emulator sent data: ${msg}`);
        this.socket.write(msg);
    }

    async onEnd() {

        // Clear socket connection
        this.socket = null;

        console.log(`Emulator connection ended`);
    }
};

module.exports = {
    Emulator
}
