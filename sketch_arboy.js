var canvas;

var capture;
var faceCoords = [0,0,0,0];
var facialFrature = []

function preload_arboy(){
  boyface = loadImage("images/boyface.png")
}

function setup_arboy() {
  console.log("arboy")
  preload();
  fill(255)
  textSize(0)
  $('.Move').append(canvas)
}


function draw_arboy() {
  new_w = 480*(width/height);
  image(capture,0,0,width,height);//,640/2-new_w/2,0,new_w,480);
  imgURL = canvas.elt.toDataURL("image/png");
  face = new Image(width,height);
  face.src = imgURL
  $('body').append( face )
  $('img').addClass("face2Track")
  $('.face2Track').hide();
  var tracker = new tracking.LandmarksTracker();
  tracker.setInitialScale(4)
  tracker.setStepSize(4)
  tracker.setEdgesDensity(0,1)

  tracking.track('.face2Track',tracker)
  tracker.on('track',faceDetector )

  //0-8 xiaba
  //9-14
  //15     16-18
  //19-22 zuoyan
  //23-26 youyan
  //27-30 zuiba

//for(i=0; i<facialFrature.length;i++){
//  text(i,facialFrature[i][0],facialFrature[i][1])
//}
//if(facialFrature.length > 0){
//  image(hat,facialFrature[10][0],facialFrature[10][1])
//}
if(facialFrature.length > 0){
  image(boyface,facialFrature[0][0],facialFrature[10][1])
}
}

function faceDetector(event){
  if(!event.data){
    return;
  }
  event.data.faces.forEach(function(rect){
    faceCoords[0] = rect.x;
    faceCoords[1] = rect.y;
    faceCoords[2] = rect.width;
    faceCoords[3] = rect.height;
  });
  event.data.landmarks.forEach(function(landmarks){
    facialFrature = landmarks.slice(0)
  });
  $('.face2Track').remove()
}
