var w = 640;
var h = 480;
var bpp = 4;
var capture;
var canvas;
var d = 1;
var currFilter = lastFilter = 1;
var filter_setup = [];
var filter_draw = [];
var filter_selectorsX = [];
var filter_selectorsSz = [30,40,50,40,30];

var posterizeShader;

function preload() {
  bockhat = loadImage("images/bockHat.png");
  pipe = loadImage("images/bockPipe.png");
  boyface = loadImage("images/boyface.png");
  dragon = loadImage("images/dragonface.png");
  monkeyhat = loadImage("images/monkeyhat.png");

  posterizeShader = loadShader('posterize.vert', 'posterize.cpp');
}

function setup() {
  capture = createCapture({
    audio: false,
    video: true
  });
  capture.elt.setAttribute('playsinline', '');
  capture.elt.setAttribute('autoplay', '');
  canvas = createCanvas(w,h,WEBGL);
  //canvas.elt = WebGLDebugUtils.makeDebugContext(canvas.elt.getContext("webgl"));
  console.log(capture.width + " " + capture.height)
  capture.size(w,h);
  capture.hide();
  //d = pixelDensity();
  pixelDensity(1);
  noStroke();
  filter_setup.push(setup_noeffect);
  filter_setup.push(setup_posterize);
  filter_setup.push(setup_pointilist);
  filter_setup.push(setup_arbock);
  filter_setup.push(setup_arboy);
  filter_setup.push(setup_ardragon);
  filter_setup.push(setup_linedrawing);
  filter_setup.push(setup_armonkeyhat);
  filter_setup.push(setup_pointilisth);
  filter_setup.push(setup_posterizeb);
  filter_setup.push(setup_splitposter);
  filter_setup.push(setup_stainglass);
  filter_setup.push(setup_statue);

  filter_draw.push(draw_noeffect);
  filter_draw.push(draw_posterize);
  filter_draw.push(draw_pointilist);
  filter_draw.push(draw_arbock);
  filter_draw.push(draw_arboy);
  filter_draw.push(draw_ardragon);
  filter_draw.push(draw_linedrawing);
  filter_draw.push(draw_armonkeyhat);
  filter_draw.push(draw_pointilisth);
  filter_draw.push(draw_posterizeb);
  filter_draw.push(draw_splitposter);
  filter_draw.push(draw_stainglass);
  filter_draw.push(draw_statue);

  filter_setup[currFilter]();

  border = 10;
  ellsz = 50;
  ellx = (width/2)-(2*(border+ellsz));
  numSelectors = 5;
  for(i=0;i<numSelectors;i++) {
    filter_selectorsX.push( ellx );
    ellx+=border+ellsz;
  }
}

function draw() {
  //rect(0,0,width, height);
  //image(capture, 0, 0, width, height);
  //loadPixels();
  var pxSz = 2;
  if(currFilter != lastFilter){
    console.log(lastFilter + "->" + currFilter);
    lastFilter = currFilter;
    filter_setup[currFilter]();
  }
  // shader() sets the active shader with our shader
  shader(posterizeShader);

  // lets just send the cam to our shader as a uniform
  posterizeShader.setUniform('tex0', capture);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);
  //draw menu
  elly = height-border-ellsz;
  fill(0,0,0,16);
  stroke(255);
  ellipseMode(CENTER);
  for(i=0;i<filter_selectorsX.length;i++) {
    ellx = filter_selectorsX[i];
    ellsz = filter_selectorsSz[i];
    ellipse(ellx,elly,ellsz,ellsz)
  }

  noStroke();
}


function mouseclicked() {
  for(i=0;i<filter_selectorsX.length;i++) {
    x = filter_selectorsX[i];
    y = height-border-ellsz;
    ellsz = filter_selectorsSz[i];
    if ( mouseX >= x-ellsz/2 && mouseX <= x+ellsz/2 &&
         mouseY >= y-ellsz/2 && mouseY <= y+ellsz/2 ) {
      console.log("selector "+i+" hit")
      if(i>2) {
        currFilter+=i-2;
      } else if (i<2) {
        currFilter-=2-i;
      } else {
        takePhoto();
      }
      currFilter = constrain( currFilter, 0, filter_setup.length-1 )
    }
  }
}

function touchEnded() {
  mouseclicked();
}

function takePhoto() {

}

function resize_canvas(){
  resizeCanvas(window.innerWidth,window.innerHeight,false)
}
