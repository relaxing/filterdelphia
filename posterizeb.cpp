precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
void main() {
  vec4 palette_posterize[4];
  palette_posterize[0] = vec4( 43, 44, 39, 255 );
  palette_posterize[1] = vec4( 115, 105, 100, 70 );
  palette_posterize[2] = vec4( 218, 206, 192, 30 );
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  vec4 tex = texture2D(tex0, uv);
  float grey = luma(tex.rgb);
  if( grey < 40./255. ) {
    tex = palette_posterize[0]/255.0;
  } else if( grey < 100./255. ) {
    tex = palette_posterize[1]/255.0;
  } else {
    tex = palette_posterize[2]/255.0;
  }
  gl_FragColor = tex;
}
