#!/bin/bash

# Load NVM and use the correct Node.js version
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
nvm use 22.9.0

# Set DISPLAY for GUI and allow access
export DISPLAY=:0
xhost +local:  # This should be `+local:`, not `-local:`

# Start up the game server with sudo
sudo /home/ryan/.nvm/versions/node/v22.9.0/bin/node /home/ryan/Documents/git/skeeball/server/index.js &

# Start up the scoreboard
/home/ryan/.nvm/versions/node/v22.9.0/bin/npm --prefix /home/ryan/Documents/git/skeeball/gui run dev &  

# URL to open
URL="http://skeeball.local:5173"

# Open Chromium browser to the specified URL in fullscreen/kiosk without sudo
chromium-browser "$URL" --kiosk &  

wait