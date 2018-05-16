function setup_statue() {
  console.log("statue");
  noStroke();
  palette = [color(0, 10, 10),
   color( 244, 244, 244 ),
   color(200, 200, 200),
   color(150, 150, 150),
   color(100, 100, 100),
   color(50, 50, 50),
   color(255, 255, 255) ]
}

function draw_statue(pixels, pxSz) {
  new_w = 480*(width/height);
  image(capture,0,0,width,height,640/2-new_w/2,0,new_w,480);
  loadPixels()
  // filter(BLUR);
  // blur made it run waay slower

  for( x = 0; x < width; x+=15 ) {
    for( y = 0; y < height; y+=15 ) {
      idx = 4 * ((y * d) * width * d + (x * d ));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      b = brightness(c)
      if( b < 52 ) {
        c = palette[0]
      } else if( b < 2 * 52 ) {
        c = palette[1]
      } else if( b < 3 * 52 ) {
        c = palette[2]
      } else if( b < 4 * 52 ) {
        c = palette[3]
      } else if( b < 5 * 52 ) {
        c = palette[4]
      } else if( b < 6 * 52 ) {
        c = palette[5]
      } else if( b < 7 * 52 ) {
        c = palette[6]
      }
      fill( c )
      rect( x, y, 15, 15)
    }
  }
}
