/** Config */

import GetMode from '../utils/get_mode';

const mode = GetMode();
const space = 8;
const padX = 0;
const padY = mode === 'single' ? 0 : 10;
const padYMobile = 8;
const mobileBreakpoint = 768;

const Config = {
  renderer: {
    getWidth: () => { return Math.max(100, window.innerWidth - space * padX * 2); },
    getHeight: () => {
      if (window.innerWidth <= mobileBreakpoint) {
        return Math.max(100, window.innerHeight - space * padYMobile * 2);
      } else {
        return Math.max(100, window.innerHeight - space * padY * 2);
      }
    },
  },
  mobileBreakpoint: mobileBreakpoint,
  floorPlan: {
    artworkPositions: [
      // 32 in total
      // brick wall (8)
      {x: -24, y: 4, z: 23, nx: 0, nz: -1}, {x: -10.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: -8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: -5.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: 5.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: 8, y: 3.5, z: 23, nx: 0, nz: -1},
      {x: 10.5, y: 3.5, z: 23, nx: 0, nz: -1}, {x: 24, y: 4, z: 23, nx: 0, nz: -1},
      // central block A (6)
      {x: -12, y: 3.5, z: 8, nx: 0, nz: 1}, {x: -8, y: 3.5, z: 8, nx: 0, nz: 1}, {x: -4, y: 3.5, z: 8, nx: 0, nz: 1},
      {x: 4, y: 3.5, z: 8, nx: 0, nz: 1}, {x: 8, y: 3.5, z: 8, nx: 0, nz: 1}, {x: 12, y: 3.5, z: 8, nx: 0, nz: 1},
      // end walls (6)
      {x: -31, y: 4, z: 14, nx: 1, nz: 0}, {x: -29.5, y: 4, z: 6, nx: 1, nz: 0}, {x: -31, y: 4, z: -2, nx: 1, nz: 0},
      {x: 32, y: 4, z: 14, nx: -1, nz: 0}, {x: 30, y: 4, z: 6, nx: -1, nz: 0}, {x: 32, y: 4, z: -2, nx: -1, nz: 0},
      // central block B (6)
      {x: -12, y: 3.5, z: 4, nx: 0, nz: -1}, {x: -8, y: 3.5, z: 4, nx: 0, nz: -1}, {x: -4, y: 3.5, z: 4, nx: 0, nz: -1},
      {x: 4, y: 3.5, z: 4, nx: 0, nz: -1}, {x: 8, y: 3.5, z: 4, nx: 0, nz: -1}, {x: 12, y: 3.5, z: 4, nx: 0, nz: -1},
      // white wall downstairs (2)
      {x: -8, y: 3.5, z: -11.5, nx: 0, nz: 1}, {x: 8, y: 3.5, z: -11.5, nx: 0, nz: 1},
      // upstairs (4)
      {x: -24, y: 11, z: -11, nx: 0, nz: 1},  {x: -8, y: 11, z: -11.5, nx: 0, nz: 1},
      {x: 8, y: 11, z: -11.5, nx: 0, nz: 1}, {x: 24, y: 11, z: -11, nx: 0, nz: 1}
    ]
  }
}

export default Config;
