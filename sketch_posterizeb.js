

var capture;


function setup_posterizeb() {
  console.log("posterizeb");
  noStroke();
    pen_palette = [ color( 218, 206, 192, 30 ),
                    color( 115, 105, 100, 70 ),
                    color( 43, 44, 39, 255 )]
}

function draw_posterizeb(pixels, pxSz) {
  capture.loadPixels()
  for( x = 0; x < capture.width; x+=pxSz ) {
    for( y = 0; y < capture.height; y+=pxSz ) {
      idx = 4 * ((y * d) * capture.width * d + (x * d));
      c = color( capture.pixels[idx], capture.pixels[idx+1], capture.pixels[idx+2] )
      b = brightness(c)
      if (b < 20) {
        c = pen_palette[2]
      } else if (b < 40 ) {
        c = pen_palette[1]
      } else {
        c = pen_palette[0]
      }
      fill( c )
      rect( x, y, pxSz, pxSz)
    }
  }
}
