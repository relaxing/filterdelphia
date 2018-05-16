var capture;


function setup_stainglass() {
  console.log("stainglass");
  noStroke();
  palette = [
    color(249, 234, 212), //skintone
    color(14, 10, 255), //blue
    color(83, 198, 252), //aqua
    color(0, 204, 13), //green
    color(242, 255, 0), //yellow
    color(255, 40, 0), //red
    color(255, 0, 250) //fuschia
    ]
}

function draw_stainglass(pixels, pxSz) {
  new_w = 480*(width/height);
  image(capture,0,0,width,height,640/2-new_w/2,0,new_w,480);
  // filter(INVERT)
  loadPixels();
  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
          idx = 4 * ((y * d) * width * d + (x * d));
          c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
          h = hue(c)
          if( h < 25 ) {
            c = palette[0]
          } else if( h < 50 ) {
            c = palette[1]
          } else if( h < 100 ) {
            c = palette[2]
          } else if( h < 150 ) {
            c = palette[3]
          } else if( h < 200 ) {
            c = palette[4]
          } else if( h < 250 ) {
            c = palette[5]
          } else {
            c = palette[6]
          }
          fill( c )
          rect( x, y, pxSz/2, pxSz/2 )
          }
        }
      }
