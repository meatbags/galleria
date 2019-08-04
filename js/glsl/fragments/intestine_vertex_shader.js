/** Intestine vertex shader */

const IntestineVertexShader = `
vec3 p = position;
float f = time * 0.5 + 0.5 * sin(time * 0.25);
float noise = perlinNoise(vec2(f + p.y, f + p.z));
float x = sin(f + p.y * 3.0 + p.z / 4.0) * 0.2;
float y = 0.0;
float z = noise * 0.1;
vec3 noiseVec = vec3(x, y, z);
vec3 transformed = p + noiseVec;
vNormal.y += noise * 0.75;
vNormal.x += noise * -0.5;
`;

export default IntestineVertexShader;
