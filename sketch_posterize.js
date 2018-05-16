
function setup_posterize() {
  console.log("posterize");
  transp = 128;
  palette_posterize = [color( 130, 14, 6, transp ),
             color( 75, 190, 255, transp ),
             color( 194, 150, 238, transp ),
             color( 50, 205, 250, transp )]
  rands = Array.from({length: ((width)*(height))}, () => Math.floor(random(15,15)));
}

function draw_posterize(pixels, pxSz){
  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
      idx = bpp * ((y * d) * width * d + (x * d));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] );
      b = brightness(c);
      if( b < 40 ) {
        c = palette_posterize[0];
      } else if( b < 75 ) {
        c = palette_posterize[1];
      } else if( b < 95 ) {
        c = palette_posterize[2];
      } else {
        c = palette_posterize[3];
      }
      fill(c);
      rect( x, y, rands[y*width+x], rands[y*width+x] );
    }
  }
}
