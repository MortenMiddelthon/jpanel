
#     -lwiringPi
#  to your compile line(s) To use the Gertboard, MaxDetect, etc.
#    code (the devLib), you need to also add:
#        -lwiringPiDev

DEBUG	= -O3
CC	= gcc
INCLUDE	= -I/usr/local/include
CFLAGS	= $(DEBUG) -Wall $(INCLUDE) -Winline -pipe

LDFLAGS	= -L/usr/local/lib
LDLIBS    = -lwiringPi -lwiringPiDev -lpthread -lm -lxdo 

SRC	= read_buttons.c

read_buttons:
	$(CC) -o read_buttons read_buttons.c $(LDFLAGS) $(LDLIBS)

make clean:
	rm read_buttons

make run:
	sudo ./read_buttons
