var palette_pointilist = [];

function setup_pointilist() {
  console.log("pointilist")
  palette_pointilist = [color(191, 110, 110),
   color( 244, 143, 66 ),
   color(250, 230, 120),
   color(80, 242, 55),
   color(55, 196, 250),
   color(163, 181, 281),
   color(238, 130, 238) ]
}

function draw_pointilist(pixels, pxSz) {
  image(capture, 0, 0, width, height);
  loadPixels();
  for( x = 0; x < width; x+=15 ) {
    for( y = 0; y < height; y+=15 ) {
      idx = bpp * ((y * d) * width * d + (x * d ));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      h = hue(c)
      if( h < 52 ) {
        c = palette_pointilist[0]
      } else if( h < 2 * 52 ) {
        c = palette_pointilist[1]
      } else if( h < 3 * 52 ) {
        c = palette_pointilist[2]
      } else if( h < 4 * 52 ) {
        c = palette_pointilist[3]
      } else if( h < 5 * 52 ) {
        c = palette_pointilist[4]
      } else if( h < 6 * 52 ) {
        c = palette_pointilist[5]
      } else {
        c = palette_pointilist[6]
      }
      fill( c )
      rect( x, y, 15, 15 )
    }
  }
}
