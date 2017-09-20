const getNormalisedVec3 = function(vec) {
  const mag = getMagnitudeVec3(vec);

  if (mag != 0) {
    vec.x /= mag;
    vec.y /= mag;
    vec.z /= mag;
  }

  return vec;
};

const getMagnitudeVec3 = function(vec) {
  const mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);

  return mag;
}

const getDistanceVec3 = function(a, b) {
  const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.y - a.y, 2) + Math.pow(b.z - a.z, 2));

  return dist;
}

const getDistanceVec2 = function(a, b) {
  const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));

  return dist;
}

export { getNormalisedVec3, getMagnitudeVec3, getDistanceVec2, getDistanceVec3 };
