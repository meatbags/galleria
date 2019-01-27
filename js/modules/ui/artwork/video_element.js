/**
 ** VideoElement
 ** handle video loading and interaction
 **/

class VideoElement {
  constructor(sceneRef, videoSrc, audioSrc, position, camera) {
    this.sceneRef = sceneRef;
    this.radius = 18;
    this.refDistance = 2;
    this.rolloff = 1.4;
    this.active = true;

    // create video element
    this.video = document.createElement('video');
    this.video.src = videoSrc;
    this.video.muted = "muted";
    this.video.loop = true;
    this.video.load();

    // audio element
    if (audioSrc !== '') {
      this.object3D = new THREE.Object3D();
      this.object3D.position.copy(position);
      this.sceneRef.add(this.object3D);
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
    this.audioLoader = new THREE.AudioLoader();
    this.audioLoader.load(this.audioSrc, buffer => {
      if (this.active) {
        this.audio.setBuffer(buffer);
        this.audio.setRefDistance(this.refDistance);
        this.audio.setRolloffFactor(this.rolloff);
        this.audio.setDistanceModel('exponential');
        this.audio.play();
        this.syncTracks();
      }
    });

    // add sound to mesh
    this.object3D.add(this.audio);

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
    if (this.object3D.position.distanceTo(p) > this.radius) {
      this.pauseVideo();
    } else {
      this.resumeVideo();
    }
  }

  destroy() {
    this.active = false;

    // destroy
    if (this.object3D) {
      this.sceneRef.remove(this.object3D);
    }
    if (this.video) {
      this.video.pause();
    }
  }

  getElement() {
    return this.video;
  }
}

export default VideoElement;
