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
uniform sampler2D stack7;

vec3 averageColor(sampler2D tex, vec2 uv) {
	float px = 1.0 / resolution.x;
	float py = 1.0 / resolution.y;
	float total = 0.;
	vec3 color = vec3(0., 0., 0.);
	for (float x=-2.; x<=2.; x++) {
		for (float y=-2.; y<=2.; y++) {
			vec2 uv_ = uv + vec2(x*px,y*px);
			float p = pow(2., -(abs(x)+abs(y)));
			color += texture2D(tex, uv_).rgb * p;
			// color += vec3(uv.x, uv.y, 0.0);
			total += p;
		}
	}
	return color / total;
}

void main()	{
	vec3 color = vec3(0.0, 0.0, 0.0);
	float p = shift - floor(shift);
	if (shift < 1.0) {
		color = texture2D(stack0, vUv).rgb * (1.0 - p);
		color += texture2D(stack1, vUv).rgb * p;
	} else if (shift < 2.0) {
		color = texture2D(stack1, vUv).rgb * (1.0 - p);
		color += texture2D(stack2, vUv).rgb * p;
	} else if (shift < 3.0) {
		color = texture2D(stack2, vUv).rgb * (1.0 - p);
		color += texture2D(stack3, vUv).rgb * p;
	} else if (shift < 4.0) {
		color = texture2D(stack3, vUv).rgb * (1.0 - p);
		color += texture2D(stack4, vUv).rgb * p;
	} else if (shift < 5.0) {
		color = texture2D(stack4, vUv).rgb * (1.0 - p);
		color += texture2D(stack5, vUv).rgb * p;
	} else if (shift < 6.0) {
		color = texture2D(stack5, vUv).rgb * (1.0 - p);
		color += texture2D(stack6, vUv).rgb * p;
	} else if (shift < 7.0) {
		color = texture2D(stack6, vUv).rgb * (1.0 - p);
		color += texture2D(stack7, vUv).rgb * p;
	} else {
		color = texture2D(stack7, vUv).rgb;
	}
	gl_FragColor = vec4(color, 1.);
}