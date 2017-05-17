#include <SoftwareSerial.h>
#define SSerialRX        4  //Serial Receive pin
#define SSerialTX        3  //Serial Transmit pin
#define SSerialTxControl 5
SoftwareSerial RS485(SSerialRX, SSerialTX); // RX, TX
#define RS485Transmit    HIGH
#define RS485Receive     LOW

#define ID0 12
#define ID1 13
#define BUTTON_WHITE 0
#define BUTTON_RED 1
#define BUTTON_YELLOW 2
#define BUTTON_BLUE 3

uint16_t buttons[4];
uint8_t button_state = 0;
uint8_t id = 0;


void setup () {
	Serial.begin(9600);
	pinMode(ID0, INPUT);
	pinMode(ID1, INPUT);
	pinMode(SSerialTxControl, OUTPUT);    
	// Default RX for RS485
	digitalWrite(SSerialTxControl, RS485Receive);
	RS485.begin(9600);   // set the data rate 
	// Read ID
	id += digitalRead(ID0);
	id += digitalRead(ID1);
	Serial.println("[Button Box]");
	Serial.print("[ID: ");
	Serial.print(id);
	Serial.println("]");
/*
	Serial.println(digitalRead(ID0));
	Serial.println(digitalRead(ID1));
*/
}

void loop () {
	uint8_t b;
	for(b = 0; b < 4; b++) {
		buttons[b] = analogRead(b);
		if(buttons[b] > 500 && button_state == 0) {
			button_state = 1;
			txButton(b);
			delay(200);
		}
		else if(buttons[b] < 500 && button_state == 1) {
			button_state = 0;
		}
	}
}

void txButton(uint8_t button) {
	Serial.print("#"); Serial.print(id); Serial.print(":");
	Serial.print(button);
	Serial.println(";");
	digitalWrite(SSerialTxControl, RS485Transmit);
	RS485.print("#"); RS485.print(id); RS485.print(":");
	RS485.print(button);
	RS485.println(";");
	digitalWrite(SSerialTxControl, RS485Receive);
	delay(50);
}
