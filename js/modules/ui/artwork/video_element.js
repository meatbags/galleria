/**
 ** VideoElement
 ** handle video loading and interaction
 **/

class VideoElement {
  constructor(videoSrc, audioSrc, mesh, camera, radius) {
    this.radius = radius || 20;
    this.refDistance = 1;
    this.rolloff = 1.5;

    // create video element
    this.video = document.createElement('video');
    this.video.src = videoSrc;
    this.video.muted = "muted";
    this.video.loop = true;

    // audio element
    if (audioSrc !== '') {
      this.meshRef = mesh;
      this.cameraRef = camera;
      this.audioSrc = audioSrc;
      this.audioRequired = true;
    } else {
      this.audioRequired = false;
    }
  }

  initAudio() {
    // init audio after user interaction (required by some browsers)
    if (!this.cameraRef.listener) {
      this.cameraRef.addListener();
    }

    // create audio node
    this.audio = new THREE.PositionalAudio(this.cameraRef.listener);
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.audioSrc, buffer => {
      this.audio.setBuffer(buffer);
      this.audio.setRefDistance(this.refDistance);
      this.audio.setRolloffFactor(this.rolloff);
      this.audio.setDistanceModel('exponential');
      this.audio.play();
    });

    // add sound to mesh
    this.meshRef.add(this.audio);

    // flag
    this.audioRequired = false;
  }

  update(p) {
    if (this.audioRequired) {
      this.initAudio();
    }

    // play or pause video
    if (this.meshRef.position.distanceTo(p) > this.radius) {
      if (!this.video.paused) {
        this.video.pause();
      }
    } else {
      if (this.video.paused) {
        this.video.play();
      }
    }
  }

  destroy() {
    this.video.pause();
    if (this.audio) {
      this.audio.pause();
    }

    // dereference
    this.video = null;
    this.audio = null;
  }

  getElement() {
    return this.video;
  }
}

export default VideoElement;
