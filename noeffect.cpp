precision mediump float;
varying vec2 vTexCoord;
uniform sampler2D tex0;
void main() {
  vec2 uv = vTexCoord;
  uv = 1.0 - uv;
  vec4 tex = texture2D(tex0, uv);
  gl_FragColor = tex;
}
