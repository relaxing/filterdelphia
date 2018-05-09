var pxSz = 4;

function setup() {
  createCanvas( 480, 640 )
  capture = createCapture( VIDEO )
  capture.hide()
  d = pixelDensity();
  noStroke();
  palette = [color( 75, 190, 255 ),
             color( 130, 14, 6 ),
             color( 194, 150, 238 ),
             color( 50, 205, 250)]
}

function draw() {
  image(capture, 0, 0, width, height, 640/2, 0, 480, 640)
  loadPixels()
  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
      idx = 4 * ((y * d) * width * d + (x * d ));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      //if(x > width / 2 ) {
        b = brightness(c)
        if( b < 20 ) {
          c = palette[0]
        } else if( b < 45 ) {
          c = palette[1]
        } else if( b < 55 ) {
          c = palette[2]
        } else {
          c = palette[3]
        }
    //  }
      //stroke(c)
      fill(c)
      rect( x, y, pxSz, pxSz )
    }
  }
}
