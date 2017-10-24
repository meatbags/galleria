import { v3 } from './Maths';

const halfPI = Math.PI / 2;

const Globals = {
  type: {
    TYPE_ARTWORK: 'TYPE_ARTWORK',
    TYPE_COLLISION: 'TYPE_COLLISION',
    TYPE_NONE: 'TYPE_NONE'
  },
  player: {
    position: {
      x: -15.75,
      y: 0,
      z: -40,
    },
    rotation: {
      x: Math.PI * 0.12,
      y: 0.3086,
      z: 0
    },
    height: 2,
    speed: 8,
    rotationSpeed: Math.PI * 0.75,
  },
  raytracer: {
    precision: .8,
    length: 12.5
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
  artwork: {
    clickBoxScale: 1.25
  },
  artworkPlacement: {
    '0': {scale: 5, pitch: 0, yaw: halfPI, position: v3(8.8, 6, -10), eye: v3(0, 0, -10)},
    '1': {scale: 4, pitch: 0, yaw: halfPI, position: v3(-9.1, 4, -15), eye: v3(-2, 0, -15)},
    '2': {scale: 2.5, pitch: 0, yaw: halfPI, position: v3(9.1, 3.25, 4.75), eye: v3(5.5, 0, 4.75)},
    '3': {scale: 2.75, pitch: 0, yaw: halfPI, position: v3(9.1, 3.25, 15), eye: v3(5.5, 0, 15)},
    '4': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 3.5, 4.75), eye: v3(-5.5, 0, 4.75)},
    '5': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 3.5, 15), eye: v3(-5.5, 0, 15)},
    '6': {scale: 2, pitch: 0, yaw: 0, position: v3(0, 3, 9.75), eye: v3(0, 0, 4.5)},
    '7': {scale: 2, pitch: 0, yaw: 0, position: v3(0, 3, 10.25), eye: v3(0, 0, 14.5)},
    '8': {scale: 2.5, pitch: 0, yaw: halfPI, position: v3(9.1, 11, 5), eye: v3(5.5, 8, 5)},
    '9': {scale: 2.5, pitch: 0, yaw: halfPI, position: v3(9.1, 11, 15), eye: v3(5.5, 8, 15)},
    '10': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 11, 5), eye: v3(-5.5, 8, 5)},
    '11': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-9.1, 11, 15), eye: v3(-5.5, 8, 15)},
    '12': {scale: 3, pitch: 0, yaw: 0, position: v3(0, 11, 9.75), eye: v3(0, 8, 5.5)},
    '13': {scale: 2, pitch: 0, yaw: 0, position: v3(0, 11, 10.25), eye: v3(0, 8, 14.5)},
  }
};

export default Globals;
