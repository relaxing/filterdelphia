

function setup() {
  createCanvas( 640, 480 )
  capture = createCapture( VIDEO )
  capture.hide()
  d = pixelDensity();
  noStroke();
  palette = [color(91, 10, 10),
   color( 244, 143, 66 ),
   color(250, 230, 120),
   color(80, 242, 55),
   color(55, 196, 250),
   color(63, 81, 181),
   color(238, 130, 238) ]
}

function draw() {
  image(capture, 0, 0, 640, 480)
  loadPixels()
  for( x = 0; x < width; x+=15 ) {
    for( y = 0; y < height; y+=15 ) {
      idx = 4 * ((y * d) * width * d + (x * d ));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      h = hue(c)
      if( h < 52 ) {
        c = palette[0]
      } else if( h < 2 * 52 ) {
        c = palette[1]
      } else if( h < 3 * 52 ) {
        c = palette[2]
      } else if( h < 4 * 52 ) {
        c = palette[3]
      } else if( h < 5 * 52 ) {
        c = palette[4]
      } else if( h < 6 * 52 ) {
        c = palette[5]
      } else if( h < 7 * 52 ) {
        c = palette[6]
      }
      fill( c )
      rect( x, y, 15, 15 )
    }
  }
}
