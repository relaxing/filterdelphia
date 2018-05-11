var w = 640;
var h = 480;
var capture;
var canvas;
var d = 1;
var pxSz = 4;
var palette = [];

function setup() {
  capture = createCapture({
    audio: false,
    video: true
  });
  capture.elt.setAttribute('playsinline', '');
  capture.elt.setAttribute('autoplay', '');
  canvas = createCanvas(w,h);//capture.width,capture.height);
  //console.log(capture.width + " " + capture.height)
  capture.hide();
  d = pixelDensity();
  palette = [color( 75, 190, 255 ),
             color( 130, 14, 6 ),
             color( 194, 150, 238 ),
             color( 50, 205, 250)]
  noStroke();
}

function draw() {
  image(capture, 0, 0, width, height);
  loadPixels()
  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
      idx = 4 * ((y * d) * width * d + (x * d ));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
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
      fill(c)
      rect( x, y, random(pxSz*2), random(pxSz*2) )
    }
  }
}
