/** Circle/ Line intersect */

const CircleLineIntersect = (cp, r, p1, p2) => {
  const x1 = p1.x - cp.x;
  const y1 = p1.y - cp.y;
  const x2 = p2.x - cp.x;
  const y2 = p2.y - cp.y;
  const dx = x2 - x1;
  const dy = y2 - y1;
  const dr = Math.sqrt(dx * dx + dy * dy);
  const d = x1 * y2 - x2 * y1;
  const dr2 = dr * dr;
  const d2 = d * d;
  const r2 = r * r;
  const disc = r2 * dr2 - d2;

  if (disc <= 0) {
    return null;
  }

  const rx1 = (d * dy - dx * Math.sqrt(disc)) / dr2 + cp.x;
  const ry1 = (-d * dx + Math.abs(dy) * Math.sqrt(disc)) / dr2 + cp.y;
  const rx2 = (d * dy + dx * Math.sqrt(disc)) / dr2 + cp.x;
  const ry2 = (-d * dx - Math.abs(dy) * Math.sqrt(disc)) / dr2 + cp.y;
  const thresh = 0.1;
  const drx1 = (rx1 - p1.x) + (p2.x - rx1);
  const dry1 = (ry1 - p1.y) + (p2.y - ry1);
  const x = rx1;// (drx1 >= dx - thresh && drx1 <= dx + thresh) ? rx1 : rx2;
  const y = ry1;//(dry1 >= dy - thresh && dry1 <= dy + thresh) ? ry1 : ry2;

  return new THREE.Vector2(x, y);
};

export default CircleLineIntersect;
