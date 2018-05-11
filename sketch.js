var w = 640;
var h = 480;
var capture;
var canvas;
var d = 1;
var pxSz = 4;
var palette = [];
var rands = [];

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
  transp = 128;
  palette = [color( 130, 14, 6, transp ),
             color( 75, 190, 255, transp ),
             color( 194, 150, 238, transp ),
             color( 50, 205, 250, transp )]
  noStroke();
  rands = Array.from({length: ((width)*(height))}, () => Math.floor(random(pxSz,pxSz*2)));
}

function draw() {
  image(capture, 0, 0, width, height);
  loadPixels()
  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
      idx = pxSz * ((y * d) * width * d + (x * d));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      //if(x > width / 2 ) {
        b = brightness(c)
        if( b < 40 ) {
          c = palette[0]
        } else if( b < 75 ) {
          c = palette[1]
        } else if( b < 95 ) {
          c = palette[2]
        } else {
          c = palette[3]
        }
    //  }
      //stroke(c)
      fill(c)
      rect( x, y, rands[(idx/pxSz)/d], rands[(idx/pxSz)/d]  )
    }
  }
}
