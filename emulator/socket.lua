-- You must use emulator BizHawk 2.4.2, modern versions are bugged and don't
-- work

-- You must start the emulator with these additional arguments
-- --socket_ip=127.0.0.1 --socket_port=Port number in .env

-- Everything runs on the main thread
-- Have a low timeout so it doesn't wait too long and freeze the game
comm.socketServerSetTimeout(5);

-- Check for empty strings
local function isEmpty(s)
  return s == nil or s == ''
end

-- Loop every frame
while true do

	-- Process everything else on the thread this frame
	-- This keeps things responsive and makes this a lower priority
	emu.yield();

	-- Get a message from the server
	local msg = comm.socketServerResponse();

	-- Print message if there is one to print
	if not isEmpty(msg) then
		print(msg);
	end

	-- Advance emulator frame
	emu.frameadvance();
end
