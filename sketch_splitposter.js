function setup_splitposter() {
  console.log("splitposter");
  noStroke();

  palette = [color(144,32,13),
             color(218,161,62),
             color(79,96,32),
             color(	225,213,174)]
}


function draw_splitposter(pixels, pxSz) {
  new_w = 480*(width/height);
  image(capture,0,0,width,height);//,640/2-new_w/2,0,new_w,480);
  loadPixels();
  imgURI = canvas.elt.toDataURL("image/png");
  face = new Image(width,height);
  face.src = imgURI;
  $('body').append(face);
  $('img').addClass("face2Track");
  $('.face2Track').hide();
  var tracker = new tracking.LandmarksTracker();
  tracker.setInitialScale(4);
  tracker.setStepSize(2);
  tracker.setEdgesDensity(0.1);

  tracking.track('.face2Track', tracker);
  tracker.on('track', faceDetector);

  var splitpoint = width/2;
  if( facialFeatures.length > 0 ) {
    splitpoint = facialFeatures[15][0]
  }

  for( x = 0; x < width; x+=pxSz ) {
    for( y = 0; y < height; y+=pxSz ) {
      idx = 4 * ((y * d) * width * d + (x * d ));
      c = color( pixels[idx], pixels[idx+1], pixels[idx+2] )
      if( x > splitpoint ){
        b = brightness(c)
        if( b < 20 ) {
          c = palette[0]
        } else if ( b < 45 ){
          c = palette[1]
        } else if ( b < 55 ){
          c = palette[2]
        } else {
          c = palette[3]
        }
      }
      stroke( c )
      rect( x, y, pxSz, pxSz )
    }
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
