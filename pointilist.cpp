precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
uniform float width;
vec3 rgb2hsb(vec3 c){
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = c.g < c.b ? vec4(c.bg, K.wz) : vec4(c.gb, K.xy);
    vec4 q = c.r < p.x ? vec4(p.xyw, c.r) : vec4(c.r, p.yzx);
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}
vec3 hsb2rgb(vec3 c){
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
void main() {
  vec4 palette_posterize[7];
  palette_posterize[0] = vec4(191, 110, 110, 255);
  palette_posterize[1] = vec4(244, 143, 66, 255);
  palette_posterize[2] = vec4(250, 230, 120, 255);
  palette_posterize[3] = vec4(80, 242, 55, 255);
  palette_posterize[4] = vec4(55, 196, 250, 255);
  palette_posterize[5] = vec4(163, 181, 281, 255);
  palette_posterize[6] = vec4(238, 130, 238, 255);

  float tiles = width/12.0;
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  uv = floor( uv * tiles ) / tiles;
  vec4 tex = texture2D(tex0, uv);
  vec3 hsb = rgb2hsb(tex.rgb);

  float h = hsb[0];
  if( h < 1. / 7. ) {
    tex = palette_posterize[0] / 255.0;
  } else if( h < 2. / 7. ) {
    tex = palette_posterize[1] / 255.0;
  } else if( h < 3. / 7. ) {
    tex = palette_posterize[2] / 255.0;
  } else if( h < 4. / 7. ) {
    tex = palette_posterize[3] / 255.0;
  } else if( h < 5. / 7. ) {
    tex = palette_posterize[4] / 255.0;
  } else if( h < 6. / 7. ) {
    tex = palette_posterize[5] / 255.0;
  } else {
    tex = palette_posterize[6] / 255.0;
  }

  gl_FragColor = tex;
}
