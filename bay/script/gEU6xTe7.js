var image,
    canvas,
    rect,
    uscale,
    uzoom,
    zoom,
    gl,
    m = [0, 0],
    slowX = 0;

window.onload = start;
window.onresize = resize;
window.onmousemove = function(e) { m[0] = e.pageX; m[1] = e.pageY };

function resize() {

  var iW = window.innerWidth,
      iH = window.innerHeight;

  var sq = iW < iH ? iW : iH;

  canvas.width = canvas.height = sq;

  rect = canvas.getBoundingClientRect();

	gl.viewport(0, 0, canvas.width, canvas.height);

};

function start() {

	image = document.getElementById("image");
  canvas = document.getElementById("c");
  gl = canvas.getContext("experimental-webgl");

  resize();

  main();

}

function main() {

  var vshader = load_shader("vertex-shader", gl.VERTEX_SHADER);
  var fshader = load_shader("fragment-shader", gl.FRAGMENT_SHADER);

  gl.program = gl.createProgram();
  gl.attachShader(gl.program, vshader);
  gl.attachShader(gl.program, fshader);
  gl.linkProgram(gl.program);
  gl.useProgram(gl.program);

  var acoords = gl.getAttribLocation(gl.program, "a_coords");

  uscale = gl.getUniformLocation(gl.program, "u_scale");
  uzoom = gl.getUniformLocation(gl.program, "u_zoom");

  var texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);

  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);

  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);

  gl.uniform1f(uscale, image.width / image.height / 10);

  var buffer = gl.createBuffer();

  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.enableVertexAttribArray(acoords);
  gl.vertexAttribPointer(acoords, 2, gl.FLOAT, false, 0, 0);

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
    -1.0,  -1.0,
    1.0,  -1.0,
    -1.0,  1.0,
    -1.0,  1.0,
    1.0,  -1.0,
    1.0,  1.0
  ]), gl.STATIC_DRAW);

  loop();

}

function load_shader(el, type) {

  var script = document.getElementById(el);
  var shader = gl.createShader(type);

  gl.shaderSource(shader, script.text);
  gl.compileShader(shader);

  return shader;

}

function loop(){

  slowX *= 0.95;
  slowX += 0.05 * Math.min(Math.max(m[0] - rect.left, 0), canvas.width);

  zoom = Math.pow(10, -36 * Math.max(0, Math.min(1, slowX / canvas.width)));
  
  gl.uniform1f(uzoom, zoom);
  gl.drawArrays(gl.TRIANGLES, 0, 6);

  requestAnimationFrame(loop);

}
