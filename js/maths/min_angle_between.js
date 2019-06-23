/** Get min angle between angles */

const MinAngleBetween = function(a1, a2) {
  return Math.atan2(Math.sin(a2 - a1), Math.cos(a2 - a1))
}

export default MinAngleBetween;
