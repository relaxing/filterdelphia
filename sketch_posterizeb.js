

var capture;


function setup_posterizeb() {
  console.log("posterizeb");
  noStroke();
    palette = [ color( 183, 168, 155 ), //red
                color( 218, 206, 192 ), //yellow
                color( 133, 121, 112 ), //orange
                color( 193, 185, 183 ), //green
                color( 172, 167, 163 ), //blue
                color( 255, 202, 178 ), //violet
                color( 143, 144, 139 )  //indego
              ]
      }

function draw_posterizeb(pixels, pxSz) {
  new_w = 480*(width/height);
  image(capture,0,0,width,height,640/2-new_w/2,0,new_w,480);
  loadPixels()
  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
      idx = 4 * ((y * d) * width * d + (x * d));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      h = hue(c)
      if (h < 52) {
        c = palette[6]
      } else if(h < 1 * 52) {
        c = palette[5]
      } else if(h < 2 * 52) {
        c = palette[4]
      } else if(h < 3 * 52) {
        c = palette[3]
      } else if(h < 4 * 52) {
        c = palette[2]
      } else if(h < 5 * 52) {
        c = palette[1]
      } else {
        c = palette[0]
      }
      fill( c )
      rect( x, y, pxSz, pxSz)
    }
  }
}
