/**
 ** VideoElement
 ** handle video loading and interaction
 **/

class VideoElement {
  constructor(sceneRef, videoSrc, audioSrc, position, camera) {
    this.sceneRef = sceneRef;
    this.radius = 17;
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
        this.audio.loop = true;
        this.audio.setVolume(0);
        this.audio.play();
        this.syncTracks();
        this.fadeInRequired = true;
      }
    });

    // add sound to mesh
    this.object3D.add(this.audio);

    // flag
    this.audioRequired = false;
  }

  fadeInAudio() {
    if (this.active) {
      const v = Math.min(1, this.audio.getVolume() + 0.01);
      if (v == 1) {
        this.fadeInRequired = false;
      }
      this.audio.setVolume(v);
    }
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

    // fade in
    if (this.fadeInRequired) {
      this.fadeInAudio();
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
      if (this.audio && this.audio.isPlaying) {
        this.object3D.remove(this.audio);
        this.audio.pause();
      }
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
