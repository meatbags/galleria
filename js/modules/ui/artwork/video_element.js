/**
 ** VideoElement
 ** handle video loading and interaction
 **/

class VideoElement {
  constructor(videoSrc, audioSrc, mesh, camera) {
    this.radius = 15;
    this.refDistance = 1;
    this.rolloff = 1.5;

    // create video element
    this.video = document.createElement('video');
    this.video.src = videoSrc;
    this.video.muted = "muted";
    this.video.loop = true;
    this.video.load();

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
    this.audioContext = this.audio.context;
    const audioLoader = new THREE.AudioLoader();
    audioLoader.load(this.audioSrc, buffer => {
      this.audio.setBuffer(buffer);
      this.audio.setRefDistance(this.refDistance);
      this.audio.setRolloffFactor(this.rolloff);
      this.audio.setDistanceModel('exponential');
      this.audio.play();
      this.syncTracks();
    });

    // add sound to mesh
    this.meshRef.add(this.audio);

    // flag
    this.audioRequired = false;
  }

  pauseVideo() {
    if (!this.video.paused) {
      this.video.pause();
    }
  }

  resumeVideo() {
    if (this.video.paused) {
      this.syncTracks();
      this.video.play();
    }
  }

  syncTracks() {
    // sync video with audio
    if (this.audioContext) {
      const t = this.audioContext.currentTime;
      this.video.currentTime = t > this.video.duration ? t % this.video.duration : t;
    }
  }

  update(p) {
    // defer audio init (browser requirement)
    if (this.audioRequired) {
      this.initAudio();
    }

    // play or pause video
    if (this.meshRef.position.distanceTo(p) > this.radius) {
      this.pauseVideo();
    } else {
      this.resumeVideo();
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
