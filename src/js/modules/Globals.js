import { v3 } from './Maths';

const halfPI = Math.PI / 2;

const Globals = {
  type: {
    TYPE_ARTWORK: 'TYPE_ARTWORK',
    TYPE_COLLISION: 'TYPE_COLLISION'
  },
  player: {
    position: {
      x: 0,
      y: 0,
      z: -40,
    },
    height: 1.8,
    speed: 8,
    rotationSpeed: Math.PI * 0.75,
  },
  raytracer: {
    precision: 1,
    length: 10
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
    '0': {scale: 6, pitch: 0, yaw: halfPI, position: v3(8.5, 6, -10), eye: v3(0, 0, -10)},
    '1': {scale: 4, pitch: 0, yaw: halfPI, position: v3(-8.5, 4, -15), eye: v3(0, 0, -15)},
    '2': {scale: 2, pitch: 0, yaw: halfPI, position: v3(8.5, 3, 5), eye: v3(4, 0, 5)},
    '3': {scale: 2, pitch: 0, yaw: halfPI, position: v3(8.5, 3, 15), eye: v3(4, 0, 15)},
    '4': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-8.5, 3, 5), eye: v3(-4, 0, 5)},
    '5': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-8.5, 3, 15), eye: v3(-4, 0, 15)},
    '6': {scale: 2, pitch: 0, yaw: 0, position: v3(0, 3, 10), eye: v3(0, 0, 5)},
    '7': {scale: 2, pitch: 0, yaw: 0, position: v3(0, 3, 11), eye: v3(0, 0, 15)},
    '8': {scale: 2, pitch: 0, yaw: halfPI, position: v3(8.5, 11, 5), eye: v3(4, 8, 5)},
    '9': {scale: 2, pitch: 0, yaw: halfPI, position: v3(8.5, 11, 15), eye: v3(4, 8, 15)},
    '10': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-8.5, 11, 5), eye: v3(-4, 8, 5)},
    '11': {scale: 2, pitch: 0, yaw: halfPI, position: v3(-8.5, 11, 15), eye: v3(-4, 8, 15)},
    '12': {scale: 2, pitch: 0, yaw: 0, position: v3(0, 11, 10), eye: v3(0, 8, 5)},
    '13': {scale: 2, pitch: 0, yaw: 0, position: v3(0, 11, 11), eye: v3(0, 8, 15)},
  }
};

export default Globals;
