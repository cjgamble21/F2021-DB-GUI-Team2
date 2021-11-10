#include "mbed.h" 
#include "TS_DISCO_F429ZI.h"  // Include file required for touch screen 
#include "LCD_DISCO_F429ZI.h"  // Include file required for LCD 
 
LCD_DISCO_F429ZI lcd;    //  Initialize LCD screen object for output 
TS_DISCO_F429ZI ts;     // Initialize touch screen object for input 
TS_ StateTypeDef TS_State;    // Declare variable to hold state information  
          //      for touch screen 
 
int main() 
{ 