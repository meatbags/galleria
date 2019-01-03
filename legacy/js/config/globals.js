import { v3 } from '../maths';
const halfPI = Math.PI / 2;

const Globals = {
  isMobile: window.mobileAndTabletcheck(),
  player: {
    height: 3,
    speed: 8,
    rotationSpeed: Math.PI * 0.75,
    autowalkDistance: 10,
  },
  raytracer: {
    precision: 0.5,
    length: 15
  },
  camera: {
    fov: 58,
    near: 0.1,
    far: 2000000,
  },
  loader: {
    bumpScale: 0.02,
    lightMapIntensity: 0.6,
  },
  artworkPlacement: {
    // main hall
    '0': {scale: 3, pitch: 0, yaw: 0, position: v3(23.75, 4, 38.75), eye: v3(23.75, 0.5, 35)},
    '1': {scale: 4, pitch: 0, yaw: 0, position: v3(33.25, 4, 38.75), eye: v3(33.25, 0.5, 35)},
    '12': {scale: 3, pitch: 0, yaw: 0, position: v3(23.75, 3.5, 19.75), eye: v3(23.75, 0.5, 24)},
    '13': {scale: 2, pitch: 0, yaw: 0, position: v3(33.25, 3.5, 19.75), eye: v3(33.25, 0.5, 24)},
    // entrance
    '2': {scale: 3, pitch: 0, yaw: halfPI, position: v3(9.1, 3.25, 4.75), eye: v3(5.5, 0, 4.75)},
    '3': {scale: 3, pitch: 0, yaw: halfPI, position: v3(9.1, 3.25, 15), eye: v3(5.5, 0, 15)},
    '4': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 3.5, 4.75), eye: v3(-5.5, 0, 4.75)},
    '5': {scale: 2.5, pitch: 0, yaw: halfPI, position: v3(-9.1, 3.5, 15), eye: v3(-5.5, 0, 15)},
    '6': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 3.5, 24.75), eye: v3(-5.5, 0.5, 24.75)},
    // top floor
    '7': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 11, 24.75), eye: v3(-5.5, 8, 24.75)},
    '8': {scale: 3, pitch: 0, yaw: halfPI, position: v3(9.1, 11, 5), eye: v3(5.5, 8, 5)},
    '9': {scale: 2.5, pitch: 0, yaw: halfPI, position: v3(9.1, 11, 15), eye: v3(5.5, 8, 15)},
    '10': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 11, 5), eye: v3(-5.5, 8, 5)},
    '11': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 11, 15), eye: v3(-5.5, 8, 15)},
  }
};

export default Globals;
