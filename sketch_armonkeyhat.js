var canvas;
var capture;
var faceCoords = [0,0,0,0];
var facialFeatures = [];

function preload_armonkeyhat() {
  monkeyhat = loadImage("images/monkeyhat.png");
}

function setup_armonkeyhat() {
  console.log("armonkey")
  preload();
  fill(255);
  noStroke();
  textSize(8);
}

function draw_armonkeyhat() {
  new_w = 480*(width/height);
  image(capture,0,0,width,height);//,640/2-new_w/2,0,new_w,480);
  imgURI  = canvas.elt.toDataURL("image/png");
  face = new Image(width,height);
  face.src = imgURI;
  $('body').append( face );
  $('img').addClass("face2Track");
  $('.face2Track').hide();
  var tracker = new tracking.LandmarksTracker();
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('.face2Track', tracker);
  tracker.on('track', faceDetector);
   // 0-8 chin
   // 9-14 eyebrows
   // 15 bridge nose 16-18 nostrils
   // 19-22 left eye
   // 23-26 right eye
   // 27-30 mouth
  // for(i = 0; i < facialFeatures.length; i++) {
  //   text(i,facialFeatures[i][0], facialFeatures[i][1]);
  // }
  if( facialFeatures.length > 0 ) {
    image(monkeyhat, facialFeatures[10][0]-monkeyhat.width*.6, facialFeatures[10][1]-monkeyhat.height*.9);
  }
}

function faceDetector(event) {
  if(!event.data) {
    return;
  }
  event.data.faces.forEach(function(rect){
    faceCoords[0] = rect.x;
    faceCoords[1] = rect.y;
    faceCoords[2] = rect.width;
    faceCoords[3] = rect.height;
  } );
  event.data.landmarks.forEach(function(landmarks){
    facialFeatures = landmarks.slice(0);
  });
  $('.face2Track').remove();
}