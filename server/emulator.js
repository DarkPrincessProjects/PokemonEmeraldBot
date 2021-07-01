// You must use emulator BizHawk 2.4.2, modern versions are bugged and don't
// work

const Net = require('net');

const server = Net.createServer();

server.listen(process.env.EMULATOR_PORT, () => {
    console.log(`Ready for emulator to connect to localhost:${process.env.EMULATOR_PORT}`);
});

server.on('connection', function(socket) {
    console.log('Emulator connected...');
    console.log('Connection status: ' + socket.readyState);
    socket.setEncoding("utf8");

    socket.on('data', function(chunk) {
        console.log(`Emulator sent data: \n${chunk.toString()}`);
        socket.write(chunk.toString());
    });

    socket.on('error', function(chunk) {
        console.log(`Emulator connection crash`);
    });
});
