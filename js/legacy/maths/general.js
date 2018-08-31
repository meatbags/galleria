const getNormalisedVec3 = function(vec) {
  const mag = getMagnitudeVec3(vec);

  if (mag != 0) {
    vec.x /= mag;
    vec.y /= mag;
    vec.z /= mag;
  }

  return vec;
};

const v3 = function(x, y, z) {
  return new THREE.Vector3(x, y, z);
}

const getPitch = function(a, b) {
  const dist = getDistanceVec2(a, b);

  return Math.atan2(b.y - a.y, dist);
}

const minAngleDifference = function(a1, a2) {
  const angle = Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1))

  return angle;
}

const getYaw = function(a, b) {
  return Math.atan2(b.x - a.x, b.z - a.z);
}

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

const twoPi = Math.PI * 2;

export { v3, minAngleDifference, getNormalisedVec3, getPitch, getYaw, getMagnitudeVec3, getDistanceVec2, getDistanceVec3 };
