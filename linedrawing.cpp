precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float width;
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
void main() {
  vec4 palette_posterize[2];
  palette_posterize[0] = vec4( 237, 235, 227, 255 );
  palette_posterize[1] = vec4( 187, 133, 105, 255 );

  float tiles = width/4.0;
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  uv = floor( uv * tiles ) / tiles;
  vec4 tex = texture2D(tex0, uv);
  vec4 newtex;
  float h = luma(tex.rgb);

  if( h > 98./255. ) {
    newtex = palette_posterize[0] / 255.0;
  } else {
    newtex = palette_posterize[1] / 255.0;
  }

  gl_FragColor = newtex;
}
