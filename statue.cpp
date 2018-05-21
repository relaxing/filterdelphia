precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float width;
float luma(vec3 color) {
  return dot(color, vec3(0.299, 0.587, 0.114));
}
void main() {
  vec4 palette_posterize[7];
  palette_posterize[0] = vec4( 0., 10., 10., 200. );
  palette_posterize[1] = vec4( 244., 244., 244., 200. );
  palette_posterize[2] = vec4( 200., 200., 200., 200. );
  palette_posterize[3] = vec4( 150., 150., 150., 200. );
  palette_posterize[4] = vec4( 100., 100., 100., 200. );
  palette_posterize[5] = vec4( 50., 50., 50., 200. );
  palette_posterize[6] = vec4( 255., 255., 255.,16.);

  float tiles = width/3.0;
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  uv = floor( uv * tiles ) / tiles;
  vec4 tex = texture2D(tex0, uv);
  vec4 newtex;
  float h = luma(tex.rgb);

  if( h < 1. / 12. ) {
    newtex = palette_posterize[0] / 255.0;
  } else if( h < 2. / 12. ) {
    newtex = palette_posterize[1] / 255.0;
  } else if( h < 3. / 12. ) {
    newtex = palette_posterize[2] / 255.0;
  } else if( h < 4. / 12. ) {
    newtex = palette_posterize[3] / 255.0;
  } else if( h < 5. / 12. ) {
    newtex = palette_posterize[4] / 255.0;
  } else if( h < 6. / 12. ) {
    newtex = palette_posterize[5] / 255.0;
  } else {
    newtex = palette_posterize[6] / 255.0;
  }

  gl_FragColor = newtex/2. + tex/2.;
}
