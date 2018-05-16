function preload_linedrawing() {
}

function setup_linedrawing() {
  preload_linedrawing();
  console.log("linedrawing");
  noStroke();
  palette = [color(237, 235, 227), color(187, 133, 105)]
}

function draw_linedrawing() {
  new_w = 480*(width/height);
  image(capture,0,0,width,height);//,640/2-new_w/2,0,new_w,480);
  loadPixels()
  for( x = 0; x < width; x+=4) {
    for (y = 0; y < height; y+=4 ) {
      //for (i = 0; i < d; i++) {
        //for (j = 0; j < d; j++) {
        idx = 4 * ((y * d) * width * d + (x * d));
        c = color(pixels[idx], pixels[idx +1], pixels[idx+2])
        b = brightness(c)
        if( b > 42 ) {
          c = palette[0]
        } else {
          c = palette [1]
        }
        fill( c )
        ellipse( x, y, 4.5, 4.5)
      }
    }
}
