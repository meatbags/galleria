/**
 * Convert world space to screen space.
 **/

const pointToScreen = (p, camera, centre, target) => {
  const point = p.clone();
  point.project(camera);
  target.x = (point.x + 1) * centre.x;
  target.y = (-point.y + 1) * centre.y;
};

export { pointToScreen };
