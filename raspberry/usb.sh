#!/bin/sh
SPEED=9600
DEVICE=/dev/ttyUSB0
stty -F $DEVICE cs8 $SPEED ignbrk -brkint -icrnl -imaxbel -opost -onlcr -isig -cooked -iexten -echo -echoe -echok -echoctl -echoke noflsh -ixon -crtscts
# cat < $DEVICE
