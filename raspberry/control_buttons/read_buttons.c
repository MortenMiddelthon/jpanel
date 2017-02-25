#include <stdio.h>
#include <stdlib.h>
#include <wiringPi.h>
#include <xdo.h>
#include <unistd.h>

// GPIO 23
#define RELOAD 4

// Define which key to simulate, ASCII DEC value
#define KEY 114

void setup(void) {
	if (geteuid() != 0) {
		printf("This program needs to run as root\n");
		exit(0);
	}
	wiringPiSetup () ;
	pinMode (RELOAD, INPUT);
}

int main(void) {
	xdo_t * x = xdo_new(":0.0");
	int reload = 0, c, state = 0;
	setup();
	printf("Read control buttons\n");
	for(;;) {
		reload = digitalRead(RELOAD);
		if(reload == LOW && state == 0) {
			/*
			ungetc(KEY, stdin);
			c = getchar();
			printf("%c - Ascii = %d\n",c,c);
			*/
			xdo_send_keysequence_window (x, CURRENTWINDOW, "Control_L+r", 0);
			state = 1;
		}
		else if (reload == HIGH && state == 1) {
			state = 0;
		}
	}
	return 0;
}
