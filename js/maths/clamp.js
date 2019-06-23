/** Clamp value */

const Clamp = (value, min, max) => {
  return Math.min(max, Math.max(min, value));
};

export default Clamp;
