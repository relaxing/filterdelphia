var w = 640;
var h = 480;
var bpp = 4;
var capture;
var canvas;
var d = 1;
var currFilter = lastFilter = 0;
var filter_draw = [];
var filter_selectorsX = [];
var filter_selectorsSz = [30,40,50,40,30];
var border = 10;
var ellsz = 50;
var ellx = 0;
var controlsDiv;

var posterizeShader;
var noeffectShader;

function preload() {
  bockhat = loadImage("images/bockHat.png");
  pipe = loadImage("images/bockPipe.png");
  boyface = loadImage("images/boyface.png");
  dragon = loadImage("images/dragonface.png");
  monkeyhat = loadImage("images/monkeyhat.png");

  arbock_icon = loadImage("images/arbock.png");
  circle_icon = loadImage("images/circle.png");

  noeffectShader = loadShader('shader.vert', 'noeffect.cpp');
  posterizeShader = loadShader('shader.vert', 'posterize.cpp');
  pointilistShader = loadShader('shader.vert', 'pointilist.cpp');
  // filter_draw.push(draw_arbock);
  // filter_draw.push(draw_arboy);
  // filter_draw.push(draw_ardragon);
  linedrawingShader = loadShader('shader.vert', 'linedrawing.cpp');
  //filter_draw.push(draw_armonkeyhat);
  pointilisthShader = loadShader('shader.vert', 'pointilisth.cpp');
  posterizebShader = loadShader('shader.vert', 'posterizeb.cpp');
  //filter_draw.push(draw_splitposter);
  stainglassShader = loadShader('shader.vert', 'stainglass.cpp');
  statueShader = loadShader('shader.vert', 'statue.cpp');
}

function setup() {
  capture = createCapture({
    audio: false,
    video: true
  });
  capture.elt.setAttribute('playsinline', '');
  capture.elt.setAttribute('autoplay', '');
  canvas = createCanvas(w,h,WEBGL);
  console.log(capture.width + " " + capture.height)
  capture.size(w,h);
  capture.hide();
  canvas.style("position", "relative");
  canvas.parent('#app');
  controlsDiv = select("#controls");
  //d = pixelDensity();
  pixelDensity(1);
  noStroke();

  filter_draw.push(noeffectShader);
  filter_draw.push(posterizeShader);
  filter_draw.push(pointilistShader);
  // filter_draw.push(draw_arbock);
  // filter_draw.push(draw_arboy);
  // filter_draw.push(draw_ardragon);
  filter_draw.push(linedrawingShader);
  //filter_draw.push(draw_armonkeyhat);
  filter_draw.push(pointilisthShader);
  filter_draw.push(posterizebShader);
  //filter_draw.push(draw_splitposter);
  filter_draw.push(stainglassShader);
  filter_draw.push(statueShader);


  resize_canvas()

  border = 10;
  ellsz = 50;
  ellx = (width/2)-(2*(border+ellsz));
  numSelectors = 5;
  for(i=0;i<numSelectors;i++) {
    filter_selectorsX.push( ellx );
    ellx+=border+ellsz;
  }

  drawMenu();
}

function draw() {
  if(currFilter != lastFilter){
    console.log(lastFilter + "->" + currFilter);
    lastFilter = currFilter;
  }

  shader(filter_draw[currFilter]);
  filter_draw[currFilter].setUniform('tex0', capture);
  filter_draw[currFilter].setUniform('width', width);
  rect(0,0,width, height);

}

function drawMenu() {
  for(i=0;i<filter_selectorsX.length;i++) {
    ellx = filter_selectorsX[i];
    ellsz = filter_selectorsSz[i];
    elly = height-border-ellsz;
    selectIcon = createImg("images/circle.png");
    selectIcon.elt.width = ellsz;
    selectIcon.elt.height = ellsz;
    selectIcon.attribute( "onclick", "selectorClicked("+i+");");
    selectIcon.style("position","relative");
    selectIcon.style("bottom",height-elly+"px");
    selectIcon.style("left",ellx+"px");
    selectIcon.parent("#controls");
  }
}


function selectorClicked(selectorId) {
  if(selectorId>2) {
    currFilter+=selectorId-2;
  } else if (selectorId<2) {
    currFilter-=2-selectorId;
  } else {
    takePhoto();
  }
  currFilter = constrain( currFilter, 0, filter_draw.length-1 )
}


function takePhoto() {
  snapImgURL = canvas.elt.toDataURL("image/png");
  snapImg = new Image(width,height);
  snapImg.src = snapImgURL;
  snapA = createA(snapImgURL);
  snapA.attribute("download", "filterdelphia.png");
  snapA.elt.click();
  snapImg.width = width/4;
  snapImg.height = height/4;
  snapImg.border = "5px";
  $("#snaps").append(snapImg);
  snapA.remove();
}

function resize_canvas(){
  var aspectRatio = 1.0;
  if( capture.width > capture.height ) {
    aspectRatio = capture.height/capture.width;
    resizeCanvas(window.innerWidth,window.innerWidth*aspectRatio,false);
  } else {
    aspectRatio = capture.width/capture.height;
    resizeCanvas(window.innerHeight*aspectRatio,window.innerHeight,false);
  }
  select("#support").style("top",height+"px")
  controlsDiv.style("width",width+"px");
  controlsDiv.style("height",height+"px");
}
