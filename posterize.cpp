precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
void main() {
  vec4 palette_posterize[4];
  palette_posterize[0] = vec4(130.0,  14.0,   6.0, 255.0);
  palette_posterize[1] = vec4( 75.0, 190.0, 255.0, 255.0);
  palette_posterize[2] = vec4(194.0, 150.0, 238.0, 255.0);
  palette_posterize[3] = vec4( 50.0, 205.0, 250.0, 255.0);
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  vec4 tex = texture2D(tex0, uv);
  float grey = luma(tex.rgb);
  if( grey < .40 ) {
    tex = palette_posterize[0]/255.0;
  } else if( grey < .75 ) {
    tex = palette_posterize[1]/255.0;
  } else if( grey < .95 ) {
    tex = palette_posterize[2]/255.0;
  } else {
    tex = palette_posterize[3]/255.0;
  }
  gl_FragColor = tex;
}
