#define WHITE 5
#define RED 6
#define ID0 12
#define ID1 13
#define BUTTON_WHITE 0
#define BUTTON_RED 1

uint8_t white = 0, red = 0, white_state = 0, red_state = 0;
uint8_t id = 0;


void setup () {
	Serial.begin(9600);
	pinMode(WHITE, INPUT);
	pinMode(RED, INPUT);
	pinMode(ID0, INPUT);
	pinMode(ID1, INPUT);
	id += digitalRead(ID0);
	id += digitalRead(ID1);
	Serial.println("[Button Box]");
	Serial.print("[ID: ");
	Serial.print(id);
	Serial.println("]");
}

void loop () {
	white = digitalRead(WHITE);
	red = digitalRead(RED);
	if(white == LOW && white_state == 0) {
		white_state = 1;
		txButton(BUTTON_WHITE);
		delay(200);
	}
	else if(white == HIGH && white_state == 1) {
		white_state = 0;
	}
	if(red == LOW && red_state == 0) {
		red_state = 1;
		txButton(BUTTON_RED);
		delay(200);
	}
	else if(red == HIGH && red_state == 1) {
		red_state = 0;
	}
	delay(50);
}

void txButton(uint8_t button) {
	Serial.print("#"); Serial.print(id); Serial.print(":");
	Serial.print(button);
	Serial.println(";");
}
