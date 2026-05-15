#!/bin/bash
npx serve dist -l 3000 &
sleep 2
echo "Server running at http://localhost:3000"
