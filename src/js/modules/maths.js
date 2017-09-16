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

export { Normalise, Mag3 };
