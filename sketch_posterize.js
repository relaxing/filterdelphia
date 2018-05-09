

function setup() {
  createCanvas( 640, 480 )
  capture = createCapture( VIDEO )
  capture.hide()
  d = pixelDensity();
  noStroke();
  palette = [color( 75, 190, 255 ),
             color( 130, 14, 6 )]
}

function draw() {
  image(capture, 0, 0, 640, 480)
  loadPixels()
  for( x = 0; x < width; x+=4 ) {
    for( y = 0; y < height; y+=4 ) {
      idx = 4 * ((y * d) * width * d + (x * d ));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      b = brightness(c)
      if( b > 44 ) {
        c = palette[0]
      } else {
        c = palette[1]
      }
      fill( c )
      rect( x, y, 4, 4 )
    }
  }
}
