/** Easing funcs */

const EaseInAndOut = t => {
  return t<.5 ? 2*t*t : -1+(4-2*t)*t;
};

export { EaseInAndOut };
