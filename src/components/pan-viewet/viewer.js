import create360Viewer from '360-image-viewer';
import canvasFit from 'canvas-fit';

import { degToRad } from '../../utils';

class Viewer {
  /**
   * @param {String} src - A src of spherical image
   * @param {Number} speed - A speed of animation in degrees
   * @param {String} direction - A direction of animation default is left
   * @param {Boolean} isStopped - is stopped viewer rendering
   * @param {Object} List of callbacks [onLoad]
   */
  constructor({ src, speed = 0.1, direction = 'left', isStopped = true, callbacks = {} }) {
    this.animateDirection = direction === 'left' ? 1 : -1;
    this.speed = speed;

    this._callbacks = callbacks;

    this.isStopped = isStopped;

    this._startMove = {};

    this.loadImage({ src });

    this.viewer = create360Viewer({
      image: this.image,
      fov: degToRad(80),
    });
  }

  destroy() {
    this.stop();
    this._callbacks = {};
  }

  start() {
    if (!this.isStopped) {
      return;
    }

    this.isStopped = false;
    this.viewer.start();
  }

  stop() {
    if (this.isStopped) {
      return;
    }
    this.isStopped = true;
    this.viewer.stop();
  }

  rotate({ y = 0, x = 0 }) {
    const newTheta = this.viewer.controls.theta + degToRad(y);
    const newPhi = this.viewer.controls.phi + degToRad(x);
    this.viewer.controls.theta = newTheta;
    this.viewer.controls.phi = newPhi;
  }

  getDomElement() {
    return this.viewer.canvas;
  }

  makeDynamic(parent = window, scale = window.devicePixelRatio) {
    const fit = canvasFit(this.viewer.canvas, parent, scale);

    window.addEventListener('resize', fit, false);

    return fit;
  }

  loadImage({ src }) {
    const image = new Image();

    image.onload = this.handleImageLoad;

    image.crossOrigin = 'anonymous';

    image.src = src;

    this.image = image;

    return this.image;
  }

  handleImageLoad = e => {
    this.viewer.texture(this.image);
    this.viewer.render();
    if (this._callbacks && this._callbacks.onLoad) {
      this._callbacks.onLoad(e);
    }
  };
}

export default Viewer;
