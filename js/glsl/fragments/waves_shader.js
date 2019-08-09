/** Waves shader */

const WavesShader = `
  vec3 p = position;
  float f = time * 0.2;
  float noise = perlinNoise(vec2(f + p.y, f + p.x));
  float t = 0.0;
  float tMin = 2.5;
  float tMax = 6.5;
  if (p.y < tMax && p.y > tMin) {
    t = sin((tMax - p.y) / (tMax - tMin) * 3.14159) * 0.12;
  }
  float x = t * noise;
  float z = -t * ((noise + 1.0) / 2.0);
  vec3 noiseVec = vec3(x, 0.0, z);
  vec3 transformed = p + noiseVec;
  vNormal.y = sin(x) * 2.0;
  vNormal.z = cos(x) * 6.0;
`;

export default WavesShader;
