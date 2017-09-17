const Normalise = function(vec) {
  const mag = Mag3(vec);

  if (mag != 0) {
    vec.x /= mag;
    vec.y /= mag;
    vec.z /= mag;
  }

  return vec;
};

const Mag3 = function(vec) {
  const mag = Math.sqrt(vec.x * vec.x + vec.y * vec.y + vec.z * vec.z);

  return mag;
}

const Dist2D = function(a, b) {
  const dist = Math.sqrt(Math.pow(b.x - a.x, 2) + Math.pow(b.z - a.z, 2));

  return dist;
}

export { Normalise, Mag3, Dist2D };
