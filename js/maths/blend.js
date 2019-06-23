/** Blend values */

const Blend = (a, b, t) => {
  return a + (b - a) * t;
};

export default Blend;
