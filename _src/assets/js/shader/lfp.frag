precision mediump float;
uniform float time;
varying vec2 vUv;
uniform float shift;
uniform float aspectRatio;
uniform vec2 resolution;
uniform sampler2D stack0;
uniform sampler2D stack1;
uniform sampler2D stack2;
uniform sampler2D stack3;
uniform sampler2D stack4;
uniform sampler2D stack5;
uniform sampler2D stack6;
uniform vec2 stackUv0;
uniform vec2 stackUv1;
uniform vec2 stackUv2;
uniform vec2 stackUv3;
uniform vec2 stackUv4;
uniform vec2 stackUv5;
uniform vec2 stackUv6;

vec3 averageColor(sampler2D tex, vec2 uv) {
	float px = 1.0 / resolution.x;
	float py = 1.0 / resolution.y;
	float total = 0.;
	vec3 color = vec3(0., 0., 0.);
	for (float x=-1.; x<=1.; x++) {
		for (float y=-1.; y<=1.; y++) {
			vec2 uv_ = uv + vec2(x*px,y*px);
			float p = pow(2., -(abs(x)+abs(y)));
			color += texture2D(tex, uv_).rgb * p;
			total += p;
		}
	}
	return color / total;
}

void main()	{
	vec3 color0 = averageColor(stack0, vUv + stackUv0 * shift);
	vec3 color1 = averageColor(stack1, vUv + stackUv1 * shift);
	vec3 color2 = averageColor(stack2, vUv + stackUv2 * shift);
	vec3 color3 = averageColor(stack3, vUv + stackUv3 * shift);
	vec3 color4 = averageColor(stack4, vUv + stackUv4 * shift);
	vec3 color5 = averageColor(stack5, vUv + stackUv5 * shift);
	vec3 color6 = averageColor(stack6, vUv + stackUv6 * shift);
	vec3 color = (color0 + color1 + color2 + color3 + color4 + color5 + color6) / 7.;
	gl_FragColor = vec4(color, 1.);
}