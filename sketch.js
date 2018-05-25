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
var filter_selectorsIcons = [];
var border = 10;
var ellsz = 50;
var ellx = 0;
var controlsDiv;

var posterizeShader;
var noeffectShader;

function preload() {
  // AR assets
  bockhat = loadImage("images/bockHat.png");
  pipe = loadImage("images/bockPipe.png");
  boyface = loadImage("images/boyface.png");
  dragon = loadImage("images/dragonface.png");
  monkeyhat = loadImage("images/monkeyhat.png");

  // Selection Icons
  circle_icon = loadImage("images/circle.png");
  filter_selectorsIcons.push("images/circle.png");
  filter_selectorsIcons.push("images/circle.png");
  filter_selectorsIcons.push("images/circle.png");
  filter_selectorsIcons.push("images/posterize.png");
  filter_selectorsIcons.push("images/pointilist.png");
  // filter_selectorsIcons.push("images/arbock.png");
  // filter_selectorsIcons.push(draw_arboy);
  // filter_selectorsIcons.push(draw_ardragon);
  filter_selectorsIcons.push("images/linedrawing.png");
  //filter_selectorsIcons.push(draw_armonkeyhat);
  filter_selectorsIcons.push("images/pointilisth.png");
  filter_selectorsIcons.push("images/posterizeb.png");
  //filter_selectorsIcons.push(draw_splitposter);
  filter_selectorsIcons.push("images/stainedglass.png");
  filter_selectorsIcons.push("images/statue.png");
  filter_selectorsIcons.push("images/circle.png");
  filter_selectorsIcons.push("images/circle.png");

  // Shaders
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
  canvas = createCanvas(capture.width,capture.height,WEBGL);
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


  resize_canvas();

  border = 10;
  ellsz = 50;
  ellx = (width/2)-(2*(border+ellsz));
  numSelectors = 5;
  for(i=0;i<numSelectors;i++) {
    filter_selectorsX.push( ellx );
    ellx+=border+ellsz;
  }

  //Setup Menu
  for(i=0;i<filter_selectorsX.length;i++) {
    ellx = filter_selectorsX[i];
    ellsz = filter_selectorsSz[i];
    elly = height-border-ellsz;
    selectIcon = createImg(filter_selectorsIcons[i]);
    selectIcon.elt.width = ellsz;
    selectIcon.elt.height = ellsz;
    selectIcon.attribute( "onclick", "selectorClicked("+i+");");
    selectIcon.attribute("id", i);
    selectIcon.style("position","relative");
    selectIcon.style("bottom",height-elly+"px");
    selectIcon.style("left",ellx+"px");
    selectIcon.parent("#controls");
  }
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
    selectIcon = $("#"+i)[0];
    if(i==2) {
      selectIcon.src = filter_selectorsIcons[2];
    } else {
      newIcon = filter_selectorsIcons[currFilter+(i-2)+2];
      console.log( selectIcon.src + "->" + newIcon );
      selectIcon.src = newIcon;
    }
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
  currFilter = constrain( currFilter, 0, filter_draw.length-1 );
  drawMenu();
}


function takePhoto() {
  snapImgURL = canvas.elt.toDataURL("image/png");
  snapImg = new Image(width,height);
  snapImg.src = snapImgURL;
  if( navigator.userAgent.indexOf("Safari") == -1 ) {
    snapA = createA(snapImgURL);
    snapA.attribute("download", "filterdelphia.png");
    snapA.elt.click();
  }
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
