//Ryan Fleck - Ardu_LED_Hack.ino - uOttaHack 2018

//Define LED pins.
#define greenLED 5
#define redLED 6
#define blueLED 7

int lastVal;

void redLEDt(){
  digitalWrite(greenLED,LOW);
  digitalWrite(blueLED,LOW);
  digitalWrite(redLED,HIGH);
}
void blueLEDt(){
  digitalWrite(greenLED,LOW);
  digitalWrite(blueLED,HIGH);
  digitalWrite(redLED,LOW);
}
void greenLEDt(){
  digitalWrite(greenLED,HIGH);
  digitalWrite(blueLED,LOW);
  digitalWrite(redLED,LOW);
}


void animation(){
  redLEDt();
  delay(100);
  blueLEDt();
  delay(100);
  greenLEDt();
  delay(100);
}

void allLow(){
  digitalWrite(greenLED,LOW);
  digitalWrite(blueLED,LOW);
  digitalWrite(redLED,LOW);
}

void setup() {
  pinMode(greenLED, OUTPUT);
  pinMode(redLED, OUTPUT);
  pinMode(blueLED, OUTPUT);
  Serial.begin(9600);
  lastVal=0;
  allLow();
  
}

void loop() {
  while (Serial.available() > 0) {
    int serialInputVal = Serial.read();
    serialInputVal -= 48;
    Serial.print("ARDUINO SERIAL RECIEVED: ");
    Serial.println(serialInputVal);
    
    if(serialInputVal == 5)
    {
      greenLEDt();
      lastVal=5;
      Serial.print("DONE");
    }
    else if(serialInputVal == 6)
    {
      redLEDt();
      lastVal=6;
      Serial.print("DONE");
    }
    else if(serialInputVal == 7)
    {
      blueLEDt();
      lastVal=7;
      Serial.print("DONE");
    }
    else{
      animation();
      allLow();
      Serial.print("DONE");
    }
    
    delay(1);
  }
}





