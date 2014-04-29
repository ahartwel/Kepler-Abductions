
void setup() {
 size(200,200);
background(0,0,0); 

  
}

void draw() {
  if (planet!=null) {
  size(window.innerWidth,window.innerHeight);
  
  ellipse(xPos,yPos, planet.RPLANET*(.3*width), planet.RPLANET*(.3*width));
  
  ellipse(xPos+planet.RPLANET*(.3*width)+10,yPos, .3*width, .3*width);
  


  }
}
