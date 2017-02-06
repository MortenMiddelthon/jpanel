#include <SoftwareSerial.h>
#define SSerialRX        4  //Serial Receive pin
#define SSerialTX        3  //Serial Transmit pin
#define SSerialTxControl 5
SoftwareSerial RS485(SSerialRX, SSerialTX); // RX, TX
#define RS485Transmit    HIGH
#define RS485Receive     LOW

#define WHITE 1
#define RED 0
#define ID0 12
#define ID1 13
#define BUTTON_WHITE 0
#define BUTTON_RED 1

uint16_t white = 0, red = 0;
uint8_t white_state = 0, red_state = 0;
uint8_t id = 0;


void setup () {
	Serial.begin(9600);
	pinMode(WHITE, INPUT);
	pinMode(RED, INPUT);
	pinMode(ID0, INPUT);
	pinMode(ID1, INPUT);
	pinMode(SSerialTxControl, OUTPUT);    
	digitalWrite(SSerialTxControl, RS485Receive);
	RS485.begin(9600);   // set the data rate 


	id += digitalRead(ID0);
	id += digitalRead(ID1);
	Serial.println("[Button Box]");
	Serial.print("[ID: ");
	Serial.print(id);
	Serial.println("]");
}

void loop () {
	white = analogRead(WHITE);
	red = analogRead(RED);
	if(white < 500 && white_state == 0) {
		white_state = 1;
		txButton(BUTTON_WHITE);
		delay(200);
	}
	else if(white > 500 && white_state == 1) {
		white_state = 0;
	}
	if(red < 500 && red_state == 0) {
		red_state = 1;
		txButton(BUTTON_RED);
		delay(200);
	}
	else if(red > 500 && red_state == 1) {
		red_state = 0;
	}
	delay(50);
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
