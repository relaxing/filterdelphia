
function setup_noeffect() {
  console.log("noeffect")
  return;
}

function draw_noeffect(pixels, pxSz) {
  image(capture, 0, 0, width, height);
  loadPixels();
  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
      idx = bpp * ((y * d) * width * d + (((width-1)-x) * d));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      fill(c)
      rect( x, y, pxSz, pxSz )
    }
  }
}
