precision mediump float;
uniform float time;
uniform float aspectRatio;
uniform vec2 resolution;
varying vec2 vUv;

void main()	{
	vUv = vec2(uv.x, uv.y);
	float windowAspectRatio = resolution.x / resolution.y;
	vUv.x /= aspectRatio / windowAspectRatio;
	vUv.x += (aspectRatio - windowAspectRatio) / aspectRatio * 0.5;
	gl_Position = vec4( position, 1.0 );
}