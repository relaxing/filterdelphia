

function setup_pointilisth() {
  noStroke();
  console.log("pointilisth")
  palette = [ color(150, 172, 206),
              color(229, 207, 119),
              color(186, 170, 106),
              color(106, 129, 165),
              color(89, 123, 175),
              color(52, 88, 142),
              color(30, 62, 109)]
}

function draw_pointilisth(pixels, pxSz) {
  new_w = 480*(width/height);
  image(capture,0,0,width,height,640/2-new_w/2,0,new_w,480);
  loadPixels()
  for(x = 0; x < width; x+=5 ) {
    for(y = 0; y < height; y+=5 ){
        // for(i = 0; i < d; i++){
        //     for(j = 0; j < d; j++){
          idx = bpp * ((y * d) * width * d + (x * d));
          c = color( pixels[idx], pixels[idx+ 1 ], pixels[idx + 2 ] )
          h = brightness(c)
          if( h < 22 ){
            c = palette[6]
          } else if( h < 52 ) {
            c = palette[5]
          } else if( h < 3 * 52 ) {
            c = palette[4]
          } else if( h < 4 * 52 ) {
            c = palette[3]
          } else if( h < 5 * 52 ) {
            c = palette[2]
          } else if( h < 6 * 52 ) {
            c = palette[1]
          } else {
            c = palette[0]
          }
          fill( c )
          rect( x, y, 5, 5 )
        }
    }
  }
